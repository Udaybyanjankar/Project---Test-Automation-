class ProductDetail{
  constructor(page){
    this.page = page;
    this.quantity = page.locator('#quantity');
    this.AddtoCart = page.locator('button[type="button"]');
    this.ViewCart = page.getByText('View Cart');

    this.Name = page.locator('#name');
    this.EmailAdr = page.locator('#email');
    this.Review = page.locator('#review');
    this.SubmitBtn = page.locator('#button-review');
  }
  async setQuantity(Quantity){
    await this.quantity.fill(Quantity)
  }
  async clickAddtoCart(){
    await this.AddtoCart.click()
  }
  async clickViewCart(){
    await this.ViewCart.click()
  }
  async enterName(name){
    await this.Name.fill(name)
  }
  async enterEmailAdr(email){
    await this.EmailAdr.fill(email)
  }
  async enterReview(review){
    await this.Review.fill(review)
  }
  async clickSubmitBtn(){
    await this.SubmitBtn.click()
  }
}
module.exports = {ProductDetail}