import { expect } from "@playwright/test";
class AccountCreatedPage{
  constructor(page){
    this.page = page;
    this.AccountCreated = page.getByText('Account Created!');
    this.continueBtn = page.getByText('Continue');
  }

  async verifyAccountCreated() {
    await expect(this.AccountCreated).toBeVisible();
  }

  async clickContinue() {
    await this.continueBtn.click();
  }
}

module.exports = { AccountCreatedPage }
