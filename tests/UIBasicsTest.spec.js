import { test, expect } from '@playwright/test';

test("Browser Context Playwright Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // How to get title on browser tab - page.title()
    console.log(await page.title());
    await expect.soft(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await userName.fill("rahulshettyTestFail");
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();
    // How to extract text from browser - page.locator().textContent()
    console.log(await page.locator("[style*='block']").textContent());
    // How to validate test is present on brower - expect().toContainText("expectedText")
    await expect(await page.locator("[style*='block']")).toContainText('Incorrect username/password.');

    //Remove filled data from input field
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();
    console.log(await page.locator(".card-body .card-title").first().textContent());

    console.log(await page.locator(".card-body .card-title").allTextContents());

});

test("UI Controls", async ({ page }) => {

    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const dropdown = await page.locator('select.form-control');
    const radioBtnUser = await page.locator('.customradio').last();
    const okConfirmBtn = await page.locator('#okayBtn');
    const checkBox = await page.locator('#terms');
    const documentLink = await page.locator("a[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await userName.fill('rahulshettyacademy');
    console.log("Input Value for username field:", await userName.inputValue());
    console.log("Inner Text:", await userName.innerText());
    console.log("Text Content:", await userName.textContent());

    await userName.clear();
    await password.fill('Learning@830$3mK2');
    await dropdown.selectOption('Consultant');
    console.log("selected Value for dropdown field:", await dropdown.inputValue());
    await radioBtnUser.click();
    await okConfirmBtn.click();

    //Assertion - User radio button is selected
    console.log("User radio button is selected: ", await radioBtnUser.isChecked());
    await expect(radioBtnUser).toBeChecked();
    await checkBox.check();
    await expect(checkBox).toBeChecked();
    console.log("Check box selected1: ", await checkBox.isChecked());

    await checkBox.uncheck();
    await expect(checkBox).not.toBeChecked();
    console.log("Check box selected2: ", await checkBox.isChecked());
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

});

test("Child Window handle", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const documentLink = await page.locator("a[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    const [newPage] = await Promise.all(
        [context.waitForEvent('page'), // listen for new page - pending/reject/fulfill
        await documentLink.click()]); // New page will open

    const text = await newPage.locator('.red').textContent();
    console.log(text);
    const arratText = text.split('@');
    const domain = arratText[1].split(' ')[0];
    await userName.fill(domain);
    console.log("userName is:",await userName.inputValue());
});