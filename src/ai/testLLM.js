const { askLLM } = require("./llmClient");

async function test() {
  const result = await askLLM("Explain MCP in one sentence");
  console.log(result);
}

test();