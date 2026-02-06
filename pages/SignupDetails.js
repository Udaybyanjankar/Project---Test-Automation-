class SignupDetails{
  constructor(page){
    this.page = page;
    this.titleMr = page.locator('#id_gender1');
    this.password = page.locator('#password');

    this.days = page.locator('#days');
    this.months = page.locator('#months');
    this.years = page.locator('#years');

    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.company = page.locator('#company');
    this.address1 = page.locator('#address1');
    this.country = page.locator('#country');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.zipcode = page.locator('#zipcode');
    this.mobileNumber = page.locator('#mobile_number');

    this.createAccountBtn = page.getByText('Create Account');
  }

  async fillAccountDetails(details) {
    await this.titleMr.check()
    await this.password.fill(details.password)

    await this.days.selectOption(details.day)
    await this.months.selectOption(details.month)
    await this.years.selectOption(details.year)

    await this.firstName.fill(details.firstName)
    await this.lastName.fill(details.lastName)
    await this.company.fill(details.company)
    await this.address1.fill(details.address)
    await this.country.selectOption(details.country)
    await this.state.fill(details.state)
    await this.city.fill(details.city)
    await this.zipcode.fill(details.zip)
    await this.mobileNumber.fill(details.mobile)

    await this.createAccountBtn.click()
  }
}

module.exports = { SignupDetails }
