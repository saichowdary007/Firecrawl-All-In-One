# 🔥 Firecrawl-All-In-One

**The Most Complete Web Scraping & AI Research Platform**

Transform your AI applications with clean, structured data from any website. Firecrawl-All-In-One is an **enhanced, production-ready version** that fixes all issues from the original repository and adds powerful new capabilities for AI-powered web research and automation.

> **🚀 What Makes This Special**: We've taken the original Firecrawl repository and completely transformed it with working MCP tools, real-time monitoring, batch processing, and enterprise-grade features. No more broken endpoints or missing functionality!

## ✨ What We've Fixed & Enhanced

### 🔧 **Major Issues Fixed from Original Repository:**

| Issue | Original Status | Our Fix |
|-------|----------------|---------|
| **Broken MCP Tools** | ❌ 4/8 tools failed (404 errors) | ✅ **All 12 tools working** |
| **Missing v2 Endpoints** | ❌ Deep research & LLM.txt generation | ✅ **Complete v2 API implementation** |
| **Incomplete Documentation** | ❌ Outdated and confusing | ✅ **Clear, comprehensive guides** |
| **Complex Setup** | ❌ Manual configuration required | ✅ **One-click Docker deployment** |
| **No Real-time Features** | ❌ No live monitoring | ✅ **SSE support for live updates** |
| **Basic Error Handling** | ❌ Simple error messages | ✅ **Advanced retry logic & monitoring** |

### 🚀 **New Features We've Added:**

#### **🔥 Enhanced MCP Server (12 Tools)**
- **`firecrawl_scrape`** - Advanced single URL scraping
- **`firecrawl_map`** - Website URL discovery
- **`firecrawl_crawl`** - Asynchronous website crawling
- **`firecrawl_check_crawl_status`** - Monitor crawl progress
- **`firecrawl_batch_scrape`** - Multi-URL batch processing
- **`firecrawl_check_batch_status`** - Batch operation monitoring
- **`firecrawl_deep_research`** - AI-powered research
- **`firecrawl_generate_llmstxt`** - LLM.txt file generation
- **`firecrawl_subscribe_updates`** - Real-time SSE monitoring
- **`firecrawl_get_performance_metrics`** - Analytics dashboard
- **`firecrawl_search`** - Web search with content extraction
- **`firecrawl_extract`** - AI-powered structured data extraction

#### **⚡ Advanced Capabilities**
- **Real-time SSE Support** - Live operation monitoring and progress updates
- **Performance Monitoring** - Comprehensive metrics and analytics dashboard
- **Batch Processing** - Efficient multi-URL scraping with status tracking
- **Automatic Retry Logic** - Exponential backoff for transient errors
- **Rate Limit Handling** - Smart retry mechanisms
- **Credit Monitoring** - Real-time usage tracking with warnings
- **Enhanced Error Handling** - Detailed error messages and categorization
- **Production-Ready Resilience** - Network error handling and recovery

## 🛠️ **Quick Start - Get Running in Minutes**

### **1. Clone & Launch**
```bash
git clone [your-repo-url]
cd firecrawl-all-in-one
docker compose up --build
```

### **2. Configure MCP Server**
Create `~/.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "node",
      "args": ["/path/to/firecrawl-all-in-one/mcp-server/dist/index.js"],
      "env": {
        "FIRECRAWL_API_URL": "http://localhost:3002",
        "FIRECRAWL_API_KEY": ""
      }
    }
  }
}
```

### **3. Test Your Setup**
All **12 MCP tools** are now available in your AI assistant:
- 10 tools work **without any API keys**
- 2 tools require optional API keys for enhanced features
- Real-time monitoring and performance analytics included

## 🏆 **Firecrawl-All-In-One vs Original Repository**

| Feature | Original Repository | Firecrawl-All-In-One |
|---------|-------------------|---------------------|
| **Working MCP Tools** | 4/8 (50%) | 12/12 (100%) |
| **Real-time Monitoring** | ❌ None | ✅ SSE Support |
| **Batch Processing** | ❌ None | ✅ Multi-URL Scraping |
| **Performance Analytics** | ❌ None | ✅ Full Dashboard |
| **Setup Complexity** | ⚠️ Manual Setup | ✅ One-Click Docker |
| **API Key Requirements** | 7/8 tools | 10/12 tools (83% free) |
| **Error Handling** | ⚠️ Basic | ✅ Enterprise-grade |
| **Documentation** | ⚠️ Incomplete | ✅ Comprehensive |

## 📊 **Complete Feature Overview**

### **🔥 Core MCP Tools (10/12 No API Keys Required)**
- **`firecrawl_scrape`** - Single URL scraping with advanced options
- **`firecrawl_map`** - Website URL discovery and mapping
- **`firecrawl_crawl`** - Asynchronous website crawling
- **`firecrawl_check_crawl_status`** - Monitor crawl operations
- **`firecrawl_batch_scrape`** - Multi-URL batch processing
- **`firecrawl_check_batch_status`** - Batch operation monitoring
- **`firecrawl_deep_research`** - AI-powered deep research
- **`firecrawl_generate_llmstxt`** - LLM.txt file generation
- **`firecrawl_subscribe_updates`** - Real-time SSE monitoring
- **`firecrawl_get_performance_metrics`** - Performance analytics

### **🔑 Optional API Key Features (2/12)**
- **`firecrawl_search`** - Web search with content extraction (requires `SERPER_API_KEY`)
- **`firecrawl_extract`** - AI-powered data extraction (requires `OPENAI_API_KEY`)

## 🎯 **What This Means for You**

### **For AI Assistant Users:**
- **12 powerful tools** for comprehensive web research and data extraction
- **Real-time progress updates** for long-running operations
- **Performance monitoring** to optimize your workflows
- **Batch processing** for efficient multi-site research
- **No API keys required** for 10/12 core features

### **For Developers:**
- **One-click deployment** with Docker Compose
- **Complete local development environment** with all services
- **Production-ready features** with enterprise-grade reliability
- **Comprehensive documentation** and clear setup guides
- **Advanced monitoring and analytics** capabilities

### **For Organizations:**
- **Cost-effective development** with 83% of tools API-free
- **Enterprise-grade reliability** with advanced error handling
- **Scalable architecture** with real-time monitoring
- **Complete self-hosted solution** with full control
- **Future-proof MCP integration** for AI workflows

## 🤝 Contributing to Firecrawl-All-In-One

**We welcome contributions!** Firecrawl-All-In-One is the most advanced open-source MCP server for web scraping and AI research. Help us make it even better!

### 🚀 Quick Start for Contributors
1. **Clone the enhanced repo**: `git clone [your-repo-url] && cd firecrawl-all-in-one`
2. **Launch the complete environment**: `docker compose up --build`
3. **Configure MCP**: Set up `~/.cursor/mcp.json` and test all 12 tools
4. **Run comprehensive tests**: `cd apps/api && pnpm test`

### 🛠️ Development Features
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

---

## 📈 **Summary**

Firecrawl-All-In-One represents a **complete transformation** of the original Firecrawl repository:

- ✅ **From 4/8 working MCP tools to 12/12 fully functional**
- ✅ **From manual setup to one-click Docker deployment**
- ✅ **From basic error handling to enterprise-grade resilience**
- ✅ **From no monitoring to comprehensive real-time analytics**
- ✅ **From incomplete documentation to comprehensive guides**
- ✅ **From 7/8 API-dependent tools to 10/12 API-free tools**

**This is now the most complete, production-ready MCP server available for AI-powered web scraping and research workflows.**

---

*Built with ❤️ by the Firecrawl-All-In-One community*
