# Arca Computer Web3 Portfolio

The source for [web3.arca.computer](https://web3.arca.computer), a static evidence-led portfolio of Arca Computer's onchain products, infrastructure, and earlier web3 work.

## Stack

- Astro static output
- Cloudflare Workers Static Assets
- No client framework and no runtime backend

## Development

```bash
npm install
npm run check
npm run build
npm run preview
```

## Deployment boundary

The canonical Worker and custom domain belong to the `Arca Computer, Inc.` Cloudflare account. Global Cloudflare environment credentials may point elsewhere, so deployment commands must use the verified company OAuth profile.

No license is granted by publication of this repository.
