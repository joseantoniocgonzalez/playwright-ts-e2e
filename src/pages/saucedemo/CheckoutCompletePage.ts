import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class CheckoutCompletePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(
      this.page.getByRole('heading', { name: 'Thank you for your order!' }),
    ).toBeVisible();
  }
}
