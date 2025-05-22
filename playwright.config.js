// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  /* Increase the global timeout to 90 seconds */
  timeout: 90 * 1000,
  expect: {
    /* Increase expect timeout to 60 seconds */
    timeout: 60 * 1000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1, // Added 1 retry even for local runs
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['allure-playwright'],
    ['list']
  ],
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: 'https://rahulshettyacademy.com',
    /* Maximum time each navigation can take */
    navigationTimeout: 60 * 1000,
    /* Maximum time to wait for an action (click, fill, etc) */
    actionTimeout: 30 * 1000,
    /* Collect trace when retrying the failed test */
    trace: 'retain-on-failure',
    /* Capture screenshot after each test failure */
    screenshot: 'only-on-failure',
    /* Record video only when retrying a test for the first time */
    video: 'on-first-retry',
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        /* Additional chromium-specific settings */
        launchOptions: {
          args: ['--disable-dev-shm-usage']
        }
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
};

module.exports = config;

