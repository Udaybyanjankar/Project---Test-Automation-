const { expect } = require("@playwright/test");

class CheckoutPage{
  constructor(page){
    this.page = page;
    this.AddressDetails = page.locator('.heading', { hasText: 'Address Details' });
    this.OrderReview = page.locator('.heading', { hasText: 'Review Your Order' });
    this.commentBox = page.locator('textarea[name="message"]');
    this.placeOrderBtn = page.getByText('Place Order');

    this.DeliveryAddress = page.locator('#address_delivery');
    this.BillingAddress = page.locator('#address_invoice');
    
    this.SuccessMsg = page.getByText('Congratulations! Your order has been confirmed!');
    this.DownloadInvoice = page.getByText('Download Invoice');
    this.ContinueBtn = page.locator('a[data-qa="continue-button"]');
  }

  async verifyAddressdetials(){
    await this.AddressDetails.isVisible()
  }
  async verifyOrderreview(){
    await this.OrderReview.isVisible()
  }
  async fillMessage(message){
    await this.commentBox.fill(message)
  }
  async clickPlaceOrderBtn(){
    await this.placeOrderBtn.click()
  }
  async verifySuccessMsg(){
    await expect(this.SuccessMsg).toBeVisible()
  }
  async clickDownloadInvoice(){
    await this.DownloadInvoice.click()
  }
  async clickContinueBtn(){
    await this.ContinueBtn.click()
  }
}

module.exports = { CheckoutPage }
