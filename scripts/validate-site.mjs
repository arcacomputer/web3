import { readFileSync } from 'node:fs';

const data = readFileSync(new URL('../src/data/projects.ts', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const wrangler = readFileSync(new URL('../wrangler.jsonc', import.meta.url), 'utf8');
const headers = readFileSync(new URL('../public/_headers', import.meta.url), 'utf8');
const packageJson = readFileSync(new URL('../package.json', import.meta.url), 'utf8');
const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');

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
if (!wrangler.includes('"name": "arca-web3"')) throw new Error('Pages project name is missing');
if (!wrangler.includes('"pages_build_output_dir": "./dist"')) throw new Error('Pages output directory is missing');
if (wrangler.includes('"main"') || wrangler.includes('"assets"') || wrangler.includes('"routes"')) {
  throw new Error('Worker-only configuration must not remain in the Pages contract');
}
if (!packageJson.includes('wrangler pages dev dist')) throw new Error('Pages preview command is missing');
if (!packageJson.includes('wrangler pages deploy dist --project-name arca-web3')) {
  throw new Error('Pages deployment command is missing');
}
if (!readme.includes('Cloudflare Pages')) throw new Error('README must document the Pages architecture');
if (!headers.includes("Content-Security-Policy: default-src 'self'")) throw new Error('CSP is missing');
if (!headers.includes('Strict-Transport-Security: max-age=31536000')) throw new Error('HSTS is missing');

const forbidden = ['124,000 users', 'owns Hypersnap', 'all traffic is human'];
for (const claim of forbidden) {
  if (`${data}\n${page}`.includes(claim)) throw new Error(`Forbidden claim found: ${claim}`);
}

console.log('site claims and deployment contract: ok');
