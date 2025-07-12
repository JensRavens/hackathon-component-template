import { query, type SDKMessage } from "@anthropic-ai/claude-code";
import { readFile } from "fs/promises";

const prompt = await readFile("prompt.md", "utf-8");

for await (const message of query({
  prompt,
  abortController: new AbortController(),
  options: {
    maxTurns: 20,
    allowedTools: ["Task",
      "Glob",
      "Grep",
      "LS",
      "exit_plan_mode",
      "Read",
      "Edit",
      "MultiEdit",
      "Write",
      "NotebookRead",
      "NotebookEdit",
      "WebFetch",
      "TodoWrite",
      "WebSearch"],
  },
})) {
  console.log(message.message?.content ?? JSON.stringify(message, null, 2));
}

