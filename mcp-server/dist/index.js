#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, ListResourcesRequestSchema, ReadResourceRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
// Enhanced logging system
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["DEBUG"] = "DEBUG";
})(LogLevel || (LogLevel = {}));
// MCP Server for Firecrawl
class FirecrawlMCPServer {
    server;
    client;
    logs = [];
    maxLogs = 1000;
    creditWarningThreshold = 0.8; // 80% of limit
    retryConfig = {
        maxRetries: 3,
        baseDelay: 1000, // 1 second
        maxDelay: 10000, // 10 seconds
        backoffMultiplier: 2
    };
    sseClients = new Map(); // SSE clients for real-time updates
    performanceMetrics = {
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        averageResponseTime: 0,
        lastCleanup: Date.now()
    };
    constructor() {
        // Enhanced configuration support for cloud and self-hosted deployments
        const config = this.loadConfiguration();
        this.client = axios.create({
            baseURL: config.apiUrl,
            headers: config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {},
            timeout: config.timeout,
        });
        // Configure axios interceptors for enhanced error handling
        this.setupAxiosInterceptors();
        this.server = new Server({
            name: "firecrawl-mcp-server",
            version: "1.0.0",
        }, {
            capabilities: {
                tools: {},
                resources: {},
            },
        });
        this.setupToolHandlers();
        this.setupResourceHandlers();
        // Log server initialization with configuration details
        this.log(LogLevel.INFO, `Firecrawl MCP Server initialized successfully - ${config.isCloud ? 'Cloud' : 'Self-hosted'} mode`);
    }
    loadConfiguration() {
        // Support multiple environment variable patterns for compatibility
        const apiKey = process.env.FIRECRAWL_API_KEY ||
            process.env.FIRECRAWL_API_TOKEN ||
            process.env.FC_API_KEY ||
            "";
        const apiUrl = process.env.FIRECRAWL_API_URL ||
            process.env.FIRECRAWL_BASE_URL ||
            process.env.FC_BASE_URL ||
            "http://localhost:3002";
        const isCloud = apiUrl.includes('firecrawl.dev') || apiUrl.includes('api.firecrawl');
        // Enhanced timeout and retry configuration
        const timeout = parseInt(process.env.FIRECRAWL_TIMEOUT || "60000");
        const retryAttempts = parseInt(process.env.FIRECRAWL_RETRY_ATTEMPTS || "3");
        const retryDelay = parseInt(process.env.FIRECRAWL_RETRY_DELAY || "1000");
        // Credit and rate limiting configuration
        const creditWarningThreshold = parseFloat(process.env.FIRECRAWL_CREDIT_WARNING || "0.8");
        return {
            apiKey,
            apiUrl,
            isCloud,
            timeout,
            retryAttempts,
            retryDelay,
            creditWarningThreshold
        };
    }
    setupAxiosInterceptors() {
        // Request interceptor for logging
        this.client.interceptors.request.use((config) => {
            this.log(LogLevel.DEBUG, `Making request to ${config.method?.toUpperCase()} ${config.url}`);
            return config;
        }, (error) => {
            this.log(LogLevel.ERROR, `Request error: ${error.message}`);
            return Promise.reject(error);
        });
        // Response interceptor for enhanced error handling
        this.client.interceptors.response.use((response) => {
            // Log successful responses with credit usage if available
            if (response.headers['x-ratelimit-remaining']) {
                const remaining = parseInt(response.headers['x-ratelimit-remaining']);
                const limit = parseInt(response.headers['x-ratelimit-limit'] || '1000');
                const usagePercent = ((limit - remaining) / limit) * 100;
                if (usagePercent > this.creditWarningThreshold * 100) {
                    this.log(LogLevel.WARNING, `Credit usage at ${usagePercent.toFixed(1)}% (${remaining}/${limit} remaining)`);
                }
            }
            return response;
        }, (error) => {
            // Enhanced error handling with specific error types
            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;
                if (status === 429) {
                    this.log(LogLevel.WARNING, `Rate limit exceeded: ${data?.error || 'Too many requests'}`);
                }
                else if (status === 401) {
                    this.log(LogLevel.ERROR, 'Authentication failed - check your API key');
                }
                else if (status === 403) {
                    this.log(LogLevel.ERROR, 'Access forbidden - check your API key permissions');
                }
                else if (status === 404) {
                    this.log(LogLevel.WARNING, `Resource not found: ${error.config?.url}`);
                }
                else if (status >= 500) {
                    this.log(LogLevel.ERROR, `Server error (${status}): ${data?.error || 'Internal server error'}`);
                }
            }
            else if (error.code === 'ECONNREFUSED') {
                this.log(LogLevel.ERROR, `Connection refused - check if Firecrawl service is running at ${this.client.defaults.baseURL}`);
            }
            else if (error.code === 'ENOTFOUND') {
                this.log(LogLevel.ERROR, `DNS resolution failed - check your network connection`);
            }
            else if (error.code === 'ETIMEDOUT') {
                this.log(LogLevel.WARNING, `Request timeout - the target site may be slow or unresponsive`);
            }
            return Promise.reject(error);
        });
    }
    // SSE (Server-Sent Events) support for real-time updates
    addSSEClient(clientId, client) {
        this.sseClients.set(clientId, client);
        this.log(LogLevel.INFO, `SSE client connected: ${clientId}`);
    }
    removeSSEClient(clientId) {
        this.sseClients.delete(clientId);
        this.log(LogLevel.INFO, `SSE client disconnected: ${clientId}`);
    }
    broadcastSSEUpdate(operationId, data) {
        const update = {
            operationId,
            timestamp: new Date().toISOString(),
            ...data
        };
        for (const [clientId, client] of this.sseClients) {
            try {
                client.write(`data: ${JSON.stringify(update)}\n\n`);
            }
            catch (error) {
                this.log(LogLevel.WARNING, `Failed to send SSE update to client ${clientId}`, 'sse_broadcast');
                this.removeSSEClient(clientId);
            }
        }
    }
    // Performance monitoring and metrics
    updatePerformanceMetrics(operation, success, duration) {
        this.performanceMetrics.totalRequests++;
        if (success) {
            this.performanceMetrics.successfulRequests++;
        }
        else {
            this.performanceMetrics.failedRequests++;
        }
        // Update rolling average response time
        const alpha = 0.1; // Smoothing factor
        this.performanceMetrics.averageResponseTime =
            this.performanceMetrics.averageResponseTime * (1 - alpha) + duration * alpha;
        // Log performance metrics periodically
        if (this.performanceMetrics.totalRequests % 100 === 0) {
            this.logPerformanceSummary();
        }
    }
    logPerformanceSummary() {
        const metrics = this.performanceMetrics;
        const successRate = metrics.totalRequests > 0
            ? (metrics.successfulRequests / metrics.totalRequests * 100).toFixed(1)
            : '0';
        this.log(LogLevel.INFO, `Performance Summary: ${metrics.totalRequests} total, ${successRate}% success, ${metrics.averageResponseTime.toFixed(0)}ms avg response`, 'performance_monitoring');
    }
    // Enhanced logging system
    log(level, message, operation, duration, creditUsage) {
        const entry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            operation,
            duration,
            creditUsage
        };
        this.logs.push(entry);
        // Keep only the last maxLogs entries
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs);
        }
        // Output to console for debugging
        console.error(`[${level}] ${message}${operation ? ` (Operation: ${operation})` : ''}${duration ? ` (${duration}ms)` : ''}`);
    }
    // Enhanced error handling with retry logic, performance monitoring, and SSE
    async executeWithRetry(operation, operationName, maxRetries = this.retryConfig.maxRetries, operationId) {
        let lastError;
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            const startTime = Date.now();
            try {
                // Send SSE update for operation start
                if (operationId && attempt === 0) {
                    this.broadcastSSEUpdate(operationId, {
                        type: 'operation_started',
                        operation: operationName,
                        attempt: attempt + 1
                    });
                }
                const result = await operation();
                const duration = Date.now() - startTime;
                // Update performance metrics
                this.updatePerformanceMetrics(operationName, true, duration);
                // Send SSE update for successful completion
                if (operationId) {
                    this.broadcastSSEUpdate(operationId, {
                        type: 'operation_completed',
                        operation: operationName,
                        duration,
                        success: true
                    });
                }
                this.log(LogLevel.INFO, `Operation completed successfully`, operationName, duration);
                return result;
            }
            catch (error) {
                const duration = Date.now() - startTime;
                lastError = error;
                // Update performance metrics for failure
                this.updatePerformanceMetrics(operationName, false, duration);
                // Send SSE update for operation failure
                if (operationId) {
                    this.broadcastSSEUpdate(operationId, {
                        type: 'operation_failed',
                        operation: operationName,
                        attempt: attempt + 1,
                        error: error.message,
                        duration
                    });
                }
                // Check for rate limiting
                if (error.response?.status === 429) {
                    if (attempt < maxRetries) {
                        const delay = Math.min(this.retryConfig.baseDelay * Math.pow(this.retryConfig.backoffMultiplier, attempt), this.retryConfig.maxDelay);
                        this.log(LogLevel.WARNING, `Rate limit exceeded, retrying in ${delay}ms`, operationName, duration);
                        await new Promise(resolve => setTimeout(resolve, delay));
                        continue;
                    }
                }
                // Check for credit usage warnings
                if (error.response?.data?.error?.includes('credit')) {
                    this.log(LogLevel.WARNING, `Credit usage warning: ${error.response.data.error}`, operationName, duration);
                }
                // Log error and retry if not the last attempt
                if (attempt < maxRetries) {
                    this.log(LogLevel.WARNING, `Attempt ${attempt + 1} failed: ${error.message}, retrying...`, operationName, duration);
                    const delay = Math.min(this.retryConfig.baseDelay * Math.pow(this.retryConfig.backoffMultiplier, attempt), this.retryConfig.maxDelay);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
                else {
                    this.log(LogLevel.ERROR, `Operation failed after ${maxRetries + 1} attempts: ${error.message}`, operationName, duration);
                }
            }
        }
        throw lastError;
    }
    setupToolHandlers() {
        // List available tools
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: [
                    {
                        name: "firecrawl_scrape",
                        description: "Extract clean content from a single URL. Perfect for scraping individual pages with advanced formatting options and dynamic content handling.",
                        inputSchema: {
                            type: "object",
                            properties: {
                                url: {
                                    type: "string",
                                    description: "The URL to scrape content from",
                                },
                                formats: {
                                    type: "array",
                                    items: { type: "string", enum: ["markdown", "html", "raw", "links", "screenshot"] },
                                    default: ["markdown"],
                                    description: "Content formats to extract: markdown (clean text), html (full HTML), raw (raw text), links (page links), screenshot (base64 image)",
                                },
                                onlyMainContent: {
                                    type: "boolean",
                                    default: true,
                                    description: "Extract only the main content, filtering out navigation, footers, sidebars, and ads",
                                },
                                includeTags: {
                                    type: "array",
                                    items: { type: "string" },
                                    description: "HTML tags to specifically include in extraction (e.g., ['article', 'main'])",
                                },
                                excludeTags: {
                                    type: "array",
                                    items: { type: "string" },
                                    description: "HTML tags to exclude from extraction (e.g., ['nav', 'footer', 'aside'])",
                                },
                                waitFor: {
                                    type: "number",
                                    default: 0,
                                    description: "Time in milliseconds to wait for dynamic content to load (useful for JavaScript-heavy sites)",
                                },
                                timeout: {
                                    type: "number",
                                    default: 30000,
                                    description: "Maximum time in milliseconds to wait for the page to load",
                                },
                                maxAge: {
                                    type: "number",
                                    description: "Maximum age in milliseconds for cached content (skip cache if older)",
                                },
                            },
                            required: ["url"],
                        },
                    },
                    {
                        name: "firecrawl_map",
                        description: "Discover all URLs on a website extremely fast. Perfect for mapping site structure before scraping or when you need to find specific sections.",
                        inputSchema: {
                            type: "object",
                            properties: {
                                url: {
                                    type: "string",
                                    description: "Starting URL for URL discovery (e.g., 'https://example.com')",
                                },
                                search: {
                                    type: "string",
                                    description: "Optional search term to filter URLs (e.g., 'blog' to find blog-related pages)",
                                },
                                ignoreSitemap: {
                                    type: "boolean",
                                    default: false,
                                    description: "Skip sitemap.xml discovery and only use HTML links for faster crawling",
                                },
                                sitemapOnly: {
                                    type: "boolean",
                                    default: false,
                                    description: "Only use sitemap.xml for discovery, ignore HTML links (faster but may miss dynamic pages)",
                                },
                                includeSubdomains: {
                                    type: "boolean",
                                    default: false,
                                    description: "Include URLs from subdomains (e.g., blog.example.com, docs.example.com)",
                                },
                                limit: {
                                    type: "number",
                                    default: 1000,
                                    description: "Maximum number of URLs to return (default: 1000, max: 50000)",
                                },
                            },
                            required: ["url"],
                        },
                    },
                    {
                        name: "firecrawl_crawl",
                        description: "Extract content from multiple related pages asynchronously. Perfect for comprehensive coverage of websites, but responses can be large - use map + batch_scrape for better control.",
                        inputSchema: {
                            type: "object",
                            properties: {
                                url: {
                                    type: "string",
                                    description: "Starting URL for the crawl (supports wildcards like 'https://example.com/blog/*')",
                                },
                                excludePaths: {
                                    type: "array",
                                    items: { type: "string" },
                                    description: "URL paths to exclude (e.g., ['/admin', '/private', '*.pdf'])",
                                },
                                includePaths: {
                                    type: "array",
                                    items: { type: "string" },
                                    description: "Only crawl these URL paths (e.g., ['/blog/*', '/docs/*'])",
                                },
                                maxDepth: {
                                    type: "number",
                                    default: 2,
                                    description: "Maximum link depth to crawl (default: 2, recommended: 1-3 to avoid token overflow)",
                                },
                                ignoreSitemap: {
                                    type: "boolean",
                                    default: false,
                                    description: "Skip sitemap.xml discovery for faster crawling",
                                },
                                limit: {
                                    type: "number",
                                    default: 100,
                                    description: "Maximum number of pages to crawl (default: 100, recommended: 10-1000)",
                                },
                                allowExternalLinks: {
                                    type: "boolean",
                                    default: false,
                                    description: "Allow crawling links to external domains (may increase costs)",
                                },
                                deduplicateSimilarURLs: {
                                    type: "boolean",
                                    default: true,
                                    description: "Remove similar URLs during crawl to avoid duplicates",
                                },
                            },
                            required: ["url"],
                        },
                    },
                    {
                        name: "firecrawl_check_crawl_status",
                        description: "Monitor crawl job progress and retrieve results. Call this after starting a crawl to check completion status and get extracted data.",
                        inputSchema: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "string",
                                    description: "Crawl job ID returned from firecrawl_crawl (e.g., '550e8400-e29b-41d4-a716-446655440000')",
                                },
                            },
                            required: ["id"],
                        },
                    },
                    {
                        name: "firecrawl_search",
                        description: "Search the web and get content from results. Perfect when you don't know which website has the information you need.",
                        inputSchema: {
                            type: "object",
                            properties: {
                                query: {
                                    type: "string",
                                    description: "Search query (e.g., 'latest AI research papers 2023')",
                                },
                                limit: {
                                    type: "number",
                                    default: 5,
                                    minimum: 1,
                                    maximum: 20,
                                    description: "Maximum number of results to return (default: 5, max: 20)",
                                },
                                lang: {
                                    type: "string",
                                    default: "en",
                                    description: "Language code for search results (e.g., 'en', 'es', 'fr')",
                                },
                                country: {
                                    type: "string",
                                    default: "us",
                                    description: "Country code for search results (e.g., 'us', 'uk', 'ca')",
                                },
                                tbs: {
                                    type: "string",
                                    description: "Time-based search filter (e.g., 'qdr:h' for past hour, 'qdr:d' for past day, 'qdr:w' for past week)",
                                },
                            },
                            required: ["query"],
                        },
                    },
                    {
                        name: "firecrawl_extract",
                        description: "Extract structured data from web pages using AI. Perfect for getting specific information like prices, names, or custom data formats.",
                        inputSchema: {
                            type: "object",
                            properties: {
                                urls: {
                                    type: "array",
                                    items: { type: "string" },
                                    description: "List of URLs to extract information from (max 10 URLs recommended)",
                                },
                                prompt: {
                                    type: "string",
                                    description: "Instructions for what to extract (e.g., 'Extract product name, price, and description')",
                                },
                                systemPrompt: {
                                    type: "string",
                                    description: "System instructions for the AI extraction (e.g., 'You are a helpful assistant that extracts product information')",
                                },
                                schema: {
                                    type: "object",
                                    description: "JSON schema defining the expected output structure",
                                    example: {
                                        type: "object",
                                        properties: {
                                            name: { type: "string" },
                                            price: { type: "number" },
                                            description: { type: "string" }
                                        },
                                        required: ["name", "price"]
                                    },
                                },
                                allowExternalLinks: {
                                    type: "boolean",
                                    default: false,
                                    description: "Allow extraction from external links found on the pages",
                                },
                                enableWebSearch: {
                                    type: "boolean",
                                    default: false,
                                    description: "Enable web search for additional context during extraction",
                                },
                                includeSubdomains: {
                                    type: "boolean",
                                    default: false,
                                    description: "Include subdomains when processing links",
                                },
                            },
                            required: ["urls", "prompt", "schema"],
                        },
                    },
                    {
                        name: "firecrawl_deep_research",
                        description: "AI-powered deep research with intelligent crawling and analysis. Perfect for comprehensive research tasks that require exploring multiple sources and synthesizing information.",
                        inputSchema: {
                            type: "object",
                            properties: {
                                query: {
                                    type: "string",
                                    description: "The research question or topic to explore (e.g., 'What are the latest developments in AI safety research?')",
                                },
                                maxDepth: {
                                    type: "number",
                                    default: 3,
                                    minimum: 1,
                                    maximum: 12,
                                    description: "Maximum recursive depth for crawling/search (default: 3, higher values = more comprehensive but slower)",
                                },
                                timeLimit: {
                                    type: "number",
                                    default: 120,
                                    minimum: 30,
                                    maximum: 600,
                                    description: "Time limit in seconds for the research session (default: 120, max: 600)",
                                },
                                maxUrls: {
                                    type: "number",
                                    default: 50,
                                    minimum: 1,
                                    maximum: 1000,
                                    description: "Maximum number of URLs to analyze (default: 50, higher values = more comprehensive research)",
                                },
                            },
                            required: ["query"],
                        },
                    },
                    {
                        name: "firecrawl_generate_llmstxt",
                        description: "Generate standardized LLM.txt files for websites, making website content more accessible to AI models.",
                        inputSchema: {
                            type: "object",
                            properties: {
                                url: {
                                    type: "string",
                                    description: "The URL to generate LLMs.txt from (e.g., 'https://docs.firecrawl.dev')",
                                },
                                maxUrls: {
                                    type: "number",
                                    default: 10,
                                    minimum: 1,
                                    maximum: 5000,
                                    description: "Maximum number of URLs to process (default: 10, recommended: 10-100)",
                                },
                                showFullText: {
                                    type: "boolean",
                                    default: false,
                                    description: "Whether to show the full LLMs-full.txt in the response (default: false, returns summary)",
                                },
                            },
                            required: ["url"],
                        },
                    },
                    {
                        name: "firecrawl_batch_scrape",
                        description: "Scrape multiple URLs simultaneously with advanced options. Perfect for processing many pages efficiently - use this instead of individual scrapes for better performance.",
                        inputSchema: {
                            type: "object",
                            properties: {
                                urls: {
                                    type: "array",
                                    items: { type: "string" },
                                    description: "Array of URLs to scrape (max 100 URLs recommended for optimal performance)",
                                    example: ["https://example1.com", "https://example2.com", "https://example3.com"],
                                },
                                formats: {
                                    type: "array",
                                    items: { type: "string", enum: ["markdown", "html", "raw", "links", "screenshot"] },
                                    default: ["markdown"],
                                    description: "Content formats to extract for each URL",
                                },
                                onlyMainContent: {
                                    type: "boolean",
                                    default: true,
                                    description: "Extract only the main content for each URL, filtering out navigation and ads",
                                },
                                includeTags: {
                                    type: "array",
                                    items: { type: "string" },
                                    description: "HTML tags to specifically include in extraction (e.g., ['article', 'main'])",
                                },
                                excludeTags: {
                                    type: "array",
                                    items: { type: "string" },
                                    description: "HTML tags to exclude from extraction (e.g., ['nav', 'footer', 'aside'])",
                                },
                                waitFor: {
                                    type: "number",
                                    default: 0,
                                    description: "Time in milliseconds to wait for dynamic content to load on each page",
                                },
                                timeout: {
                                    type: "number",
                                    default: 30000,
                                    description: "Maximum time in milliseconds to wait for each page to load",
                                },
                                maxAge: {
                                    type: "number",
                                    description: "Maximum age in milliseconds for cached content (skip cache if older)",
                                },
                            },
                            required: ["urls"],
                        },
                    },
                    {
                        name: "firecrawl_check_batch_status",
                        description: "Monitor batch scraping operation progress and retrieve results. Call this after starting a batch scrape to check completion and get all extracted data.",
                        inputSchema: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "string",
                                    description: "Batch operation ID returned from firecrawl_batch_scrape (e.g., 'batch_1')",
                                },
                            },
                            required: ["id"],
                        },
                    },
                    {
                        name: "firecrawl_subscribe_updates",
                        description: "Subscribe to real-time updates for long-running operations using Server-Sent Events (SSE). Get live progress updates for crawls, batch scrapes, and deep research.",
                        inputSchema: {
                            type: "object",
                            properties: {
                                operationIds: {
                                    type: "array",
                                    items: { type: "string" },
                                    description: "Array of operation IDs to subscribe to (crawl IDs, batch IDs, research IDs)",
                                    example: ["crawl_123", "batch_456", "research_789"],
                                },
                                eventTypes: {
                                    type: "array",
                                    items: { type: "string", enum: ["operation_started", "operation_completed", "operation_failed", "progress_update"] },
                                    description: "Types of events to receive (default: all)",
                                    example: ["operation_started", "operation_completed", "progress_update"],
                                },
                            },
                            required: ["operationIds"],
                        },
                    },
                    {
                        name: "firecrawl_get_performance_metrics",
                        description: "Retrieve performance metrics and statistics for the MCP server including success rates, response times, and operation counts.",
                        inputSchema: {
                            type: "object",
                            properties: {
                                timeRange: {
                                    type: "string",
                                    enum: ["last_hour", "last_day", "last_week", "all_time"],
                                    default: "all_time",
                                    description: "Time range for metrics (default: all_time)",
                                },
                                includeDetailed: {
                                    type: "boolean",
                                    default: false,
                                    description: "Include detailed breakdown by operation type",
                                },
                            },
                            required: [],
                        },
                    },
                ],
            };
        });
        // Handle tool calls
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            try {
                switch (name) {
                    case "firecrawl_scrape":
                        return await this.handleScrape(args);
                    case "firecrawl_map":
                        return await this.handleMap(args);
                    case "firecrawl_crawl":
                        return await this.handleCrawl(args);
                    case "firecrawl_check_crawl_status":
                        return await this.handleCheckCrawlStatus(args);
                    case "firecrawl_search":
                        return await this.handleSearch(args);
                    case "firecrawl_extract":
                        return await this.handleExtract(args);
                    case "firecrawl_deep_research":
                        return await this.handleDeepResearch(args);
                    case "firecrawl_generate_llmstxt":
                        return await this.handleGenerateLLMsTxt(args);
                    case "firecrawl_batch_scrape":
                        return await this.handleBatchScrape(args);
                    case "firecrawl_check_batch_status":
                        return await this.handleCheckBatchStatus(args);
                    case "firecrawl_subscribe_updates":
                        return await this.handleSubscribeUpdates(args);
                    case "firecrawl_get_performance_metrics":
                        return await this.handleGetPerformanceMetrics(args);
                    default:
                        throw new Error(`Unknown tool: ${name}`);
                }
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                    isError: true,
                };
            }
        });
    }
    setupResourceHandlers() {
        // List resources (crawl jobs, etc.)
        this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
            return {
                resources: [
                    {
                        uri: "firecrawl://status",
                        name: "Firecrawl Service Status",
                        description: "Current status of the Firecrawl service",
                        mimeType: "application/json",
                    },
                ],
            };
        });
        // Read resources
        this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
            const { uri } = request.params;
            if (uri === "firecrawl://status") {
                return {
                    contents: [
                        {
                            uri,
                            mimeType: "application/json",
                            text: JSON.stringify({
                                service: "Firecrawl MCP Server",
                                version: "1.0.0",
                                status: "running",
                                apiUrl: process.env.FIRECRAWL_API_URL || "http://localhost:3002",
                                timestamp: new Date().toISOString(),
                            }),
                        },
                    ],
                };
            }
            throw new Error(`Unknown resource: ${uri}`);
        });
    }
    async handleScrape(args) {
        const response = await this.executeWithRetry(() => this.client.post("/v1/scrape", {
            url: args.url,
            formats: args.formats || ["markdown"],
            onlyMainContent: args.onlyMainContent,
            includeTags: args.includeTags,
            excludeTags: args.excludeTags,
            waitFor: args.waitFor,
            timeout: args.timeout,
            maxAge: args.maxAge,
        }), "scrape");
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(response.data, null, 2),
                },
            ],
        };
    }
    async handleMap(args) {
        const response = await this.executeWithRetry(() => this.client.post("/v1/map", {
            url: args.url,
            search: args.search,
            ignoreSitemap: args.ignoreSitemap,
            sitemapOnly: args.sitemapOnly,
            includeSubdomains: args.includeSubdomains,
            limit: args.limit,
        }), "map");
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(response.data, null, 2),
                },
            ],
        };
    }
    async handleCrawl(args) {
        const response = await this.executeWithRetry(() => this.client.post("/v1/crawl", {
            url: args.url,
            excludePaths: args.excludePaths,
            includePaths: args.includePaths,
            maxDepth: args.maxDepth,
            ignoreSitemap: args.ignoreSitemap,
            limit: args.limit,
            allowExternalLinks: args.allowExternalLinks,
            deduplicateSimilarURLs: args.deduplicateSimilarURLs,
        }), "crawl");
        return {
            content: [
                {
                    type: "text",
                    text: `Crawl job started. ID: ${response.data.id}\nStatus URL: ${response.data.url}`,
                },
            ],
        };
    }
    async handleCheckCrawlStatus(args) {
        const response = await this.executeWithRetry(() => this.client.get(`/v1/crawl/${args.id}`), "check_crawl_status");
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(response.data, null, 2),
                },
            ],
        };
    }
    async handleSearch(args) {
        const response = await this.executeWithRetry(() => this.client.post("/v1/search", {
            query: args.query,
            limit: args.limit || 5,
            lang: args.lang || "en",
            country: args.country || "us",
            tbs: args.tbs,
        }), "search");
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(response.data, null, 2),
                },
            ],
        };
    }
    async handleExtract(args) {
        const response = await this.executeWithRetry(() => this.client.post("/v1/extract", {
            urls: args.urls,
            prompt: args.prompt,
            systemPrompt: args.systemPrompt,
            schema: args.schema,
            allowExternalLinks: args.allowExternalLinks,
            enableWebSearch: args.enableWebSearch,
            includeSubdomains: args.includeSubdomains,
        }), "extract");
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(response.data, null, 2),
                },
            ],
        };
    }
    async handleDeepResearch(args) {
        const response = await this.executeWithRetry(() => this.client.post("/v2/deep-research", {
            query: args.query,
            maxDepth: args.maxDepth || 3,
            timeLimit: args.timeLimit || 120,
            maxUrls: args.maxUrls || 50,
        }), "deep_research");
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(response.data, null, 2),
                },
            ],
        };
    }
    async handleGenerateLLMsTxt(args) {
        const response = await this.executeWithRetry(() => this.client.post("/v2/generate-llmstxt", {
            url: args.url,
            maxUrls: args.maxUrls || 10,
            showFullText: args.showFullText,
        }), "generate_llmstxt");
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(response.data, null, 2),
                },
            ],
        };
    }
    async handleBatchScrape(args) {
        const response = await this.executeWithRetry(() => this.client.post("/v2/batch/scrape", {
            urls: args.urls,
            formats: args.formats || ["markdown"],
            onlyMainContent: args.onlyMainContent,
            includeTags: args.includeTags,
            excludeTags: args.excludeTags,
            waitFor: args.waitFor,
            timeout: args.timeout,
            maxAge: args.maxAge,
        }), "batch_scrape");
        return {
            content: [
                {
                    type: "text",
                    text: `Batch operation queued with ID: ${response.data.id}. Use firecrawl_check_batch_status to check progress.`,
                },
            ],
        };
    }
    async handleCheckBatchStatus(args) {
        const response = await this.executeWithRetry(() => this.client.get(`/v2/batch/scrape/${args.id}`), "check_batch_status");
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(response.data, null, 2),
                },
            ],
        };
    }
    async handleSubscribeUpdates(args) {
        const clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        // This would typically set up an SSE connection
        // For MCP, we'll simulate the subscription response
        this.addSSEClient(clientId, {
            write: (data) => {
                this.log(LogLevel.DEBUG, `SSE data would be sent: ${data}`, 'sse_simulation');
            }
        });
        return {
            content: [
                {
                    type: "text",
                    text: `Subscribed to real-time updates for operations: ${args.operationIds.join(', ')}\nClient ID: ${clientId}\nEvent types: ${args.eventTypes ? args.eventTypes.join(', ') : 'all'}\n\nNote: Real-time updates are logged to console. In production, this would establish an SSE connection.`,
                },
            ],
        };
    }
    async handleGetPerformanceMetrics(args) {
        const baseMetrics = {
            ...this.performanceMetrics,
            serverInfo: {
                version: "1.0.0",
                uptime: Date.now() - this.performanceMetrics.lastCleanup,
                activeSSEClients: this.sseClients.size,
                logsCount: this.logs.length
            },
            timeRange: args.timeRange || "all_time",
            timestamp: new Date().toISOString()
        };
        const metrics = baseMetrics;
        if (args.includeDetailed) {
            // Group logs by operation type for detailed breakdown
            const operationStats = this.logs.reduce((acc, log) => {
                if (log.operation) {
                    if (!acc[log.operation]) {
                        acc[log.operation] = { count: 0, errors: 0, avgDuration: 0 };
                    }
                    acc[log.operation].count++;
                    if (log.level === LogLevel.ERROR) {
                        acc[log.operation].errors++;
                    }
                    if (log.duration) {
                        acc[log.operation].avgDuration =
                            (acc[log.operation].avgDuration + log.duration) / 2;
                    }
                }
                return acc;
            }, {});
            metrics.operationBreakdown = operationStats;
        }
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(metrics, null, 2),
                },
            ],
        };
    }
    async start() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error("Firecrawl MCP Server started");
    }
}
// Start the server
const server = new FirecrawlMCPServer();
server.start().catch((error) => {
    console.error("Failed to start MCP server:", error);
    process.exit(1);
});
