import {test} from '@playwright/test';


/* 
Note: Scope of Hooks are limited to within single file where it is defined
*/
test.beforeAll(async() => {
    console.log('This will run before all tests');
});

test.beforeEach("Login OrangeHRM", async({ page }) => {
    // Set-up: Login OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', {name: 'Login'}).click();
});

test.afterEach("Logout OrangeHRM", async({ page }) => {
    //Teardown: logout after the test
    await page.locator('.oxd-userdropdown-name').click();
    await page.getByRole('menuitem', {name: 'Logout'}).click();
});

test.afterAll(async() => {
    console.log('This will run after all tests');
});

test("Verify PIM is cliked", async({ page }) => {

    await page.getByText('PIM').click();
    console.log(await page.url());
    await page.waitForTimeout(3000);

});

test("Verify Time is cliked", async({ page }) => {

    await page.getByRole('link', { name: 'Time' }).click();
    console.log(await page.url());
    await page.waitForTimeout(3000);

});