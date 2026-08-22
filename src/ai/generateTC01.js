const MCPAgent = require("./mcpAgent");

async function run() {

    const agent = new MCPAgent();

    await agent.connect();

    await agent.executeTool(
        "browser_navigate",
        {
            url: "https://automationexercise.com"
        }
    );

    const snapshot = await agent.executeTool(
        "browser_snapshot",
        {}
    );

    console.log(JSON.stringify(snapshot, null, 2));
}

run();