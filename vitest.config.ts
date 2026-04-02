import path from 'node:path';
import { webcrypto } from 'node:crypto';
import { defineConfig } from 'vitest/config';

/**
 * Keep a single source of truth in this file to avoid merge-conflict duplicates.
 * Also polyfills Web Crypto for older Node runtimes used by Vite/Vitest bootstrap.
 */
if (!globalThis.crypto) {
  Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    configurable: true
  });
}

const config = defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts']
  }
});

export default config;
