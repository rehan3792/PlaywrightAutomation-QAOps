import { test, expect } from '@playwright/test';

test("Handle Simple Alert JS dialog", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.on('dialog', dialog => {
        console.log('Type of Alert:', dialog.type());
        console.log('Type of Message:', dialog.message());
        dialog.accept();
        //dialog.dismiss();
    })
    await page.locator('#alertBtn').click();
    await page.waitForTimeout(3000);
});

test("Handle Confirm JS dialog", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.on('dialog', dialog => {
        console.log('Type of Alert:', dialog.type());
        console.log('Type of Message:', dialog.message());
        dialog.dismiss();
    });
    await page.locator('#confirmBtn').click();
    await page.waitForTimeout(3000);
});

test("Handle Prompt JS dialog", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.on('dialog', dialog => {
        console.log('Type of Alert:', dialog.type());
        console.log('Type of Message:', dialog.message());
        console.log('Type of Message:', dialog.defaultValue());
        dialog.accept("Rehan Akhter");
    });
    // const dialogPromise = page.waitForEvent('dialog');

    // await page.locator('#promptBtn').click();

    // const dialog = await dialogPromise;

    // console.log('Type of Alert:', dialog.type());
    // console.log('Type of Message:', dialog.message());
    // console.log('Type of Message:', dialog.defaultValue());
    
    // await page.waitForTimeout(3000);
    // dialog.accept("Rehan Akhter");
    // await page.waitForTimeout(3000);
});