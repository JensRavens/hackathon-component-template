import ms from 'ms';
import { Sandbox } from '@vercel/sandbox';
import { createWriteStream } from 'fs';

async function createSandbox(): Promise<Sandbox> {
  const startTime = Date.now();
  const sandbox = await Sandbox.create({
    source: {
      url: 'https://github.com/JensRavens/hackathon-component-template.git',
      type: 'git',
    },
    resources: { vcpus: 4 },
    // Timeout in milliseconds: ms('10m') = 600000
    // Defaults to 5 minutes. The maximum is 45 minutes.
    timeout: ms('10m'),
    ports: [3000],
    runtime: 'node22',
  });
  console.log(`Sandbox created in ${Date.now() - startTime}ms`);
  return sandbox;
}

async function execute(sandbox: Sandbox, command: string, args?: string[]) {
  const startTime = Date.now();
  const result = await sandbox.runCommand({
    cmd: command,
    args,
    stdout: process.stdout,
    stderr: process.stderr,
  });
  if (result.exitCode !== 0) {
    throw new Error(`Command "${command} ${args?.join(' ')}" failed with exit code ${result.exitCode}`);
  }
  console.log(`Command "${command} ${args?.join(' ')}" executed in ${Date.now() - startTime}ms`);
  return result;
}

async function main() {
  const sandbox = await createSandbox();

  try {
    await execute(sandbox, 'pnpm', ['install', '--loglevel', 'info']);
    await execute(sandbox, 'pnpm', ['run', 'build']);
    const componentStream = await sandbox.readFile({ path: 'public/components/index.mjs' });
    if (!componentStream) {
      throw new Error('Component file not found in sandbox');
    }
    componentStream.pipe(createWriteStream('component.js'))
  } finally {
    await sandbox.stop();
  }
}

main().catch(console.error);
