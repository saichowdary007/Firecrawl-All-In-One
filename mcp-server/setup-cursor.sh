#!/bin/bash

# Setup script for Firecrawl MCP Server with Cursor

echo "🔥 Firecrawl MCP Server Setup for Cursor"
echo "========================================"

# Get the absolute path to the MCP server
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FIRECRAWL_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "📁 Firecrawl root directory: $FIRECRAWL_ROOT"
echo "📁 MCP server directory: $SCRIPT_DIR"

# Detect OS and set config path
if [[ "$OSTYPE" == "darwin"* ]]; then
    CONFIG_DIR="$HOME/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.cursor-shinobi"
    CONFIG_FILE="$CONFIG_DIR/mcp.json"
    echo "🍎 Detected macOS"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    CONFIG_DIR="$HOME/.config/Cursor/User/globalStorage/rooveterinaryinc.cursor-shinobi"
    CONFIG_FILE="$CONFIG_DIR/mcp.json"
    echo "🐧 Detected Linux"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    CONFIG_DIR="$APPDATA/Cursor/User/globalStorage/rooveterinaryinc.cursor-shinobi"
    CONFIG_FILE="$CONFIG_DIR/mcp.json"
    echo "🪟 Detected Windows"
else
    echo "❌ Unsupported OS: $OSTYPE"
    exit 1
fi

echo "📍 Cursor MCP config location: $CONFIG_FILE"

# Create config directory if it doesn't exist
mkdir -p "$CONFIG_DIR"

# Check if config file exists
if [[ -f "$CONFIG_FILE" ]]; then
    echo "⚠️  MCP config file already exists at: $CONFIG_FILE"
    echo "Would you like to:"
    echo "1) View current configuration"
    echo "2) Backup and create new configuration"
    echo "3) Add Firecrawl to existing configuration"
    echo "4) Skip and exit"
    read -p "Enter your choice (1-4): " choice

    case $choice in
        1)
            echo "📄 Current configuration:"
            cat "$CONFIG_FILE"
            exit 0
            ;;
        2)
            BACKUP_FILE="$CONFIG_FILE.backup.$(date +%Y%m%d_%H%M%S)"
            cp "$CONFIG_FILE" "$BACKUP_FILE"
            echo "💾 Backup created: $BACKUP_FILE"
            ;;
        3)
            # Read existing config and merge
            EXISTING_CONFIG=$(cat "$CONFIG_FILE")
            ;;
        4)
            echo "👋 Exiting..."
            exit 0
            ;;
        *)
            echo "❌ Invalid choice"
            exit 1
            ;;
    esac
fi

# Build the MCP server if not built
if [[ ! -f "$SCRIPT_DIR/dist/index.js" ]]; then
    echo "🔨 Building MCP server..."
    cd "$SCRIPT_DIR"
    npm run build
    if [[ $? -ne 0 ]]; then
        echo "❌ Failed to build MCP server"
        exit 1
    fi
    echo "✅ MCP server built successfully"
fi

# Create configuration
if [[ -n "$EXISTING_CONFIG" ]]; then
    # Merge with existing configuration
    echo "🔄 Merging with existing configuration..."

    # Use jq if available, otherwise create basic merge
    if command -v jq &> /dev/null; then
        echo "$EXISTING_CONFIG" | jq ".mcpServers.firecrawl = {
            \"command\": \"node\",
            \"args\": [\"$SCRIPT_DIR/dist/index.js\"],
            \"env\": {
                \"FIRECRAWL_API_URL\": \"http://localhost:3002\",
                \"FIRECRAWL_API_KEY\": \"\"
            }
        }" > "$CONFIG_FILE"
    else
        # Basic merge without jq
        CONFIG_CONTENT=$(cat << EOF
{
  "mcpServers": {
    "firecrawl": {
      "command": "node",
      "args": ["$SCRIPT_DIR/dist/index.js"],
      "env": {
        "FIRECRAWL_API_URL": "http://localhost:3002",
        "FIRECRAWL_API_KEY": ""
      }
    }
  }
}
EOF
)
        echo "$CONFIG_CONTENT" > "$CONFIG_FILE"
        echo "⚠️  Warning: Could not merge with existing config. Replaced with new config."
    fi
else
    # Create new configuration
    cat > "$CONFIG_FILE" << EOF
{
  "mcpServers": {
    "firecrawl": {
      "command": "node",
      "args": ["$SCRIPT_DIR/dist/index.js"],
      "env": {
        "FIRECRAWL_API_URL": "http://localhost:3002",
        "FIRECRAWL_API_KEY": ""
      }
    }
  }
}
EOF
fi

echo "✅ Configuration created at: $CONFIG_FILE"
echo ""
echo "🚀 Next steps:"
echo "1. Make sure your Firecrawl instance is running (docker compose up)"
echo "2. Restart Cursor to load the new MCP configuration"
echo "3. Test the integration by asking Cursor to scrape a website"
echo ""
echo "🔧 Configuration details:"
echo "- MCP Server: firecrawl"
echo "- Command: node $SCRIPT_DIR/dist/index.js"
echo "- API URL: http://localhost:3002"
echo ""
echo "📚 Available tools:"
echo "- firecrawl_scrape: Scrape content from URLs"
echo "- firecrawl_map: Map website URLs"
echo "- firecrawl_crawl: Start crawl jobs"
echo "- firecrawl_search: Search the web"
echo "- firecrawl_extract: Extract structured data"
echo "- firecrawl_deep_research: Conduct deep research"
echo ""
echo "🎉 Setup complete! Happy scraping! 🔥"
