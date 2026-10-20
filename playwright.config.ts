import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

const verifyURL = process.env.VERIFY_URL;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 3,
  reporter: 'list',
  use: {
    baseURL: verifyURL || 'http://127.0.0.1:4322',
    launchOptions: {
      executablePath: process.env.CHROME_PATH || (existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined),
      args: ['--no-sandbox'],
    },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: verifyURL ? undefined : {
    command: 'npm run build && npm run preview -- --port 4322 --ignore-lock',
    url: 'http://127.0.0.1:4322',
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
