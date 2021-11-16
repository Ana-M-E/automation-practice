import cartSummaryPage from "../pageModels/cartSummaryPage";
import { GuestUser, LoggedUser } from "../resources/roles";
import productPage from "../pageModels/productPage";
import { LoginInfo, PaymentType, TestProducts, Urls } from "../resources/constants";
import dialogs from "../pageModels/dialogs";
import orderConfirmationPage from "../pageModels/orderConfirmationPage";


fixture`Order Placement as Logged User`
  .beforeEach(async (t) => {
    await t.useRole(LoggedUser);
  });

test("Place order with one product and pay by bank wire", async (t) => {
  //Add product
  await productPage.addProductToCart(TestProducts.product1.url);
  await dialogs.cartSummary.verifyProductName(TestProducts.product1.name);

  //Proceed to checkout
  await t
    .click(dialogs.cartSummary.proceedToCheckoutButton)
    .expect(cartSummaryPage.title.exists).ok()
    .click(cartSummaryPage.summaryTab.proceedToCheckoutButton)
    .click(cartSummaryPage.addressTab.proceedToCheckoutButton)
    .click(cartSummaryPage.shippingTab.termsOfServiceCheckBox)
    .expect(cartSummaryPage.shippingTab.termsOfServiceCheckBox.checked).ok()
    .click(cartSummaryPage.shippingTab.proceedToCheckoutButton)
    .click(cartSummaryPage.paymentTab.payByBankWireButton)
    .click(cartSummaryPage.paymentTab.confirmOrderButton);

  await orderConfirmationPage.verifySuccessMessage(PaymentType.bankWire);
  await orderConfirmationPage.verifyAmount("28.00");
});

test("Place order with two different products and pay by check", async (t) => {
  //Add first product to cart
  await productPage.addProductToCart(TestProducts.product2.url);
  await dialogs.cartSummary.verifyProductName(TestProducts.product2.name);

  //Add second product to cart
  await productPage.addProductToCart(TestProducts.product3.url);
  await dialogs.cartSummary.verifyProductName(TestProducts.product3.name);

  //Proceed to checkout
  await t
    .click(dialogs.cartSummary.proceedToCheckoutButton)
    .expect(cartSummaryPage.title.exists).ok()
    .click(cartSummaryPage.summaryTab.proceedToCheckoutButton)
    .click(cartSummaryPage.addressTab.proceedToCheckoutButton)
    .click(cartSummaryPage.shippingTab.termsOfServiceCheckBox)
    .expect(cartSummaryPage.shippingTab.termsOfServiceCheckBox.checked).ok()
    .click(cartSummaryPage.shippingTab.proceedToCheckoutButton)
    .click(cartSummaryPage.paymentTab.payByCheckButton)
    .click(cartSummaryPage.paymentTab.confirmOrderButton);

  await orderConfirmationPage.verifySuccessMessage(PaymentType.check);
  await orderConfirmationPage.verifyAmount("49.01");
});

test("Place order with two different products and different quantities", async (t) => {
  //Add first product to cart
  await t.navigateTo(`${Urls.landingPage}${TestProducts.product2.url}`);
  await productPage.updateQuantity(2);
  await t.click(productPage.addToCartButton);

  //Verify correct product has been added to cart
  await dialogs.cartSummary.verifyProductName(TestProducts.product2.name);
  await dialogs.cartSummary.verifyProductQuantity(2);

  //Add second product to cart
  await productPage.addProductToCart(TestProducts.product1.url);
  await dialogs.cartSummary.verifyProductName(TestProducts.product1.name);

  //Proceed to checkout
  await t
    .click(dialogs.cartSummary.proceedToCheckoutButton)
    .expect(cartSummaryPage.title.exists).ok()
    .click(cartSummaryPage.summaryTab.proceedToCheckoutButton)
    .click(cartSummaryPage.addressTab.proceedToCheckoutButton)
    .click(cartSummaryPage.shippingTab.termsOfServiceCheckBox)
    .expect(cartSummaryPage.shippingTab.termsOfServiceCheckBox.checked).ok()
    .click(cartSummaryPage.shippingTab.proceedToCheckoutButton)
    .click(cartSummaryPage.paymentTab.payByCheckButton)
    .click(cartSummaryPage.paymentTab.confirmOrderButton);

  await orderConfirmationPage.verifySuccessMessage(PaymentType.check);
  await orderConfirmationPage.verifyAmount("89.00");

});

test("Place order after removing a product on Summary tab", async (t) => {
  //Add first product
  await productPage.addProductToCart(TestProducts.product1.url);
  await dialogs.cartSummary.verifyProductName(TestProducts.product1.name);

  //Add second product
  await productPage.addProductToCart(TestProducts.product2.url);
  await dialogs.cartSummary.verifyProductName(TestProducts.product2.name);

  //Proceed to checkout
  await t
    .expect(dialogs.cartSummary.proceedToCheckoutButton.exists).ok()
    .click(dialogs.cartSummary.proceedToCheckoutButton)
    .expect(cartSummaryPage.title.exists).ok()
    .expect(cartSummaryPage.summaryTab.productsTable.exists).ok('The table of products is not displayed')
    .expect(cartSummaryPage.summaryTab.productsTable.childElementCount).eql(2); //check if there are 2 products in the table

  await cartSummaryPage.summaryTab.removeProduct(TestProducts.product1.sku);

  await t
    .click(cartSummaryPage.summaryTab.proceedToCheckoutButton)
    .click(cartSummaryPage.addressTab.proceedToCheckoutButton)
    .click(cartSummaryPage.shippingTab.termsOfServiceCheckBox)
    .expect(cartSummaryPage.shippingTab.termsOfServiceCheckBox.checked).ok()
    .click(cartSummaryPage.shippingTab.proceedToCheckoutButton)
    .click(cartSummaryPage.paymentTab.payByBankWireButton)
    .click(cartSummaryPage.paymentTab.confirmOrderButton);

  await orderConfirmationPage.verifySuccessMessage(PaymentType.bankWire);
  await orderConfirmationPage.verifyAmount("32.50");
});

test("Place order after increasing quantity on Summary tab", async (t) => { });

test("Place order after decreasing quantity on Summary tab", async (t) => { });

test("Place order with products from the wishlist", async (t) => { });

test("Place order after logging out and logging back in", async (t) => { });

test("Add product from Search page and place order for new address", async (t) => { });

test("Go to checkout from cart drop-down and place order for updated address", async (t) => { });

test("Place order with different billing address", async (t) => { });

test("Place order with a comment on Address tab", async (t) => { });

test("Place order with products on sale", async (t) => { });

test("Remove all products while on Summary tab", async (t) => { });

test("Try to proceed to checkout without accepting the terms of service", async (t) => { });

test("Check info on Summary tab", async (t) => { });

test("Check info on Address tab", async (t) => { });

test("Check info on Shipping tab", async (t) => { });

test("Check info on Payment tab", async (t) => { });

test("Check info on confirmation page after placing order", async (t) => { });

test("Check order placed is stored in order history", async (t) => { });


fixture`Order Placement as Guest User`
  .beforeEach(async (t) => {
    await t.useRole(GuestUser);
  });

test("Place order after logging in to an account and pay by bank wire", async (t) => {
  //Add product
  await productPage.addProductToCart(TestProducts.product1.url);
  await dialogs.cartSummary.verifyProductName(TestProducts.product1.name);

  //Proceed to checkout
  await t
    .click(dialogs.cartSummary.proceedToCheckoutButton)
    .expect(cartSummaryPage.title.exists).ok()
    .click(cartSummaryPage.summaryTab.proceedToCheckoutButton);

  await cartSummaryPage.signInTab.signInWithCredentials(LoginInfo.emailAddress, LoginInfo.password);

  await t
    .click(cartSummaryPage.addressTab.proceedToCheckoutButton)
    .click(cartSummaryPage.shippingTab.termsOfServiceCheckBox)
    .expect(cartSummaryPage.shippingTab.termsOfServiceCheckBox.checked).ok()
    .click(cartSummaryPage.shippingTab.proceedToCheckoutButton)
    .click(cartSummaryPage.paymentTab.payByBankWireButton)
    .click(cartSummaryPage.paymentTab.confirmOrderButton);

  await orderConfirmationPage.verifySuccessMessage(PaymentType.bankWire);
  await orderConfirmationPage.verifyAmount("28.00");
});

test("Place order after creating an account and pay by check", async (t) => { });

test("Try to bypass the Sign in tab when not logged in", async (t) => { });

test("Try to log in with invalid credentials on Sign in tab", async (t) => { });