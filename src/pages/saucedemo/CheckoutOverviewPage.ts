import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class CheckoutOverviewPage extends BasePage {
  private readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.finishButton = page.getByRole('button', { name: 'Finish' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.page.getByText('Checkout: Overview', { exact: true })).toBeVisible();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
