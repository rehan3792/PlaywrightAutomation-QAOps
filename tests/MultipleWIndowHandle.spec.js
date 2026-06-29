import { test, expect } from '@playwright/test';

test("Handle Page/window", async ({ browser }) => {

    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await page1.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const page1Title = await page1.title();
    console.log("page1Title:", page1Title);
    await expect(page1).toHaveTitle('OrangeHRM');
    await page2.goto('https://orangehrm.com/');
    const page2Title = await page2.title();
    console.log("page2Title:", page2Title);
    await expect(page2).toHaveTitle('OrangeHRM: All in One HR Software for Businesses | OrangeHRM');

    const allPages = context.pages();
    console.log("All pages length:", allPages.length);

});

test.skip("Handle Multiple Page/window", async ({ browser }) => {

    const context = await browser.newContext();
    const page1 = await context.newPage();

    await page1.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const page1Title = await page1.title();
    console.log("page1Title:", page1Title);
    console.log("page1URL:", await page1.url());

    const pagePromise = context.waitForEvent('page');
    await page1.getByRole('link', {name: 'OrangeHRM, Inc'}).click();

    const newPage = await pagePromise;
    console.log("NewPage Title: ", await newPage.title());
    console.log("NewPage URL: ", await newPage.url());
    
   
});

test.only("Handle Multiple Page/window usinng promise.all", async ({ browser }) => {

    const context = await browser.newContext();
    const page1 = await context.newPage();

    await page1.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const page1Title = await page1.title();
    console.log("page1Title:", page1Title);
    console.log("page1URL:", await page1.url());

    const [newPage] = await Promise.all([context.waitForEvent('page'), await page1.getByRole('link', {name: 'OrangeHRM, Inc'}).click()]);

    // const pagePromise = context.waitForEvent('page');
    // await page1.getByRole('link', {name: 'OrangeHRM, Inc'}).click();

    // const newPage = await pagePromise;
    console.log("NewPage Title: ", await newPage.title());
    console.log("NewPage URL: ", await newPage.url());
    
   
});