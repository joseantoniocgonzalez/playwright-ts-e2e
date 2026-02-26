import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/saucedemo/LoginPage';

test('Locked out user cannot login @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('Open login page', async () => {
    await loginPage.open();
  });

  await test.step('Attempt login with locked out user', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
  });

  await test.step('Locked out error is shown', async () => {
    await loginPage.expectLoginErrorContains('locked out');
  });
});
