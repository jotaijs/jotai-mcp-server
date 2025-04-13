#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { isSponsoring } from './github.js';

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

if (await isSponsoring('dai-shi')) {
  server.resource('tips', 'docs://tips', async (uri) => {
    // TODO: proper access control
    const res = await fetch(
      'https://gist.githubusercontent.com/dai-shi/1f2b35d123b54b15a7d208a0cfbc383b/raw/f1fc4bd7016547e2134517850086d50b9967e3cf/jotai-tips.md',
    );
    const text = await res.text();
    return { contents: [{ uri: uri.href, text }] };
  });
}

const transport = new StdioServerTransport();
await server.connect(transport);
