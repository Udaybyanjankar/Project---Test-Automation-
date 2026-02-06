import { expect } from "@playwright/test";
class ProductPage {
   constructor(page){
    this.page = page;
    this.productlink = page.locator("a[href='/products']");
    this.firstViewProduct = page.locator('a[href="/product_details/1"]');
    this.brands = page.getByText('BRANDS');
    this.productheader = page.getByText('ALL PRODUCTS');

    this.searchproduct = page.locator('//*[@placeholder="Search Product"]');
    this.searchbtn = page.locator("button[type='button']");

    this.hoverfirstproduct = page.locator('(//div[@class="single-products"])[1]');
    this.addtocart1 = page.locator('(//a[@data-product-id="1"])[1]');
    this.continueshopping = page.getByText('Continue Shopping');
    this.hoversecondproduct = page.locator('(//div[@class="single-products"])[2]');
    this.addtocart2 = page.locator('(//a[@data-product-id="2"])[1]');
    this.viewcart = page.locator('(//a[@href="/view_cart"])[2]');
    this.verifyproduct1 = page.locator('#product-1');
    this.verifyproduct2 = page.locator('#product-2');

    this.Polo = page.locator('a[href="/brand_products/Polo"]');
    this.Biba = page.locator('a[href="/brand_products/Biba"]');

    this.addtocart33 = page.locator('(//a[@data-product-id="33"])[1]');
    this.addtocart35 = page.locator('(//a[@data-product-id="35"])[1]');
    this.addtocart37 = page.locator('(//a[@data-product-id="37"])[1]');
   }
//Test Case 8
   async clickproduct(){
    await this.productlink.click();
   }
    async verifyproductheader(){
      await expect(this.productheader).toBeVisible();
   }
   async clickfirstViewProduct(){
    await this.firstViewProduct.click();
   }
   async verifybrands(){
      await expect(this.brands).toBeVisible();
   }
//Test Case 9
   async entersearchproduct(productname){
      await this.searchproduct.fill(productname);
   }
   async clicksearchbtn(){
      await this.searchbtn.click();
   }
//Test Case 12
  async firstproduct() {
    await this.hoverfirstproduct.hover();
  }
  async clickaddtocart1() {
    await this.addtocart1.click();
  }
  async clickcontinueshopping() {
    await this.continueshopping.click();
  }
  async secondproduct(){
   await this.hoversecondproduct.hover();
  }
  async clickaddtocart2(){
   await this.addtocart2.click();
  }
  async clickviewcartbtn(){
   await this.viewcart.click();
  }
  async Verifyproduct1(){
   await expect(this.verifyproduct1).toBeVisible();
  }
  async Verifyproduct2(){
   await expect(this.verifyproduct2).toBeVisible();
  }

  async clickPolo(){
   await this.Polo.click()
  }
  async clickBiba(){
   await this.Biba.click()
  }
  async clickaddtocart33(){
    await this.addtocart33.click()
  }
  async clickaddtocart35(){
    await this.addtocart35.click()
  }
  async clickaddtocart37(){
    await this.addtocart37.click()
  }
}
module.exports = {ProductPage}