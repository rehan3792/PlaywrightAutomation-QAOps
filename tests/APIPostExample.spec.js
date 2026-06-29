import { test, expect } from '@playwright/test';

test.describe('Sample API POST automation', () => {
  test('should create a new resource using POST', async ({ request }) => {
    const requestBody = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};

    const response = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
      data: requestBody,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.token).toBeTruthy();
    expect(responseBody.userId).toBeTruthy();

    const token = responseBody.token;
    console.log("Token: ", token);
    console.log('POST response body:', responseBody);
  });
});
