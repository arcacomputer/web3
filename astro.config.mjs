import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://web3.arca.computer',
  build: {
    format: 'directory'
  }
});
