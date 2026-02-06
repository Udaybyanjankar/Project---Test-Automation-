import test, { chromium, expect, selectors } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage.js';
import { ContactPage } from "../pages/ContactPage.js";
import { ProductPage } from "../pages/ProductPage.js";
import { HomePage } from "../pages/HomePage.js";
import { CartPage } from "../pages/CartPage.js";
import { ProductDetail } from "../pages/ProductDetail.js";
import { SignupPage } from "../pages/SignupPage.js";
import { SignupDetails } from "../pages/SignupDetails.js";
import { AccountCreatedPage } from "../pages/AccountCreatedPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";
import { PaymentPage } from "../pages/PaymentPage.js";
import path from "path";

test.describe('Automation Exercise', () => {
  let browser, context, page;
  let loginPage;
  let contactpage;
  let productpage;
  let homepage;
  let cartpage;
  let productdetail;
  let signuppage;
  let signupdetails;
  let accountcreatedpage;
  let checkoutpage;
  let paymentpage;

  test.beforeEach('',async() => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    contactpage = new ContactPage(page);
    productpage = new ProductPage(page);
    homepage = new HomePage(page);
    cartpage = new CartPage(page);
    productdetail = new ProductDetail(page);
    signuppage = new SignupPage(page);
    signupdetails = new SignupDetails(page);
    accountcreatedpage = new AccountCreatedPage(page);
    checkoutpage = new CheckoutPage(page);
    paymentpage = new PaymentPage(page);

    await page.goto('https://automationexercise.com/');
  });
                                                  //Test case 2
  test('login user with correct email and password', async() => {

    await page.locator('a[href="/login"]').click();
    let email = process.env.USEREMAIL;
    let password = process.env.PASSWORD;
    console.log(email);
    console.log(password);
    await loginPage.userlogin(email, password);

     const loginText = await page.locator('a:has-text("Logged in as")').textContent();
     console.log(loginText);
     expect(loginText).toEqual(' Logged in as Uday');

      // await loginPage.clickdeleteAcc();
      // await loginPage.verifyAccountDeleted();
  });
                                                    //Test case 3
  test('login user with incorrect email and password', async() => {
   
      await page.locator('a[href="/login"]').click();
      let email = process.env.USEREMAIL1;
      let password = process.env.PASSWORD1;
      console.log(email);
      console.log(password);
      await loginPage.userlogin(email, password);

      const errormsg = await page.locator('p[style="color: red;"]').textContent();
      console.log(errormsg);
      expect(errormsg).toEqual('Your email or password is incorrect!'); 
  });
                                                     //Test case 4
  test('logout user', async() => {

    await page.locator('a[href="/login"]').click();
    let email = process.env.USEREMAIL;
    let password = process.env.PASSWORD;
    console.log(email);
    console.log(password);
    await loginPage.userlogin(email, password);

    await page.locator('a[href="/logout"]').click();
  
    const postlogout1 = await page.locator('.login-form').textContent();
    console.log(postlogout1);
    expect(postlogout1).toContain('Login to your account')

    const postlogout2 = await page.locator('.signup-form').textContent();
    console.log(postlogout2);
    expect(postlogout2).toContain('New User Signup!')
  });
                                                       //Test Case 5
  test('Register User with existing email',async() =>{
    await page.locator('a[href="/login"]').click();

    const NewUser = await page.getByText('New User Signup!').textContent();
    expect(NewUser).toContain('New User Signup!');

    await loginPage.enterName('Ram');
    await loginPage.enterSignupEmail('hari1001@gmail.com');
    await loginPage.clickSignupBtn();

    const errorMsg = await page.getByText('Email Address already exist!').textContent();
    expect(errorMsg).toContain('Email Address already exist!')
  });
                                                       //Test case 6
  test('Contact Us Form',async() =>{
    await contactpage.clickContactUs();
    await contactpage.verifyGetInTouch();
    
    let name = process.env.Name;
    console.log(name);
    await contactpage.enterName(name);

    let email = process.env.Email;
    console.log(email);
    await contactpage.enterEmail(email);

    let subject = process.env.Subject;
    console.log(subject);
    await contactpage.enterSubject(subject);

    let message = process.env.Message;
    console.log(message);
    await contactpage.enterMessage(message);

    const filePath = path.resolve(__dirname, '../image/picture.png');
    await page.locator('input[type="file"]').setInputFiles(filePath);

    //await contactpage.clickSubmit();
    await contactpage.submitFormAndAcceptAlert();
    await contactpage.verifySuccessMessage();
  });
                                                        //Test Case 7
  test('Verify Test Cases Page',async() =>{
    await page.locator('(//a[@href="/test_cases"])[1]').click();
  })         
                                                       //Test Case 8         
  test('Verify All Products and product detail page', async() => { 
       await productpage.clickproduct();
       await productpage.verifyproductheader();
       await productpage.clickfirstViewProduct();
       await productpage.verifybrands();
       
  });
                                                      //Test Case 9
  test('Search Product', async() => { 
      await productpage.clickproduct();
      await productpage.entersearchproduct('Men Tshirt');
      await productpage.clicksearchbtn();
  });
                                                      //Test Case 10
  test('Verify Subscription in home page',async() =>{
      const footer = page.locator('#footer');
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();

      await expect(page.getByText('Subscription')).toBeVisible();
      await homepage.enterEmailAdr('uday12@gmail.com');
      await homepage.clickEnterBtn();

      const SuccessMsg = await page.locator('.alert-success.alert');
      console.log(SuccessMsg);
      expect(SuccessMsg).toHaveText('You have been successfully subscribed!');
      // await homepage.verifySuccessMsg();
  });            
                                                      //Test Case 11
  test('Verify Subscription in Cart page',async() => {
    await cartpage.clickCartlink();

    const footer = page.locator('#footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    await cartpage.enterEmailAdr('uday12@gmail.com');
    await cartpage.clickEnterBtn();

    const SuccessMsg = await page.locator('.alert-success.alert');
    console.log(SuccessMsg);
    expect(SuccessMsg).toHaveText('You have been successfully subscribed!');
  });                                       
                                                      //Test Case 12
  test('All products in cart', async() => { 
       await productpage.clickproduct();
       await productpage.firstproduct();
       await productpage.clickaddtocart1();
       await productpage.clickcontinueshopping();
       await productpage.secondproduct();
       await productpage.clickaddtocart2();
       await productpage.clickviewcartbtn();
       await productpage.Verifyproduct1();
       await productpage.Verifyproduct2();
       await expect(page.locator('//a[@href="/product_details/1"]')).toHaveText('Blue Top');
       await expect(page.locator('//a[@href="/product_details/2"]')).toHaveText('Men Tshirt');
  });        
                                                       //Test Case 13
  test('Verify Product quantity in Cart',async() =>{
    await productpage.clickfirstViewProduct();
    await productdetail.setQuantity('4');
    await productdetail.clickAddtoCart();
    await productdetail.clickViewCart();
    
    const quantity = page.locator('.cart_quantity .disabled');
    await expect(quantity).toHaveText('4');
  });                
                                                       //Test Case 14
  test('Place Order: Register while Checkout',async() =>{
       await productpage.clickaddtocart1();
       await productpage.clickcontinueshopping();
       await productpage.secondproduct();
       await productpage.clickaddtocart2();
       await productpage.clickcontinueshopping();
       await cartpage.clickCartlink();
       await cartpage.proceedToCheckout();
       await cartpage.clickRegisterLogin();

       await signuppage.signup('Hari', 'hzwzxzqzazaqrix123123@gmail.com');
       await signupdetails.fillAccountDetails({
                           password: 'Test@123',
                           day: '10',
                           month: '5',
                           year: '1998',
                           firstName: 'Hari',
                           lastName: 'Ram',
                           company: 'XYZ',
                           address: 'Kathmandu',
                           country: 'Canada',
                           state: 'Bagmati',
                           city: 'Kathmandu',
                           zip: '12345',
                           mobile: '1234567890'
  });
     await accountcreatedpage.verifyAccountCreated();
     await accountcreatedpage.clickContinue();

     const loginText = await page.locator('a:has-text("Logged in as")').textContent();
     console.log(loginText);
     expect(loginText).toEqual(' Logged in as Hari');

     await cartpage.clickCartlink();
     await cartpage.proceedToCheckout();

     await checkoutpage.verifyAddressdetials();
     await checkoutpage.verifyOrderreview();
     await checkoutpage.fillMessage('Deliver as soon as possible');
     await checkoutpage.clickPlaceOrderBtn();

     await paymentpage.pay({
       name: 'Hari',
       number: '4111111111111111',
       cvc: '123',
       month: '12',
       year: '2028'
     });

    // const SuccessMsg = await page.locator('.alert-success.alert').textContent();
    // console.log(SuccessMsg);
    // expect(SuccessMsg).toContain('Your order has been placed successfully!');

       // await loginPage.clickdeleteAcc();
      // await loginPage.verifyAccountDeleted();
  });      
                                                       //Test Case 15      
  test('Place Order: Register before Checkout',async() =>{
    await page.locator('a[href="/login"]').click();
    await signuppage.signup('Ram', 'haqdxzzwqazaqrix123123@gmail.com');
       await signupdetails.fillAccountDetails({
                           password: 'Test@123',
                           day: '15',
                           month: '8',
                           year: '1978',
                           firstName: 'Ram',
                           lastName: 'Kumar',
                           company: 'ABC',
                           address: 'Kathmandu',
                           country: 'Canada',
                           state: 'Bagmati',
                           city: 'Kathmandu',
                           zip: '12345',
                           mobile: '1234567890'
  });
     await accountcreatedpage.verifyAccountCreated();
     await accountcreatedpage.clickContinue();

     const loginText = await page.locator('a:has-text("Logged in as")').textContent();
     console.log(loginText);
     expect(loginText).toEqual(' Logged in as Ram');

     await productpage.clickaddtocart1();
     await productpage.clickcontinueshopping();
     await productpage.secondproduct();
     await productpage.clickaddtocart2();
     await productpage.clickcontinueshopping();
     await cartpage.clickCartlink();
     await cartpage.proceedToCheckout();
     await checkoutpage.verifyAddressdetials();
     await checkoutpage.verifyOrderreview();
     await checkoutpage.fillMessage('Deliver as soon as possible');
     await checkoutpage.clickPlaceOrderBtn();

     await paymentpage.pay({
       name: 'Hari',
       number: '4111111111111111',
       cvc: '123',
       month: '12',
       year: '2028'
     });
         // const SuccessMsg = await page.locator('.alert-success.alert').textContent();
    // console.log(SuccessMsg);
    // expect(SuccessMsg).toContain('Your order has been placed successfully!');

       // await loginPage.clickdeleteAcc();
      // await loginPage.verifyAccountDeleted();
  });           
                                                      //Test Case 16
  test('Place Order: Login before Checkout',async() =>{
    await page.locator('a[href="/login"]').click();
    let email = process.env.USEREMAIL;
    let password = process.env.PASSWORD;
    console.log(email);
    console.log(password);
    await loginPage.userlogin(email, password);

    const loginText = await page.locator('a:has-text("Logged in as")').textContent();
    console.log(loginText);
    expect(loginText).toEqual(' Logged in as Uday');
     await productpage.clickaddtocart1();
     await productpage.clickcontinueshopping();
     await productpage.secondproduct();
     await productpage.clickaddtocart2();
     await productpage.clickcontinueshopping();
     await cartpage.clickCartlink();
     await cartpage.proceedToCheckout();
     await checkoutpage.verifyAddressdetials();
     await checkoutpage.verifyOrderreview();
     await checkoutpage.fillMessage('Deliver as soon as possible');
     await checkoutpage.clickPlaceOrderBtn();

     await paymentpage.pay({
       name: 'Hari',
       number: '4111111111111111',
       cvc: '123',
       month: '12',
       year: '2028'
     });
         // const SuccessMsg = await page.locator('.alert-success.alert').textContent();
    // console.log(SuccessMsg);
    // expect(SuccessMsg).toContain('Your order has been placed successfully!');

       // await loginPage.clickdeleteAcc();
      // await loginPage.verifyAccountDeleted();
  });                  
                                                 //Test Case 17
  test('Remove Products From Cart',async() =>{
     await productpage.clickaddtocart1();
     await productpage.clickcontinueshopping();
     await productpage.clickaddtocart2();
     await productpage.clickcontinueshopping();
     await cartpage.clickCartlink();
     await cartpage.clickDelProduct1();
     await cartpage.clickDelProduct2();
     await cartpage.verifyEmptyCart();
  });
                                                 //Test Case 18    
  test('View Category Products',async() =>{
    const title = await page.getByText('Category').textContent();
    console.log(title);
    expect(title).toContain('Category');

    await homepage.clickWomen();
    await homepage.clickDress();

    const Message = await page.getByText('Women - Dress Products').textContent();
    console.log(Message);
    expect(Message).toContain('Women - Dress Products');

    await homepage.clickMen();
    await homepage.clickTshirt();

    const MenMessage = await page.getByText('Men - Tshirts Products').textContent();
    console.log(MenMessage);
    expect(MenMessage).toContain('Men - Tshirts Products');
  });     
                                                 //Test Case 19
  test('View & Cart Brand Products',async() =>{
    await productpage.clickproduct();

    const title = await page.getByText('Brands').textContent();
    console.log(title);
    expect(title).toContain('Brands');
    
    await productpage.clickPolo();

    const BrandTitle = await page.getByText('Brand - Polo Products').textContent();
    console.log(BrandTitle);
    expect(BrandTitle).toContain('Brand - Polo Products');

    const product1 = await page.locator('(//div[@class="product-image-wrapper"])[1]');
    await product1.hover();
    expect(product1).toBeVisible();

    const product2 = await page.locator('(//div[@class="product-image-wrapper"])[2]');
    await product2.hover();
    expect(product2).toBeVisible();

    await productpage.clickBiba();

    const BibaTitle = await page.getByText('Brand - Biba Products').textContent();
    console.log(BibaTitle);
    expect(BibaTitle).toContain('Brand - Biba Products');

    const product3 = await page.locator('(//div[@class="product-image-wrapper"])[1]');
    await product3.hover();
    expect(product3).toBeVisible();

    const product4 = await page.locator('(//div[@class="product-image-wrapper"])[2]');
    await product4.hover();
    expect(product4).toBeVisible();
  });
                                                //Test Case 20
  test('Search Products and Verify Cart After Login',async() =>{
    await productpage.clickproduct();
    await productpage.entersearchproduct('Jeans');
    await productpage.clicksearchbtn();

    const product1 = await page.locator('(//div[@class="product-image-wrapper"])[1]');
    await product1.hover();
    expect(product1).toBeVisible();
    
    const product2 = await page.locator('(//div[@class="product-image-wrapper"])[2]');
    await product2.hover();
    expect(product2).toBeVisible();

    const product3 = await page.locator('(//div[@class="product-image-wrapper"])[3]');
    await product3.hover();
    expect(product3).toBeVisible();

    await productpage.clickaddtocart33();
    await productpage.clickcontinueshopping();
    await productpage.clickaddtocart35();
    await productpage.clickcontinueshopping();
    await productpage.clickaddtocart37();
    await productpage.clickcontinueshopping();
    await cartpage.clickCartlink();
    await expect(page.locator('//a[@href="/product_details/33"]')).toHaveText('Soft Stretch Jeans');
    await expect(page.locator('//a[@href="/product_details/35"]')).toHaveText('Regular Fit Straight Jeans');
    await expect(page.locator('//a[@href="/product_details/37"]')).toHaveText('Grunt Blue Slim Fit Jeans');
    await page.locator('(//a[@href="/login"])[1]').click();
    let email = process.env.USEREMAIL;
    let password = process.env.PASSWORD;
    console.log(email);
    console.log(password);
    await loginPage.userlogin(email, password);
    await cartpage.clickCartlink();
    await expect(page.locator('//a[@href="/product_details/33"]')).toHaveText('Soft Stretch Jeans');
    await expect(page.locator('//a[@href="/product_details/35"]')).toHaveText('Regular Fit Straight Jeans');
    await expect(page.locator('//a[@href="/product_details/37"]')).toHaveText('Grunt Blue Slim Fit Jeans');
  });
                                              //Test Case 21
  test('Add review on product',async() =>{
    await productpage.clickproduct();
    await productpage.clickfirstViewProduct();
    
    const ReviewMsg = await page.locator('a[href="#reviews"]').textContent();
    console.log(ReviewMsg);
    expect(ReviewMsg).toContain('Write Your Review');

    await productdetail.enterName('Uday');
    await productdetail.enterEmailAdr('Uday12@gmail.com');
    await productdetail.enterReview('Good Product');
    await productdetail.clickSubmitBtn();

    const SucessMsg = await page.locator('span[style="font-size: 20px;"]').textContent();
    console.log(SucessMsg);
    expect(SucessMsg).toContain('Thank you for your review.');
  });
                                                 //Test Case 22
  test('Add to cart from Recommended items',async() =>{
    const RecommendedMsg = await page.locator('(//h2[@class="title text-center"])[2]').textContent();
    console.log(RecommendedMsg);
    expect(RecommendedMsg).toContain('recommended items');

    await homepage.clickaddtocartglass();
    await productdetail.clickViewCart();

    const VerifyGlass = await page.locator('(//a[@href="/product_details/2"])').textContent();
    console.log(VerifyGlass);
    expect(VerifyGlass).toContain('Men Tshirt');
  });
                                                //Test Case 23
  test('Verify address details in checkout page',async() =>{
    await page.locator('a[href="/login"]').click();
    await signuppage.signup('Ram', 'howkgax2223@gmail.com');
       await signupdetails.fillAccountDetails({
                           password: 'Test@123',
                           day: '15',
                           month: '8',
                           year: '1978',
                           firstName: 'Ram',
                           lastName: 'Kumar',
                           company: 'ABC',
                           address: 'Kathmandu',
                           country: 'Canada',
                           state: 'Bagmati',
                           city: 'Kathmandu',
                           zip: '12345',
                           mobile: '1234567890'
  });
     await accountcreatedpage.verifyAccountCreated();
     await accountcreatedpage.clickContinue();

     const loginText = await page.locator('a:has-text("Logged in as")').textContent();
     console.log(loginText);
     expect(loginText).toEqual(' Logged in as Ram');

     await productpage.clickaddtocart1();
     await productpage.clickcontinueshopping();
     await productpage.clickaddtocart2();
     await productpage.clickcontinueshopping();
     await cartpage.clickCartlink();
     await cartpage.proceedToCheckout();
    
     const DeliveryAddress = page.locator('#address_delivery');
     await expect(DeliveryAddress).toBeVisible();

     const BilingAddress = page.locator('#address_invoice');
     await expect(BilingAddress).toBeVisible();

     const deliveryLines = await page.locator('#address_delivery li:not(.address_title)').allInnerTexts();
     const billingLines = await page.locator('#address_invoice li:not(.address_title)').allInnerTexts();
     expect(deliveryLines).toEqual(billingLines);

      expect(deliveryLines).toContain('Mr. Ram Kumar');
      expect(deliveryLines).toContain('ABC');
      expect(deliveryLines).toContain('Kathmandu');
      expect(deliveryLines).toContain('Kathmandu Bagmati 12345');
      expect(deliveryLines).toContain('Canada');
      expect(deliveryLines).toContain('1234567890');

     // await loginPage.clickdeleteAcc();
     // await loginPage.verifyAccountDeleted();
});
                                                  //Test Case 24
    test('Download Invoice after purchase order',async() =>{
       await productpage.clickaddtocart1();
       await productpage.clickcontinueshopping();
       await productpage.secondproduct();
       await productpage.clickaddtocart2();
       await productpage.clickcontinueshopping();
       await cartpage.clickCartlink();
       await cartpage.proceedToCheckout();
       await cartpage.clickRegisterLogin();

       await signuppage.signup('Hari', 'hzazzvhjcx123123@gmail.com');
       await signupdetails.fillAccountDetails({
                           password: 'Test@123',
                           day: '10',
                           month: '5',
                           year: '1998',
                           firstName: 'Hari',
                           lastName: 'Ram',
                           company: 'XYZ',
                           address: 'Kathmandu',
                           country: 'Canada',
                           state: 'Bagmati',
                           city: 'Kathmandu',
                           zip: '12345',
                           mobile: '1234567890'
  });
     await accountcreatedpage.verifyAccountCreated();
     await accountcreatedpage.clickContinue();

     const loginText = await page.locator('a:has-text("Logged in as")').textContent();
     console.log(loginText);
     expect(loginText).toEqual(' Logged in as Hari');

     await cartpage.clickCartlink();
     await cartpage.proceedToCheckout();

     await checkoutpage.verifyAddressdetials();
     await checkoutpage.verifyOrderreview();
     await checkoutpage.fillMessage('Deliver as soon as possible');
     await checkoutpage.clickPlaceOrderBtn();

     await paymentpage.pay({
       name: 'Hari',
       number: '4111111111111111',
       cvc: '123',
       month: '12',
       year: '2028'
     });
      
    // const SuccessMsg = await page.locator('.alert-success.alert').textContent();
    // console.log(SuccessMsg);
    // expect(SuccessMsg).toContain('Your order has been placed successfully!');
    await checkoutpage.verifySuccessMsg();
    await checkoutpage.clickDownloadInvoice();
    await checkoutpage.clickContinueBtn();
      
       // await loginPage.clickdeleteAcc();
      // await loginPage.verifyAccountDeleted();
  }); 
                                                      //Test Case 25
  test(' Verify Scroll Up using Arrow button and Scroll Down functionality',async() =>{
    await homepage.scrollToFooter(); 
    await expect(homepage.footer).toBeVisible();
    await expect(page.getByText('Subscription')).toBeVisible();
    await homepage.clickScrollUp();

    const text = await page.locator('#slider').textContent();
    expect(text).toContain('Full-Fledged practice website for Automation Engineers');
  });  
                                                   //Test Case 26
  test('Verify Scroll Up without Arrow button and Scroll Down functionality', async () => {
        const footer = page.locator('#footer');
        await footer.scrollIntoViewIfNeeded();

        await expect(page.getByText('Subscription')).toBeVisible();

        await page.evaluate(() => {
            window.scrollTo(0, 0);
        });

        const text = await page.locator('#slider').textContent();
        expect(text).toContain('Full-Fledged practice website for Automation Engineers');
  });
});
