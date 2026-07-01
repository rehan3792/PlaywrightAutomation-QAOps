import { test as baseTest, page } from '@playwright/test';

const myFixtures = {
    loggedinPage: page
};

export const test = baseTest.extend({
  loggedinPage: async ({ page }, use) => {

    // 1. SETUP: Executed before the test runs
    console.log('Setting up fixture...');
    // Set-up: Login
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', {name: 'Login'}).click();
    
    // 2. USE: Pass the fixture value to your test and pause for execution
    await use(page);

    // 3. TEARDOWN: Executed after the test completes
    console.log('Tearing down fixture...');
    //Teardown: logout after the test
    await page.locator('.oxd-userdropdown-name').click();
    await page.getByRole('menuitem', {name: 'Logout'}).click();
  }
});