#!/usr/bin/env node

// Simple test script to validate MCP server functionality
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing Firecrawl MCP Server...\n');

// Start the MCP server
const serverPath = path.join(__dirname, 'dist', 'index.js');
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: {
    ...process.env,
    FIRECRAWL_API_URL: 'http://localhost:3002',
    FIRECRAWL_API_KEY: ''
  }
});

let serverOutput = '';
let serverErrors = '';

server.stdout.on('data', (data) => {
  serverOutput += data.toString();
});

server.stderr.on('data', (data) => {
  serverErrors += data.toString();
});

server.on('error', (error) => {
  console.error('❌ Failed to start MCP server:', error.message);
  process.exit(1);
});

// Test initialization
setTimeout(() => {
  console.log('📡 Sending initialization request...');

  const initRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'mcp-test-client',
        version: '1.0.0'
      }
    }
  };

  server.stdin.write(JSON.stringify(initRequest) + '\n');

  // Test tools list
  setTimeout(() => {
    console.log('🔧 Requesting tools list...');

    const toolsRequest = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list',
      params: {}
    };

    server.stdin.write(JSON.stringify(toolsRequest) + '\n');

    // Give some time for responses
    setTimeout(() => {
      console.log('\n📋 Server Output:');
      console.log(serverOutput.slice(-500)); // Last 500 chars

      if (serverErrors) {
        console.log('\n⚠️  Server Errors:');
        console.log(serverErrors.slice(-200));
      }

      // Kill the server
      server.kill();

      // Check if we got expected responses
      if (serverOutput.includes('firecrawl_scrape') && serverOutput.includes('firecrawl_map')) {
        console.log('\n✅ MCP Server test PASSED! Firecrawl tools are available.');
        console.log('🎉 Your local Firecrawl MCP integration is working correctly!');
      } else {
        console.log('\n❌ MCP Server test FAILED. Tools not found in response.');
      }

      process.exit(0);
    }, 1000);
  }, 500);
}, 1000);

// Timeout after 10 seconds
setTimeout(() => {
  console.log('\n⏰ Test timeout reached');
  server.kill();
  process.exit(1);
}, 10000);
