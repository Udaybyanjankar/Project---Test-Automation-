import { expect } from "@playwright/test";
class ContactPage{
  constructor(page){
    this.page = page;
    this.ContactUs = page.locator('a[href="/contact_us"]');
    this.GetInTouch = page.getByText('Get In Touch');
    this.Name = page.locator('input[placeholder="Name"]');
    this.Email = page.locator('input[placeholder="Email"]');
    this.Subject = page.locator('input[placeholder="Subject"]');
    this.Message = page.locator('textarea[data-qa="message"]');
    this.Submit = page.locator('input[type="submit"]');
    this.SuccessMessage = page.locator('(//div[@style="display: block;"])[1]');
  }
  async clickContactUs(){
    await this.ContactUs.click();
  }
  async verifyGetInTouch(){
    await expect(this.GetInTouch).toBeVisible();
  }
  async enterName(name){
    await this.Name.fill(name)
  }
  async enterEmail(email){
    await this.Email.fill(email)
  }
  async enterSubject(subject){
    await this.Subject.fill(subject)
  }
  async enterMessage(message){
    await this.Message.fill(message)
  }
  async submitFormAndAcceptAlert() {
    // Handle browser alert OK
    this.page.once('dialog', async dialog => {
      console.log('Alert message:', dialog.message());
      await dialog.accept(); // clicks OK
    });

    await this.Submit.click();
  }
  // async clickSubmit(){
  //   await this.Submit.click();
  // }
  async verifySuccessMessage(){
    await expect(this.SuccessMessage).toBeVisible();
  }
}
module.exports = {ContactPage}