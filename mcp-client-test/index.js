const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { StreamableHTTPClientTransport } = require("@modelcontextprotocol/sdk/client/streamableHttp.js");

async function main() {
  const client = new Client({
    name: "playwright-mcp-test",
    version: "1.0.0"
  });

  const transport = new StreamableHTTPClientTransport(
    new URL("http://localhost:8931/mcp")
  );

  await client.connect(transport);

  const tools = await client.listTools();

  console.log("Available MCP Tools:");
  console.log(tools);
}

main().catch(console.error);