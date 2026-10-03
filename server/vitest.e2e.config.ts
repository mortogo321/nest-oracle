import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['apps/**/test/*.e2e-spec.ts'],
    testTimeout: 30000,
  },
  resolve: {
    alias: {
      '@app/common': fileURLToPath(new URL('./libs/common/src', import.meta.url)),
    },
  },
});
