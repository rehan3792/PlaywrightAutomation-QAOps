import {test, expect} from '@playwright/test';

test("Calender UI controls", async({ page })=>{

    const monthNumber = "6";
    const day = "15";
    const year = "2027";
    const expectedList = [monthNumber, day, year];

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(year).click();
    console.log("Selected Year:", await page.locator('.react-calendar__navigation__label').textContent());
    await page.locator('.react-calendar__year-view__months__month').nth(monthNumber-1).click();
    await page.locator("button:has-text('15')").click();
    const input = await page.locator('.react-date-picker__inputGroup__input');
    for(let i=0; i<expectedList.length; i++){

        const value = await input.nth(i).inputValue();
        await expect(value).toEqual(expectedList[i]);
    }
    
});