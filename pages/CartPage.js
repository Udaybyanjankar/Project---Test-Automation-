import { expect } from "@playwright/test";
class CartPage{
  constructor(page){
    this.page = page;
    this.Cartlink = page.locator('(//a[@href="/view_cart"])[1]');
    this.EmailAdr = page.locator('#susbscribe_email');
    this.EnterBtn = page.locator('#subscribe');

    this.proceedCheckout = page.getByText('Proceed To Checkout');
    this.registerLogin = page.locator('a:has-text("Register / Login")');

    this.delproduct1 = page.locator('a[data-product-id="1"]');
    this.delproduct2 = page.locator('a[data-product-id="2"]');

    this.emptycart = page.getByText('Cart is empty!');
  }
  async clickCartlink(){
    await this.Cartlink.click()
  }
    async enterEmailAdr(email){
    await this.EmailAdr.fill(email)
  }
  async clickEnterBtn(){
    await this.EnterBtn.click()
  }
  async proceedToCheckout() {
    await this.proceedCheckout.click()
  }
  async clickRegisterLogin() {
    await this.registerLogin.click()
  }
  async clickDelProduct1(){
    await this.delproduct1.click()
  }
  async clickDelProduct2(){
    await this.delproduct2.click()
  }
  async verifyEmptyCart(){
    await expect(this.emptycart).toBeVisible();
  }
}
module.exports = {CartPage}