import fs from 'node:fs';
import path from 'node:path';

export function loadEnvFile(filename: string = '.env'): void {
  const filePath = path.resolve(process.cwd(), filename);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const normalized = line.startsWith('export ') ? line.slice('export '.length) : line;
    const idx = normalized.indexOf('=');
    if (idx === -1) continue;

    const key = normalized.slice(0, idx).trim();
    let value = normalized.slice(idx + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required env var: ${name}. Create a .env file (see .env.example) or set it in your shell/CI.`,
    );
  }
  return value;
}
