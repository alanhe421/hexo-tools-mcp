#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hexo_prompt = fs.readFileSync(path.resolve(__dirname, 'prompt.md'), 'utf-8');
// Create server instance
const server = new McpServer({
    name: 'hexo-tools-server',
    version: '0.0.1'
});
// Register PDF tools
server.tool('translate-hexo-to-en', 'Translate hexo blog to English', {}, async ({}) => {
    return {
        content: [
            {
                type: 'text',
                text: hexo_prompt
            }
        ]
    };
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Hexo Tools MCP Server running on stdio');
}
main().catch((error) => {
    console.error('Fatal error in main():', error);
    process.exit(1);
});
