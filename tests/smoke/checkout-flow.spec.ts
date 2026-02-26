import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/saucedemo/LoginPage';
import { InventoryPage } from '../../src/pages/saucedemo/InventoryPage';
import { CartPage } from '../../src/pages/saucedemo/CartPage';
import { CheckoutInformationPage } from '../../src/pages/saucedemo/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../../src/pages/saucedemo/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../../src/pages/saucedemo/CheckoutCompletePage';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const ITEM = 'Sauce Labs Backpack';

test('Checkout works end-to-end @smoke', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const infoPage = new CheckoutInformationPage(page);
  const overviewPage = new CheckoutOverviewPage(page);
  const completePage = new CheckoutCompletePage(page);

  await test.step('Login and add item', async () => {
    await loginPage.open();
    await loginPage.login(USERNAME, PASSWORD);
    await inventoryPage.expectLoaded();
    await inventoryPage.addItemToCart(ITEM);
    await inventoryPage.goToCart();
    await cartPage.expectLoaded();
    await cartPage.expectItemInCart(ITEM);
  });

  await test.step('Checkout flow', async () => {
    await cartPage.checkout();

    await infoPage.expectLoaded();
    await infoPage.fill('Test', 'User', '12345');
    await infoPage.continue();

    await overviewPage.expectLoaded();
    await overviewPage.finish();
  });

  await test.step('Confirmation', async () => {
    await completePage.expectLoaded();
  });
});
