class HomePage{
  constructor(page){
    this.page = page;
    this.EmailAdr = page.locator('#susbscribe_email');
    this.EnterBtn = page.locator('#subscribe');
    // this.SuccessMsg = page.getByText('You have been successfully subscribed!');

    this.Women = page.locator('(//a[@data-toggle="collapse"])[1]');
    this.Dress = page.locator('a[href="/category_products/1"]');
    this.Men = page.locator('(//a[@data-toggle="collapse"])[2]');
    this.Tshirt = page.locator('a[href="/category_products/3"]');

    this.addtocartglass = page.locator('(//a[@data-product-id="2"])[3]');

    this.footer = page.locator('#footer');
    this.ScrollUp = page.locator('#scrollUp');
  }
  async enterEmailAdr(email){
    await this.EmailAdr.fill(email)
  }
  async clickEnterBtn(){
    await this.EnterBtn.click()
  }
  // async verifySuccessMsg(){
  //   await this.SuccessMsg();
  // }
  async clickWomen(){
    await this.Women.click()
  }
  async clickDress(){
    await this.Dress.click()
  }
  async clickMen(){
    await this.Men.click()
  }
  async clickTshirt(){
    await this.Tshirt.click();
  }
  async clickaddtocartglass(){
    await this.addtocartglass.click()
  }
  async scrollToFooter(){
    await this.footer.scrollIntoViewIfNeeded();
  }
  async clickScrollUp(){
    await this.ScrollUp.click()
  }
}
module.exports = {HomePage}