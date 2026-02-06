class PaymentPage {
  constructor(page){
    this.page = page;
    this.nameOnCard = page.locator('input[name="name_on_card"]');
    this.cardNumber = page.locator('input[name="card_number"]');
    this.cvc = page.locator('input[name="cvc"]');
    this.expMonth = page.locator('input[name="expiry_month"]');
    this.expYear = page.locator('input[name="expiry_year"]');
    this.payBtn = page.getByText('Pay and Confirm Order');
  }

  async pay(details){
    await this.nameOnCard.fill(details.name);
    await this.cardNumber.fill(details.number);
    await this.cvc.fill(details.cvc);
    await this.expMonth.fill(details.month);
    await this.expYear.fill(details.year);
    await this.payBtn.click();
  }
}
module.exports = { PaymentPage }
