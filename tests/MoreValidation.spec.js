import { test, expect } from '@playwright/test';

test("More UI Validations", async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://www.google.com/')
    // await page.goBack();
    // await page.goForward();
    // await page.reload();
    await page
    await expect(await page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(await page.locator('#displayed-text')).toBeHidden();
    await page.locator('#show-textbox').click();
    await expect(await page.locator('#displayed-text')).toBeVisible();
    await page.waitForTimeout(5000);
    // Handle JavaScript Pop-up/alert/prompt/dialog
    page.on('dialog', dialog => {
        console.log(dialog.type());
        console.log(dialog.message());
        dialog.accept();
        //dialog.dismiss();
    });

    await page.locator("#confirmbtn").click();

    // Handle Mouse Hover
    await page.locator("#mousehover").hover();

    //Handle Child Frames (identified by iFrame/fremeSet tag in DOM)

    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator('li a[href="lifetime-access"]:visible').click();
    const textCheck = await page.locator('.text h2').textContent();
    console.log(textCheck.split(" ")[1]);

});