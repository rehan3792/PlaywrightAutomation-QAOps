// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 40*1000,
  expect: {
    timeout: 5*1000,
  },

  reporter: 'html',
  
  use: {

    
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'retain-on-failure',

  },

});

