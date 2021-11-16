// This file contains selectors and functions related to the order processing page (summary, sign in, address, shipping, payment tabs)
import { Selector, t } from 'testcafe';


class CartSummaryPage {
    constructor() {
        this.summaryTab = new SummaryTab();
        this.signInTab = new SignInTab();
        this.addressTab = new AddressTab();
        this.shippingTab = new ShippingTab();
        this.paymentTab = new PaymentTab();

        this.title = Selector("h1").withAttribute("id", "cart_title");
    }
}

class SummaryTab {
    constructor() {
        this.proceedToCheckoutButton = Selector("a").withAttribute("href", "http://automationpractice.com/index.php?controller=order&step=1");
        this.productsTable = Selector("tbody");
        this.productName = Selector("p").withAttribute("class", "product-name");
    }

    removeProduct = async (productSku) => {
        let selector = this.productsTable.child("tr").withText(productSku);
        await t
            .expect(selector.exists).ok(`The product with the following SKU does not exist: ${productSku}`)
            .expect(selector.find("i").withAttribute("class", "icon-trash").exists).ok(`The remove product button does not exist for the following SKU: ${productSku}`)
            .click(selector.find("i").withAttribute("class", "icon-trash"))
            .expect(this.productsTable.childElementCount).eql(1)
            .expect(selector.exists).notOk(`The product with the following SKU was not successfully removed: ${productSku}`);
    }
}

class SignInTab {
    constructor() {
        this.emailInput = Selector('input').withAttribute("name", 'email');
        this.passwordInput = Selector('input').withAttribute("name", 'passwd');
        this.signInButton = Selector('button').withAttribute("name", 'SubmitLogin');
    }

    signInWithCredentials = async (emailAddress, password) => {
        await t
            .typeText(this.emailInput, emailAddress, { replace: true })
            .typeText(this.passwordInput, password, { replace: true })
            .click(this.signInButton)
            .expect(this.signInButton.exists).notOk("Sign in button is displayed. The login was not successful.");
    }
}

class AddressTab {
    constructor() {
        this.proceedToCheckoutButton = Selector("button").withAttribute("name", "processAddress");
    }
}

class ShippingTab {
    constructor() {
        this.proceedToCheckoutButton = Selector("button").withAttribute("name", "processCarrier");
        this.termsOfServiceCheckBox = Selector("input").withAttribute("type", "checkbox");
    }
}

class PaymentTab {
    constructor() {
        this.payByBankWireButton = Selector("a").withAttribute("href", /module=bankwire/);
        this.payByCheckButton = Selector("a").withAttribute("href", /module=cheque/);
        this.confirmOrderButton = Selector("#cart_navigation").child("button");
    }
}
export default new CartSummaryPage();