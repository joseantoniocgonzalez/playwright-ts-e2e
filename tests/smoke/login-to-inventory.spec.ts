import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/saucedemo/LoginPage';
import { InventoryPage } from '../../src/pages/saucedemo/InventoryPage';

test('Login lands on inventory @smoke', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await test.step('Open login page', async () => {
    await loginPage.open();
  });

  await test.step('Login with demo user', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('Inventory is visible', async () => {
    await inventoryPage.expectLoaded();
  });
});
