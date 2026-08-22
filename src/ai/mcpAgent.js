const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { StreamableHTTPClientTransport } = require("@modelcontextprotocol/sdk/client/streamableHttp.js");

class MCPAgent {

    async connect() {
        this.client = new Client({
            name: "playwright-agent",
            version: "1.0.0"
        });

        const transport = new StreamableHTTPClientTransport(
            new URL("http://localhost:8931/mcp")
        );

        await this.client.connect(transport);

        console.log("MCP Connected");
    }

    async executeTool(name, args) {
        return await this.client.callTool({
            name,
            arguments: args
        });
    }
}

module.exports = MCPAgent;