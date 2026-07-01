import {test} from '@playwright/test';

test("Verify PIM is cliked", async({ page }) => {

    // Set-up: Login
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', {name: 'Login'}).click();

    await page.getByText('PIM').click();
    console.log(await page.url());
    await page.waitForTimeout(3000);

    //Teardown: logout after the test
    await page.locator('.oxd-userdropdown-name').click();
    await page.getByRole('menuitem', {name: 'Logout'}).click();

});

test("Verify Time is cliked", async({ page }) => {

    // Set-up: Login
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', {name: 'Login'}).click();

    await page.getByRole('link', { name: 'Time' }).click();
    console.log(await page.url());
    await page.waitForTimeout(3000);

    //Teardown: logout after the test
    await page.locator('.oxd-userdropdown-name').click();
    await page.getByRole('menuitem', {name: 'Logout'}).click();
});