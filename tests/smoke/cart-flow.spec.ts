import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/saucedemo/LoginPage';
import { InventoryPage } from '../../src/pages/saucedemo/InventoryPage';
import { CartPage } from '../../src/pages/saucedemo/CartPage';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const ITEM = 'Sauce Labs Backpack';

test('Add item to cart works @smoke', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await test.step('Login and land on inventory', async () => {
    await loginPage.open();
    await loginPage.login(USERNAME, PASSWORD);
    await inventoryPage.expectLoaded();
  });

  await test.step('Add item and verify it in cart', async () => {
    await inventoryPage.addItemToCart(ITEM);
    await inventoryPage.goToCart();
    await cartPage.expectLoaded();
    await cartPage.expectItemInCart(ITEM);
  });
});
