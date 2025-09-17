# Firecrawl MCP Server

This is an MCP (Model Context Protocol) server that provides access to Firecrawl's web scraping and data extraction capabilities through Cursor.

## Features

The MCP server provides the following tools:

- **firecrawl_scrape**: Scrape content from a single URL
- **firecrawl_map**: Map a website to discover all indexed URLs
- **firecrawl_crawl**: Start an asynchronous crawl job
- **firecrawl_check_crawl_status**: Check the status of a crawl job
- **firecrawl_search**: Search the web and extract content
- **firecrawl_extract**: Extract structured data using LLM
- **firecrawl_deep_research**: Conduct deep web research
- **firecrawl_generate_llmstxt**: Generate LLMs.txt files

## Setup

1. **Prerequisites**: Make sure you have your Firecrawl instance running locally (see main repo's SELF_HOST.md)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the server**:
   ```bash
   npm run build
   ```

## Configuration for Cursor

### Option 1: Global MCP Configuration

Create or edit your Cursor MCP configuration file:

**macOS**: `~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.cursor-shinobi/mcp.json`

**Linux**: `~/.config/Cursor/User/globalStorage/rooveterinaryinc.cursor-shinobi/mcp.json`

**Windows**: `%APPDATA%\Cursor\User\globalStorage\rooveterinaryinc.cursor-shinobi\mcp.json`

Add the following configuration:

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "node",
      "args": ["/absolute/path/to/firecrawl/mcp-server/dist/index.js"],
      "env": {
        "FIRECRAWL_API_URL": "http://localhost:3002",
        "FIRECRAWL_API_KEY": ""
      }
    }
  }
}
```

### Option 2: Workspace-specific Configuration

Create a `.cursor/mcp.json` file in your project root:

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "node",
      "args": ["../mcp-server/dist/index.js"],
      "env": {
        "FIRECRAWL_API_URL": "http://localhost:3002",
        "FIRECRAWL_API_KEY": ""
      }
    }
  }
}
```

## Environment Variables

- `FIRECRAWL_API_URL`: URL of your Firecrawl instance (default: `http://localhost:3002`)
- `FIRECRAWL_API_KEY`: API key for authentication (optional for self-hosted)

## Usage

Once configured, you can use Firecrawl tools in Cursor by mentioning them in your conversations. For example:

- "Scrape the content from https://example.com"
- "Map all URLs on https://example.com"
- "Search for 'latest AI news' on the web"
- "Extract product information from these URLs: [...]"

## Development

To run in development mode:

```bash
npm run dev
```

To test the server manually:

```bash
npm run build
node dist/index.js
```

## Troubleshooting

1. **Server not connecting**: Make sure your Firecrawl instance is running on the configured port
2. **Tools not appearing**: Restart Cursor after updating the MCP configuration
3. **Permission issues**: Ensure the paths in your configuration are absolute and accessible

## API Compatibility

This MCP server is designed to work with Firecrawl's v1 API endpoints:
- `/v1/scrape`
- `/v1/map`
- `/v1/crawl`
- `/v1/search`
- `/v1/extract`
- `/v1/deep-research`
- `/v1/generate-llmstxt`
