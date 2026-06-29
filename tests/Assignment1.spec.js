import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const USER_EMAIL = 'playwrightdemo@gmail.com';
const PASSWORD = 'Green@3792';

async function login(page) {

    await page.goto(BASE_URL + '/login');
    await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
    await page.getByLabel('Password').fill(PASSWORD);
    await page.locator('#login-btn').click();
    await page.waitForTimeout(30*1000);
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test("Create a brand new event from the admin panel", async ({ page }) => {

    await login(page);
    await page.goto(BASE_URL + '/admin/events');
    const eventTitle = `Test Event ${Date.now()}`;
    await page.locator('event-title-input').fill(eventTitle);
    await page.locator('using #admin-event-form textarea').fill("PLaywright Test Event description");
    await page.locator('#category').selectOption('Workshop');
    await page.getByLabel('City').fill("Tanda");
    await page.locator('#venue').fill('Daymi Comunity Centere');
    await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');
    await page.getByLabel('Price ($)').fill("200");
    await page.getByLabel('Total Seats').fill("50");
    await page.getByRole("button", { name: "Submit" }).click;
    // Wait for success toast
    await expect(page.getByText('Event created!')).toBeVisible();
    console.log(`Created event: "${eventTitle}"`);
    await page.pause();
});