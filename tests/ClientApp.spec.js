import { test, expect } from '@playwright/test';

test("Client App Login Test", async ({ page }) => {
    
    const email = 'playwrightdemo@gmail.com';
    const productName = 'ZARA COAT 3';
    const userEmail = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginBtn = page.locator('#login');
    const products = page.locator('.card-body');

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await userEmail.fill("playwrightdemo@gmail.com");
    await password.fill("Green@3792");
    await loginBtn.click();

    //await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();

    const productTitles = await products.locator('b').allTextContents();
    console.log("List of all products: ", productTitles)
    console.log("Count of products on dashboard page", await products.count());
    for(let i=0; i<await products.count(); i++){

        if(await products.nth(i).locator("b").textContent() === productName){
            //add to card
            await products.nth(i).locator('button:has-text("Add To Cart")').click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    await expect(bool).toBeTruthy();
    await page.locator("button:has-text('Checkout')").click();

    await page.locator(".field .txt").nth(1).fill("123");
    await page.locator(".field .txt").nth(2).fill("Playwright Automation");

    await page.locator("[placeholder='Select Country']").pressSequentially("ind", {delay: 100});
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for(let i=0; i<optionsCount; i++){
            let text = await dropdown.locator('button').nth(i).textContent();
            if(text.trim() === "India"){
                await dropdown.locator('button').nth(i).click();
                break;
            }

    }
    expect(page.locator(".user__name label[type='text']")).toHaveText("playwrightdemo@gmail.com");
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator('.action__submit').click();
    await expect(await page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log('orderId: ', orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor();

    const rows = page.locator("tbody tr");
    for(let i=0; i<await rows.count(); i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator(".btn.btn-primary").click();
            break;
        }
    }
    const orderDetails = await page.locator('.col-text').textContent();
    expect(orderId.includes(orderDetails)).toBeTruthy();
});
