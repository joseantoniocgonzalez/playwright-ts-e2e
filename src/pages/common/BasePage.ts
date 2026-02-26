import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async expectUrlContains(partialUrl: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(partialUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}
