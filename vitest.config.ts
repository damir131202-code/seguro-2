import path from 'node:path';
codex/create-new-e-commerce-project-from-scratch-64303r
import { webcrypto } from 'node:crypto';
import { defineConfig } from 'vitest/config';

if (!globalThis.crypto) {
  Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    configurable: true
  });
}

=======
import { defineConfig } from 'vitest/config';

main
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
