#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({
  name: 'Jotai',
  version: '0.0.0',
});

server.resource('readme', 'docs://readme', async (uri) => {
  const res = await fetch(
    'https://raw.githubusercontent.com/pmndrs/jotai/main/README.md',
  );
  const text = await res.text();
  return { contents: [{ uri: uri.href, text }] };
});

server.resource('tips', 'docs://tips', async (uri) => {
  const res = await fetch(
    'https://gist.githubusercontent.com/dai-shi/647037e8a1811a3b09febec42e7d1f4a/raw/a738de86596351d910b51d9adb9e9c43f1c2eee9/jotai-tips.md',
  );
  const text = await res.text();
  return { contents: [{ uri: uri.href, text }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
