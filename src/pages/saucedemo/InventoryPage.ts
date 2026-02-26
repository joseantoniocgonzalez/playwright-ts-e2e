import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class InventoryPage extends BasePage {
  private readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    // SauceDemo uses this stable class for the cart icon
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.getByText('Products', { exact: true })).toBeVisible();
  }

  private itemCard(itemName: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: itemName });
  }

  async addItemToCart(itemName: string): Promise<void> {
    const card = this.itemCard(itemName);
    await expect(card).toBeVisible();

    const addButton = card.getByRole('button', { name: 'Add to cart' });
    await addButton.click();

    const removeButton = card.getByRole('button', { name: 'Remove' });
    await expect(removeButton).toBeVisible();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
