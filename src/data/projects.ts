export type Project = {
  name: string;
  state: 'live' | 'active' | 'public beta' | 'prototype' | 'archived';
  kind: string;
  description: string;
  proof: string;
  url: string;
  source?: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: 'A3Stack',
    state: 'active',
    kind: 'Agent infrastructure',
    description: 'A TypeScript SDK joining smart accounts, ERC-8004 identity, x402 payments, and MCP data into one composable stack.',
    proof: 'Public packages, documentation, examples, and Base-native identity and payment flows.',
    url: 'https://a3stack.arcabot.ai/',
    source: 'https://github.com/arcabotai/a3stack',
    tags: ['Base', 'ERC-8004', 'x402', 'MCP']
  },
  {
    name: 'Castaway',
    state: 'live',
    kind: 'Farcaster mini app',
    description: 'A playable 3D island with fishing, crab traps, live chat, personal rooms, a Shells economy, and Farcaster sharing.',
    proof: 'Playable today as a guest, with wallet-backed identity available for saved progress and social features.',
    url: 'https://castaway.social/world',
    tags: ['Farcaster', 'Game', 'Wallets', 'Social']
  },
  {
    name: 'Castora',
    state: 'public beta',
    kind: 'Farcaster client',
    description: 'An Arca-maintained workspace for faster reading, controlled publishing, profile context, embeds, and mobile use.',
    proof: 'Public web beta and PWA surface, built from the Supercast base with clear upstream attribution.',
    url: 'https://castora.social/',
    tags: ['Farcaster', 'Client', 'PWA', 'Social']
  },
  {
    name: 'Hypersnap Doctor',
    state: 'active',
    kind: 'Independent node tooling',
    description: 'Diagnostics, safe repair, install preflight, logs, and sanitized support reports for Hypersnap and Snapchain operators.',
    proof: 'MIT-licensed operator CLI with an explicit non-destructive repair boundary and public tests.',
    url: 'https://hypersnap.org/run-a-node',
    source: 'https://github.com/arcabotai/hypersnapdoctor',
    tags: ['Snapchain', 'Nodes', 'CLI', 'Open source']
  },
  {
    name: 'POIDHMP',
    state: 'prototype',
    kind: 'Claim NFT discovery',
    description: 'A clean discovery and lookup surface for POIDH claim NFTs across Base, Arbitrum, Ethereum, and Degen Chain.',
    proof: 'Public contract map and prototype interface. Native listings are deliberately not claimed yet.',
    url: 'https://poidhmp.arcabot.ai/',
    tags: ['NFTs', 'Base', 'Multichain', 'Marketplace']
  },
  {
    name: 'VozPOS',
    state: 'prototype',
    kind: 'Solana commerce',
    description: 'A mobile cashier that turns an order into a Solana Pay invoice, QR handoff, validation flow, and receipt.',
    proof: 'Public hackathon prototype with real versus simulated boundaries documented on the product page.',
    url: 'https://vozpos.vercel.app/',
    source: 'https://github.com/arcabotai/vozpos',
    tags: ['Solana Pay', 'Commerce', 'Mobile', 'USDC']
  },
  {
    name: 'Castline',
    state: 'prototype',
    kind: 'Farcaster workbench',
    description: 'A terminal-first Farcaster feed, composer, reply, and command-generation surface for keyboard-driven workflows.',
    proof: 'Public MVP showing typed Neynar requests and signer-aware composition paths.',
    url: 'https://castline-eight.vercel.app/',
    tags: ['Farcaster', 'CLI', 'Neynar', 'Developer tools']
  }
];

export const history = [
  {
    period: '2021–2023',
    title: 'Art entered the chain',
    body: 'Analogue ink work minted across Tezos, Polygon, and Ethereum, alongside community and gallery work in Cryptovoxels and Monaverse.'
  },
  {
    period: '2022–2024',
    title: 'Platforms and communities',
    body: 'Product, community, and creator work across Versum, Voxels, and Screensaver sharpened the operating view: culture is infrastructure too.'
  },
  {
    period: '2024–2025',
    title: 'Farcaster-native products',
    body: 'Mini apps, bots, social experiments, wallet-aware games, and WarpletScan turned protocol participation into shipped software.'
  },
  {
    period: '2026–',
    title: 'Onchain systems for agents',
    body: 'Arca now builds identity, payments, data access, node operations, consumer worlds, and developer tooling as one evidence-led portfolio.'
  }
];
