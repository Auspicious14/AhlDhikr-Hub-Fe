import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:3001',
    viewport: { width: 1280, height: 720 },
  },
});
