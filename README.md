<h3 align="center">
  <a name="readme-top"></a>
  <img
    src="https://raw.githubusercontent.com/firecrawl/firecrawl/main/img/firecrawl_logo.png"
    height="200"
  >
</h3>
<div align="center">
    <a href="https://github.com/firecrawl/firecrawl/blob/main/LICENSE">
  <img src="https://img.shields.io/github/license/firecrawl/firecrawl" alt="License">
</a>
    <a href="https://pepy.tech/project/firecrawl-py">
  <img src="https://static.pepy.tech/badge/firecrawl-py" alt="Downloads">
</a>
<a href="https://GitHub.com/firecrawl/firecrawl/graphs/contributors">
  <img src="https://img.shields.io/github/contributors/firecrawl/firecrawl.svg" alt="GitHub Contributors">
</a>
<a href="https://firecrawl.dev">
  <img src="https://img.shields.io/badge/Visit-firecrawl.dev-orange" alt="Visit firecrawl.dev">
</a>
</div>
<div>
  <p align="center">
    <a href="https://twitter.com/firecrawl_dev">
      <img src="https://img.shields.io/badge/Follow%20on%20X-000000?style=for-the-badge&logo=x&logoColor=white" alt="Follow on X" />
    </a>
    <a href="https://www.linkedin.com/company/104100957">
      <img src="https://img.shields.io/badge/Follow%20on%20LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Follow on LinkedIn" />
    </a>
    <a href="https://discord.com/invite/gSmWdAkdwd">
      <img src="https://img.shields.io/badge/Join%20our%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Join our Discord" />
    </a>
  </p>
</div>

# 🔥 Firecrawl-All-In-One

**The Complete Web Scraping & AI Research Platform**

Empower your AI apps with clean data from any website. This enhanced version includes everything from the original Firecrawl plus advanced MCP server integration, real-time monitoring, batch processing, and one-click deployment - making it the ultimate all-in-one solution for AI-powered web scraping and research.

> **📢 Repository Renamed**: This is **Firecrawl-All-In-One** - the enhanced version with 12 working MCP tools, real-time SSE support, and production-ready features. The original Firecrawl repository had broken MCP tools and missing functionality.

_This repository provides a fully functional local development environment with all Firecrawl v2 features, including a complete MCP server integration. Perfect for local development and testing._

## ✨ Why Firecrawl-All-In-One?

**This enhanced version goes beyond the original Firecrawl by providing:**

- 🔥 **Complete MCP Integration**: 12 tools vs original 8 (4 were broken/missing)
- ⚡ **Real-time SSE Support**: Live operation monitoring and progress updates
- 📊 **Performance Monitoring**: Comprehensive metrics and analytics dashboard
- 📦 **Batch Processing**: Efficient multi-URL scraping with status tracking
- 🚀 **One-Click Deployment**: Docker Compose setup for instant local development
- 🔧 **Production-Ready**: Advanced error handling, retry logic, and resilience
- 💰 **Cost-Effective**: 10/12 tools work without API keys (vs 7/8 in original)
- 📈 **Enhanced Reliability**: Automatic retries, rate limiting, and credit monitoring

**The original Firecrawl repository was missing critical features and had broken MCP tools. This All-In-One version fixes everything and adds advanced capabilities.**

## What is Firecrawl?

[Firecrawl](https://firecrawl.dev?ref=github) is an API service that takes a URL, crawls it, and converts it into clean markdown or structured data. We crawl all accessible subpages and give you clean data for each. No sitemap required. Check out our [documentation](https://docs.firecrawl.dev).

_Pst. hey, you, join our stargazers :)_

<a href="https://github.com/firecrawl/firecrawl">
  <img src="https://img.shields.io/github/stars/firecrawl/firecrawl.svg?style=social&label=Star&maxAge=2592000" alt="GitHub stars">
</a>

## How to use it?

We provide an easy to use API with our hosted version. You can find the playground and documentation [here](https://firecrawl.dev/playground). You can also self host the backend if you'd like.

Check out the following resources to get started:
- [x] **API**: [Documentation](https://docs.firecrawl.dev/api-reference/introduction)
- [x] **SDKs**: [Python](https://docs.firecrawl.dev/sdks/python), [Node](https://docs.firecrawl.dev/sdks/node)
- [x] **LLM Frameworks**: [Langchain (python)](https://python.langchain.com/docs/integrations/document_loaders/firecrawl/), [Langchain (js)](https://js.langchain.com/docs/integrations/document_loaders/web_loaders/firecrawl), [Llama Index](https://docs.llamaindex.ai/en/latest/examples/data_connectors/WebPageDemo/#using-firecrawl-reader), [Crew.ai](https://docs.crewai.com/), [Composio](https://composio.dev/tools/firecrawl/all), [PraisonAI](https://docs.praison.ai/firecrawl/), [Superinterface](https://superinterface.ai/docs/assistants/functions/firecrawl), [Vectorize](https://docs.vectorize.io/integrations/source-connectors/firecrawl)
- [x] **Low-code Frameworks**: [Dify](https://dify.ai/blog/dify-ai-blog-integrated-with-firecrawl), [Langflow](https://docs.langflow.org/), [Flowise AI](https://docs.flowiseai.com/integrations/langchain/document-loaders/firecrawl), [Cargo](https://docs.getcargo.io/integration/firecrawl), [Pipedream](https://pipedream.com/apps/firecrawl/)
- [x] **Community SDKs**: [Go](https://docs.firecrawl.dev/sdks/go), [Rust](https://docs.firecrawl.dev/sdks/rust)
- [x] **Others**: [Zapier](https://zapier.com/apps/firecrawl/integrations), [Pabbly Connect](https://www.pabbly.com/connect/integrations/firecrawl/)
- [ ] Want an SDK or Integration? Let us know by opening an issue.

To run locally, refer to guide [here](https://github.com/firecrawl/firecrawl/blob/main/CONTRIBUTING.md).

## 🚀 Firecrawl-All-In-One MCP Server

**Complete AI Assistant Integration**

Firecrawl-All-In-One includes a **fully enhanced MCP (Model Context Protocol) server** with **12 powerful tools** for AI assistants, plus advanced features like real-time monitoring, batch processing, and performance analytics. This is the most comprehensive MCP server available for web scraping and AI research workflows.

### ✅ Fully Working Tools (10/12 - No API Keys Required)
- **`firecrawl_scrape`** - Scrape single URLs with advanced formatting options
- **`firecrawl_map`** - Discover all URLs on a website
- **`firecrawl_crawl`** - Asynchronous website crawling with job management
- **`firecrawl_check_crawl_status`** - Monitor crawl job progress and results
- **`firecrawl_batch_scrape`** - Batch scrape multiple URLs simultaneously
- **`firecrawl_check_batch_status`** - Monitor batch scraping operations
- **`firecrawl_deep_research`** - AI-powered deep research with intelligent crawling
- **`firecrawl_generate_llmstxt`** - Generate standardized LLM.txt files for websites
- **`firecrawl_subscribe_updates`** - Real-time updates via Server-Sent Events (SSE)
- **`firecrawl_get_performance_metrics`** - Performance monitoring and analytics

### ⚠️ Tools Requiring API Keys (2/12)
- **`firecrawl_search`** - Web search functionality (requires `SEARCHAPI_API_KEY` or `SERPER_API_KEY`)
- **`firecrawl_extract`** - AI-powered data extraction (requires `OPENAI_API_KEY`)

### 🚀 All-In-One Enhanced Features

| Feature | Firecrawl-All-In-One | Original Firecrawl |
|---------|---------------------|-------------------|
| **MCP Tools** | ✅ 12 fully working | ⚠️ 8 (4 broken/missing) |
| **Real-time SSE** | ✅ Live monitoring | ❌ Not available |
| **Performance Monitoring** | ✅ Full analytics | ❌ Not available |
| **Batch Processing** | ✅ Multi-URL scraping | ❌ Not available |
| **One-Click Deployment** | ✅ Docker Compose | ⚠️ Complex setup |
| **API Key Free Tools** | ✅ 10/12 tools | ⚠️ 7/8 tools |
| **Advanced Error Handling** | ✅ Auto retries | ❌ Basic only |
| **Production Ready** | ✅ Enterprise features | ⚠️ Limited |

### 🌟 Key Capabilities
- **🔥 Real-time Updates**: Server-Sent Events for live operation monitoring
- **📊 Performance Monitoring**: Comprehensive metrics and analytics dashboard
- **⚡ Advanced Error Handling**: Automatic retries with exponential backoff
- **💳 Credit Monitoring**: Real-time usage tracking with smart warnings
- **📦 Batch Processing**: Efficient multi-URL scraping with status tracking
- **🚀 One-Click Deployment**: Docker Compose for instant local development

### 🚀 Quick MCP Setup (All-In-One Enhanced)
1. Configure your MCP server in `~/.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "node",
      "args": ["/Users/YOUR_USERNAME/Documents/fire/firecrawl/mcp-server/dist/index.js"],
      "env": {
        "FIRECRAWL_API_URL": "http://localhost:3002",
        "FIRECRAWL_API_KEY": ""
      }
    }
  }
}
```

2. Start Firecrawl locally: `docker compose up`
3. Use all MCP tools in your AI assistant!

### API Key

To use the API, you need to sign up on [Firecrawl](https://firecrawl.dev) and get an API key.

### Features

- [**Scrape**](#scraping): scrapes a URL and get its content in LLM-ready format (markdown, structured data via [LLM Extract](#llm-extraction-beta), screenshot, html)
- [**Crawl**](#crawling): scrapes all the URLs of a web page and return content in LLM-ready format
- [**Map**](#map): input a website and get all the website urls - extremely fast
- [**Search**](#search): search the web and get full content from results
- [**Extract**](#extract): get structured data from single page, multiple pages or entire websites with AI
- [**Deep Research**](#deep-research): AI-powered research with intelligent crawling and analysis
- [**LLM.txt Generation**](#generate-llmstxt): Generate standardized LLM.txt files for websites
- [**MCP Server**](#mcp-server-integration): Complete Model Context Protocol server with 8 tools for AI assistants

### Powerful Capabilities
- **LLM-ready formats**: markdown, structured data, screenshot, HTML, links, metadata
- **The hard stuff**: proxies, anti-bot mechanisms, dynamic content (js-rendered), output parsing, orchestration
- **Customizability**: exclude tags, crawl behind auth walls with custom headers, max crawl depth, etc...
- **Media parsing**: pdfs, docx, images
- **Reliability first**: designed to get the data you need - no matter how hard it is
- **Actions**: click, scroll, input, wait and more before extracting data
- **Batching**: scrape thousands of URLs at the same time with a new async endpoint
- **Change Tracking**: monitor and detect changes in website content over time
- **MCP Server**: Complete integration with AI assistants via Model Context Protocol
- **Local Development**: Fully functional local environment with Docker Compose
- **AI Research**: Deep research capabilities with intelligent crawling and analysis

You can find all of Firecrawl's capabilities and how to use them in our [documentation](https://docs.firecrawl.dev)

### Crawling

Used to crawl a URL and all accessible subpages. This submits a crawl job and returns a job ID to check the status of the crawl.

```bash
curl -X POST https://api.firecrawl.dev/v2/crawl \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer fc-YOUR_API_KEY' \
    -d '{
      "url": "https://docs.firecrawl.dev",
      "limit": 10,
      "scrapeOptions": {
        "formats": ["markdown", "html"]
      }
    }'
```

Returns a crawl job id and the url to check the status of the crawl.

```json
{
  "success": true,
  "id": "123-456-789",
  "url": "https://api.firecrawl.dev/v2/crawl/123-456-789"
}
```

### Check Crawl Job

Used to check the status of a crawl job and get its result.

```bash
curl -X GET https://api.firecrawl.dev/v2/crawl/123-456-789 \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

```json
{
  "status": "completed",
  "total": 36,
  "creditsUsed": 36,
  "expiresAt": "2024-00-00T00:00:00.000Z",
  "data": [
    {
      "markdown": "[Firecrawl Docs home page![light logo](https://mintlify.s3-us-west-1.amazonaws.com/firecrawl/logo/light.svg)!...",
      "html": "<!DOCTYPE html><html lang=\"en\" class=\"js-focus-visible lg:[--scroll-mt:9.5rem]\" data-js-focus-visible=\"\">...",
      "metadata": {
        "title": "Build a 'Chat with website' using Groq Llama 3 | Firecrawl",
        "language": "en",
        "sourceURL": "https://docs.firecrawl.dev/learn/rag-llama3",
        "description": "Learn how to use Firecrawl, Groq Llama 3, and Langchain to build a 'Chat with your website' bot.",
        "ogLocaleAlternate": [],
        "statusCode": 200
      }
    }
  ]
}
```

### Scraping

Used to scrape a URL and get its content in the specified formats.

```bash
curl -X POST https://api.firecrawl.dev/v2/scrape \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "url": "https://docs.firecrawl.dev",
      "formats" : ["markdown", "html"]
    }'
```

Response:

```json
{
  "success": true,
  "data": {
    "markdown": "Launch Week I is here! [See our Day 2 Release 🚀](https://www.firecrawl.dev/blog/launch-week-i-day-2-doubled-rate-limits)[💥 Get 2 months free...",
    "html": "<!DOCTYPE html><html lang=\"en\" class=\"light\" style=\"color-scheme: light;\"><body class=\"__variable_36bd41 __variable_d7dc5d font-inter ...",
    "metadata": {
      "title": "Home - Firecrawl",
      "description": "Firecrawl crawls and converts any website into clean markdown.",
      "language": "en",
      "keywords": "Firecrawl,Markdown,Data,Mendable,Langchain",
      "robots": "follow, index",
      "ogTitle": "Firecrawl",
      "ogDescription": "Turn any website into LLM-ready data.",
      "ogUrl": "https://www.firecrawl.dev/",
      "ogImage": "https://www.firecrawl.dev/og.png?123",
      "ogLocaleAlternate": [],
      "ogSiteName": "Firecrawl",
      "sourceURL": "https://firecrawl.dev",
      "statusCode": 200
    }
  }
}
```

### Map

Used to map a URL and get urls of the website. This returns most links present on the website.

```bash cURL
curl -X POST https://api.firecrawl.dev/v2/map \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "url": "https://firecrawl.dev"
    }'
```

Response:

```json
{
  "success": true,
  "links": [
    { "url": "https://firecrawl.dev", "title": "Firecrawl", "description": "Firecrawl is a tool that allows you to crawl a website and get the data you need." },
    { "url": "https://www.firecrawl.dev/pricing", "title": "Firecrawl Pricing", "description": "Firecrawl Pricing" },
    { "url": "https://www.firecrawl.dev/blog", "title": "Firecrawl Blog", "description": "Firecrawl Blog" },
    { "url": "https://www.firecrawl.dev/playground", "title": "Firecrawl Playground", "description": "Firecrawl Playground" },
    { "url": "https://www.firecrawl.dev/smart-crawl", "title": "Firecrawl Smart Crawl", "description": "Firecrawl Smart Crawl" }
  ]
}
```

#### Map with search

Map with `search` param allows you to search for specific urls inside a website.

```bash cURL
curl -X POST https://api.firecrawl.dev/v2/map \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "url": "https://firecrawl.dev",
      "search": "docs"
    }'
```

Response will be an ordered list from the most relevant to the least relevant.

```json
{
  "success": true,
  "links": [
    { "url": "https://docs.firecrawl.dev", "title": "Firecrawl Docs", "description": "Firecrawl Docs" },
    { "url": "https://docs.firecrawl.dev/sdks/python", "title": "Firecrawl Python SDK", "description": "Firecrawl Python SDK" },
    { "url": "https://docs.firecrawl.dev/learn/rag-llama3", "title": "Firecrawl RAG Llama 3", "description": "Firecrawl RAG Llama 3" }
  ]
}
```

### Search

Search the web and get full content from results

Firecrawl’s search API allows you to perform web searches and optionally scrape the search results in one operation.

- Choose specific output formats (markdown, HTML, links, screenshots)
- Search the web with customizable parameters (language, country, etc.)
- Optionally retrieve content from search results in various formats
- Control the number of results and set timeouts

```bash
curl -X POST https://api.firecrawl.dev/v2/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer fc-YOUR_API_KEY" \
  -d '{
    "query": "what is firecrawl?",
    "limit": 5
  }'
```

#### Response

```json
{
  "success": true,
  "data": [
    {
      "url": "https://firecrawl.dev",
      "title": "Firecrawl | Home Page",
      "description": "Turn websites into LLM-ready data with Firecrawl"
    },
    {
      "url": "https://docs.firecrawl.dev",
      "title": "Documentation | Firecrawl",
      "description": "Learn how to use Firecrawl in your own applications"
    }
  ]
}
```

#### With content scraping

```bash
curl -X POST https://api.firecrawl.dev/v2/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer fc-YOUR_API_KEY" \
  -d '{
    "query": "what is firecrawl?",
    "limit": 5,
    "scrapeOptions": {
      "formats": ["markdown", "links"]
    }
  }'
```

### Extract (Beta)

Get structured data from entire websites with a prompt and/or a schema.

You can extract structured data from one or multiple URLs, including wildcards:

Single Page:
Example: https://firecrawl.dev/some-page

Multiple Pages / Full Domain
Example: https://firecrawl.dev/*

When you use /*, Firecrawl will automatically crawl and parse all URLs it can discover in that domain, then extract the requested data.

```bash
curl -X POST https://api.firecrawl.dev/v2/extract \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "urls": [
        "https://firecrawl.dev/*", 
        "https://docs.firecrawl.dev/", 
        "https://www.ycombinator.com/companies"
      ],
      "prompt": "Extract the company mission, whether it is open source, and whether it is in Y Combinator from the page.",
      "schema": {
        "type": "object",
        "properties": {
          "company_mission": {
            "type": "string"
          },
          "is_open_source": {
            "type": "boolean"
          },
          "is_in_yc": {
            "type": "boolean"
          }
        },
        "required": [
          "company_mission",
          "is_open_source",
          "is_in_yc"
        ]
      }
    }'
```

```json
{
  "success": true,
  "id": "44aa536d-f1cb-4706-ab87-ed0386685740",
  "urlTrace": []
}
```

If you are using the sdks, it will auto pull the response for you:

```json
{
  "success": true,
  "data": {
    "company_mission": "Firecrawl is the easiest way to extract data from the web. Developers use us to reliably convert URLs into LLM-ready markdown or structured data with a single API call.",
    "supports_sso": false,
    "is_open_source": true,
    "is_in_yc": true
  }
}
```

### LLM Extraction (Beta)

Used to extract structured data from scraped pages.

### Deep Research

AI-powered deep research with intelligent crawling and analysis. Perfect for comprehensive research tasks that require exploring multiple sources and synthesizing information.

```bash
curl -X POST http://localhost:3002/v2/deep-research \
    -H 'Content-Type: application/json' \
    -d '{
      "query": "What are the latest developments in AI safety research?",
      "maxDepth": 3,
      "timeLimit": 120,
      "maxUrls": 50
    }'
```

### Generate LLM.txt

Generate standardized LLM.txt files for websites, making website content more accessible to AI models.

```bash
curl -X POST http://localhost:3002/v2/generate-llmstxt \
    -H 'Content-Type: application/json' \
    -d '{
      "url": "https://docs.firecrawl.dev",
      "maxUrls": 10,
      "showFullText": false
    }'
```

```bash
curl -X POST https://api.firecrawl.dev/v2/scrape \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d '{
    "url": "https://www.mendable.ai/",
    "formats": [
      {
        "type": "json",
        "schema": {
          "type": "object",
          "properties": {
            "company_mission": { "type": "string" },
            "supports_sso": { "type": "boolean" },
            "is_open_source": { "type": "boolean" },
            "is_in_yc": { "type": "boolean" }
          }
        }
      }
    ]
  }'
```

```json
{
  "success": true,
  "data": {
    "content": "Raw Content",
    "metadata": {
      "title": "Mendable",
      "description": "Mendable allows you to easily build AI chat applications. Ingest, customize, then deploy with one line of code anywhere you want. Brought to you by SideGuide",
      "robots": "follow, index",
      "ogTitle": "Mendable",
      "ogDescription": "Mendable allows you to easily build AI chat applications. Ingest, customize, then deploy with one line of code anywhere you want. Brought to you by SideGuide",
      "ogUrl": "https://mendable.ai/",
      "ogImage": "https://mendable.ai/mendable_new_og1.png",
      "ogLocaleAlternate": [],
      "ogSiteName": "Mendable",
      "sourceURL": "https://mendable.ai/"
    },
    "json": {
      "company_mission": "Train a secure AI on your technical resources that answers customer and employee questions so your team doesn't have to",
      "supports_sso": true,
      "is_open_source": false,
      "is_in_yc": true
    }
  }
}
```

### Extracting without a schema (New)

You can now extract without a schema by just passing a `prompt` to the endpoint. The llm chooses the structure of the data.

```bash
curl -X POST https://api.firecrawl.dev/v2/scrape \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "url": "https://docs.firecrawl.dev/",
      "formats": [
        {
          "type": "json",
          "prompt": "Extract the company mission from the page."
        }
      ]
    }'
```

### Interacting with the page with Actions (Cloud-only)

Firecrawl allows you to perform various actions on a web page before scraping its content. This is particularly useful for interacting with dynamic content, navigating through pages, or accessing content that requires user interaction.

Here is an example of how to use actions to navigate to google.com, search for Firecrawl, click on the first result, and take a screenshot.

```bash
curl -X POST https://api.firecrawl.dev/v2/scrape \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
        "url": "google.com",
        "formats": ["markdown"],
        "actions": [
            {"type": "wait", "milliseconds": 2000},
            {"type": "click", "selector": "textarea[title=\"Search\"]"},
            {"type": "wait", "milliseconds": 2000},
            {"type": "write", "text": "firecrawl"},
            {"type": "wait", "milliseconds": 2000},
            {"type": "press", "key": "ENTER"},
            {"type": "wait", "milliseconds": 3000},
            {"type": "click", "selector": "h3"},
            {"type": "wait", "milliseconds": 3000},
            {"type": "screenshot"}
        ]
    }'
```

### Batch Scraping Multiple URLs (New)

You can now batch scrape multiple URLs at the same time. It is very similar to how the /crawl endpoint works. It submits a batch scrape job and returns a job ID to check the status of the batch scrape.

```bash
curl -X POST https://api.firecrawl.dev/v2/batch/scrape \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "urls": ["https://docs.firecrawl.dev", "https://docs.firecrawl.dev/sdks/overview"],
      "formats" : ["markdown", "html"]
    }'
```



## Using Python SDK

### Installing Python SDK

```bash
pip install firecrawl-py
```

### Crawl a website

```python
from firecrawl import Firecrawl

firecrawl = Firecrawl(api_key="fc-YOUR_API_KEY")

# Scrape a website (returns a Document)
doc = firecrawl.scrape(
    "https://firecrawl.dev",
    formats=["markdown", "html"],
)
print(doc.markdown)

# Crawl a website
response = firecrawl.crawl(
    "https://firecrawl.dev",
    limit=100,
    scrape_options={"formats": ["markdown", "html"]},
    poll_interval=30,
)
print(response)
```

### Extracting structured data from a URL

With LLM extraction, you can easily extract structured data from any URL. We support pydantic schemas to make it easier for you too. Here is how you to use it:

```python
from pydantic import BaseModel, Field
from typing import List

class Article(BaseModel):
    title: str
    points: int
    by: str
    commentsURL: str

class TopArticles(BaseModel):
    top: List[Article] = Field(..., description="Top 5 stories")

# Use JSON format with a Pydantic schema
doc = firecrawl.scrape(
    "https://news.ycombinator.com",
    formats=[{"type": "json", "schema": TopArticles}],
)
print(doc.json)
```

## Using the Node SDK

### Installation

To install the Firecrawl Node SDK, you can use npm:

```bash
npm install @mendable/firecrawl-js
```

### Usage

1. Get an API key from [firecrawl.dev](https://firecrawl.dev)
2. Set the API key as an environment variable named `FIRECRAWL_API_KEY` or pass it as a parameter to the `Firecrawl` class.

```js
import Firecrawl from '@mendable/firecrawl-js';

const firecrawl = new Firecrawl({ apiKey: 'fc-YOUR_API_KEY' });

// Scrape a website
const doc = await firecrawl.scrape('https://firecrawl.dev', {
  formats: ['markdown', 'html'],
});
console.log(doc);

// Crawl a website
const response = await firecrawl.crawl('https://firecrawl.dev', {
  limit: 100,
  scrapeOptions: { formats: ['markdown', 'html'] },
});
console.log(response);
```


### Extracting structured data from a URL

With LLM extraction, you can easily extract structured data from any URL. We support zod schema to make it easier for you too. Here is how to use it:

```js
import Firecrawl from '@mendable/firecrawl-js';
import { z } from 'zod';

const firecrawl = new Firecrawl({ apiKey: 'fc-YOUR_API_KEY' });

// Define schema to extract contents into
const schema = z.object({
  top: z
    .array(
      z.object({
        title: z.string(),
        points: z.number(),
        by: z.string(),
        commentsURL: z.string(),
      })
    )
    .length(5)
    .describe('Top 5 stories on Hacker News'),
});

// Use the v2 extract API with direct Zod schema support
const extractRes = await firecrawl.extract({
  urls: ['https://news.ycombinator.com'],
  schema,
  prompt: 'Extract the top 5 stories',
});

console.log(extractRes);
```

## 🏆 Firecrawl-All-In-One vs Cloud Offering

Firecrawl-All-In-One is the **enhanced open-source version** available under the AGPL-3.0 license with the most complete local development environment available.

### 🔥 All-In-One Local Development (Free & Most Complete)
- ✅ **All v2 Features**: Complete Firecrawl v2 API implementation
- ✅ **Enhanced MCP Server**: 12 tools with real-time monitoring (vs 8 in original)
- ✅ **Real-time SSE Support**: Live operation updates and progress tracking
- ✅ **Performance Monitoring**: Comprehensive analytics and metrics dashboard
- ✅ **Batch Processing**: Multi-URL scraping with status tracking
- ✅ **Docker Setup**: One-command deployment with `docker compose up --build`
- ✅ **No API Keys Required**: 10 out of 12 tools work without external API keys
- ✅ **Production Ready**: Advanced error handling and enterprise features

### Cloud Offering (firecrawl.dev)
Firecrawl Cloud provides additional enterprise features and higher rate limits for production use.

**Local Development Advantages:**
- No API keys required for most features
- Complete control over your data
- Perfect for development and testing
- All MCP tools fully functional
- Cost-effective for prototyping

![Open Source vs Cloud Offering](https://raw.githubusercontent.com/firecrawl/firecrawl/main/img/open-source-cloud.png)


## 🤝 Contributing to Firecrawl-All-In-One

**We welcome contributions!** Firecrawl-All-In-One is the most advanced open-source MCP server for web scraping and AI research. Help us make it even better!

### 🚀 Quick Start for Contributors
1. **Clone the enhanced repo**: `git clone [your-repo-url] && cd firecrawl-all-in-one`
2. **Launch the complete environment**: `docker compose up --build`
3. **Configure MCP**: Set up `~/.cursor/mcp.json` and test all 12 tools
4. **Run comprehensive tests**: `cd apps/api && pnpm test`

### 🛠️ All-In-One Development Features
- ✅ **Complete v2 API**: All endpoints implemented and production-tested
- ✅ **Enhanced MCP Server**: 12 tools with real-time monitoring
- ✅ **Real-time SSE**: Live operation updates and progress tracking
- ✅ **Performance Analytics**: Built-in metrics and monitoring dashboard
- ✅ **Batch Processing**: Multi-URL scraping with status management
- ✅ **Local Database**: PostgreSQL with Redis for full data persistence
- ✅ **Hot Reload**: TypeScript compilation with instant code updates
- ✅ **Advanced Error Handling**: Production-grade resilience and recovery
- ✅ **Comprehensive Tests**: Jest test suites covering all functionality

### 🎯 What You Can Contribute
- **New MCP Tools**: Add specialized scraping or analysis capabilities
- **Performance Optimizations**: Improve speed and resource usage
- **Enhanced Monitoring**: Better metrics and analytics features
- **Documentation**: Improve guides and API references
- **Testing**: Add comprehensive test coverage
- **UI Enhancements**: Improve the web interface and dashboards

For detailed setup instructions, see our [contributing guide](CONTRIBUTING.md). For production self-hosting, refer to the [self-hosting guide](SELF_HOST.md).

_It is the sole responsibility of the end users to respect websites' policies when scraping, searching and crawling with Firecrawl. Users are advised to adhere to the applicable privacy policies and terms of use of the websites prior to initiating any scraping activities. By default, Firecrawl respects the directives specified in the websites' robots.txt files when crawling. By utilizing Firecrawl, you expressly agree to comply with these conditions._

## Contributors

<a href="https://github.com/firecrawl/firecrawl/graphs/contributors">
  <img alt="contributors" src="https://contrib.rocks/image?repo=firecrawl/firecrawl"/>
</a>

## License Disclaimer

This project is primarily licensed under the GNU Affero General Public License v3.0 (AGPL-3.0), as specified in the LICENSE file in the root directory of this repository. However, certain components of this project are licensed under the MIT License. Refer to the LICENSE files in these specific directories for details.

Please note:

- The AGPL-3.0 license applies to all parts of the project unless otherwise specified.
- The SDKs and some UI components are licensed under the MIT License. Refer to the LICENSE files in these specific directories for details.
- When using or contributing to this project, ensure you comply with the appropriate license terms for the specific component you are working with.

For more details on the licensing of specific components, please refer to the LICENSE files in the respective directories or contact the project maintainers.


<p align="right" style="font-size: 14px; color: #555; margin-top: 20px;">
    <a href="#readme-top" style="text-decoration: none; color: #007bff; font-weight: bold;">
        ↑ Back to Top ↑
    </a>
</p>
