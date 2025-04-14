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
      'https://gist.githubusercontent.com/dai-shi/1f2b35d123b54b15a7d208a0cfbc383b/raw/b3c7dd73b6384b605bcbbab86d6eb33b0ad5b408/jotai-tips.md',
    );
    const text = await res.text();
    return { contents: [{ uri: uri.href, text }] };
  });
}

const transport = new StdioServerTransport();
await server.connect(transport);
