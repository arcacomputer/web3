# Arca Computer Web3 Portfolio

The source for [web3.arca.computer](https://web3.arca.computer), a static evidence-led portfolio of Arca Computer's onchain products, infrastructure, and earlier web3 work.

## Stack

- Astro static output
- Cloudflare Pages Direct Upload
- No client framework and no runtime backend

## Development

```bash
npm install
npm run check
npm run build
npm run preview
```

## Deployment boundary

The canonical Pages project is `arca-web3`. It and the `web3.arca.computer` custom domain belong to the `Arca Computer, Inc.` Cloudflare account. Global Cloudflare environment credentials may point elsewhere, so deployment commands must use verified company credentials.

Deploy only a clean commit already pushed to `origin/main`, and attach that exact SHA to the Pages deployment:

```bash
SHA=$(git rev-parse HEAD)
test "$(git ls-remote origin refs/heads/main | cut -f1)" = "$SHA"
test -z "$(git status --porcelain)"
npm run build
npx wrangler pages deploy dist \
  --project-name arca-web3 \
  --branch main \
  --commit-hash "$SHA" \
  --commit-message "GitHub $SHA" \
  --commit-dirty=false
```

No license is granted by publication of this repository.
