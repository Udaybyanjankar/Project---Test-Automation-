const { expect } = require("@playwright/test");

class LoginPage {
   constructor(page){
    this.page = page;
    this.emailadr = page.locator('input[data-qa="login-email"]');
    this.password = page.locator('input[data-qa="login-password"]');
    this.loginBtn = page.locator('button[data-qa="login-button"]');
   //  this.deleteBtn = page.locator('a[href="/delete_account"]');
   //  this.AccountDeleted = page.getByText('Account Deleted!');

   this.Name = page.locator('input[data-qa="signup-name"]');
   this.SignupEmail = page.locator('input[data-qa="signup-email"]');
   this.SignupBtn = page.locator('button[data-qa="signup-button"]');                                                     

   }

    async enterEmail(email) {
       await this.emailadr.fill(email)
    }
    async enterPassword(password) {           
       await this.password.fill(password)
    }
    async clickLogin() {
       await this.loginBtn.click()
    }
   async userlogin(email, password) {
    await this.enterEmail(email)
    await this.enterPassword(password)
    await this.clickLogin()  
  }
//    async clickdeleteAcc(){
//     await this.deleteBtn.click()
//   }
//   async verifyAccountDeleted(){
//    await expect(this.AccountDeleted).toBeVisible();
//   }
   async enterName(Name){
      await this.Name.fill(Name)
   }
   async enterSignupEmail(SignupEmail){
      await this.SignupEmail.fill(SignupEmail)
   }
   async clickSignupBtn(){
      await this.SignupBtn.click()
   }
}

module.exports = {LoginPage}