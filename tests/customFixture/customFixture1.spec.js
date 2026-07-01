import { test } from '../../fixtures/loginFixture.js';

test("Verify PIM is clicked", async({ loggedinPage }) => {

    await loggedinPage.getByText('PIM').click();

});