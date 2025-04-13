# Jotai MCP Server

## Requirements

- [Deno](https://deno.com/) must be installed.

## Config

```json
{
  "mcpServers": {
    "jotai-mcp-server": {
      "command": "deno",
      "args": ["run", "--allow-env", "--allow-net", "npm:jotai-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_token"
      }
    }
  }
}
```

## Resources

### readme

This is just the `readme.md` file from the official repository.  
You wouldn't usually need this, as it's publicly available.  
However, it might be useful for testing purposes.

### tips

This is a collection of tips using Jotai atoms.  
It's available only to [dai-shi's sponsors](https://github.com/sponsors/dai-shi).
