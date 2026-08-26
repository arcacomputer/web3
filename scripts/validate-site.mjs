import { readFileSync } from 'node:fs';

const data = readFileSync(new URL('../src/data/projects.ts', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const wrangler = readFileSync(new URL('../wrangler.jsonc', import.meta.url), 'utf8');
const headers = readFileSync(new URL('../public/_headers', import.meta.url), 'utf8');
const worker = readFileSync(new URL('../src/worker.mjs', import.meta.url), 'utf8');

const required = [
  'WarpletScan',
  'A3Stack',
  'Castaway',
  'Castora',
  'Hypersnap Doctor',
  'POIDHMP',
  'VozPOS',
  'Castline'
];

for (const claim of required) {
  if (!data.includes(claim) && !page.includes(claim)) {
    throw new Error(`Missing required project: ${claim}`);
  }
}

if (!page.includes('49,060')) throw new Error('WarpletScan evidence count is missing');
if (!page.includes('Alchemy')) throw new Error('Current Alchemy usage is missing');
if (!layout.includes('og.png')) throw new Error('Social image metadata is missing');
if (!layout.includes('canonical')) throw new Error('Canonical metadata is missing');
if (!wrangler.includes('"workers_dev": false')) throw new Error('workers.dev must remain disabled');
if (!wrangler.includes('"preview_urls": false')) throw new Error('preview URLs must remain disabled');
if (!wrangler.includes('"pattern": "web3.arca.computer"')) throw new Error('Custom domain is missing');
if (!wrangler.includes('"custom_domain": true')) throw new Error('Custom domain route is not explicit');
if (!wrangler.includes('"not_found_handling": "404-page"')) throw new Error('Custom 404 handling is missing');
if (!wrangler.includes('"main": "./src/worker.mjs"')) throw new Error('Explicit Worker entrypoint is missing');
if (!wrangler.includes('"binding": "ASSETS"')) throw new Error('Static asset binding is missing');
if (!wrangler.includes('"run_worker_first": true')) throw new Error('Worker-first routing is missing');
if (!worker.includes('env.ASSETS.fetch(request)')) throw new Error('Worker must delegate to static assets');
if (!headers.includes("Content-Security-Policy: default-src 'self'")) throw new Error('CSP is missing');
if (!headers.includes('Strict-Transport-Security: max-age=31536000')) throw new Error('HSTS is missing');

const forbidden = ['124,000 users', 'owns Hypersnap', 'all traffic is human'];
for (const claim of forbidden) {
  if (`${data}\n${page}`.includes(claim)) throw new Error(`Forbidden claim found: ${claim}`);
}

console.log('site claims and deployment contract: ok');
