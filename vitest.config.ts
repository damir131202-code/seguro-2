import path from 'node:path';
import { webcrypto } from 'node:crypto';
import { defineConfig } from 'vitest/config';

// Polyfill for environments where global Web Crypto is missing.
if (!globalThis.crypto) {
  Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    configurable: true
  });
}

export default defineConfig({
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
