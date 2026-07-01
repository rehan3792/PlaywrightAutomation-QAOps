import { test } from '../../fixtures/loginFixture.js';

test("Verify Time is cliked", async({ loggedinPage }) => {

    await loggedinPage.getByRole('link', { name: 'Time' }).click();
    console.log(await loggedinPage.url());
    await loggedinPage.waitForTimeout(3000);

});