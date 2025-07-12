import { query, type SDKMessage } from "@anthropic-ai/claude-code";

const messages: SDKMessage[] = [];

const prompt = `
The file 'src/index.tsx' is a template for a react component. Turn this into a with the following props that shoots fireworks when clicked and make it based on tailwindcss and shadcn:
- title: string
`

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

