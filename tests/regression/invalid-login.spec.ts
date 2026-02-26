import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/saucedemo/LoginPage';

test('Invalid login shows an error @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('Open login page', async () => {
    await loginPage.open();
  });

  await test.step('Submit invalid credentials', async () => {
    await loginPage.login('wrong_user', 'wrong_pass');
  });

  await test.step('Error is shown', async () => {
    await loginPage.expectLoginErrorContains('Username and password');
  });
});
