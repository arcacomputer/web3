import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const links = [...html.matchAll(/<a[^>]+href="(https:\/\/[^"#]+)"/g)].map((match) => match[1]);
const unique = [...new Set(links)];
const failures = [];

for (const url of unique) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': 'Arca-portfolio-link-check/1.0' },
      signal: AbortSignal.timeout(20_000)
    });
    if (response.ok) console.log(`${response.status} ${url}`);
    else if ([403, 429].includes(response.status)) console.log(`${response.status} protected ${url}`);
    else failures.push(`${response.status} ${url}`);
    await response.body?.cancel();
  } catch (error) {
    failures.push(`ERR ${url} (${error instanceof Error ? error.message : String(error)})`);
  }
}

if (failures.length) {
  throw new Error(`Broken external links:\n${failures.join('\n')}`);
}

console.log(`${unique.length} external links: ok`);