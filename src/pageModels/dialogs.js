// This file contains selectors and functions related to dialogs from all pages
import { Selector, t } from 'testcafe';


class Dialogs {
    constructor() {
        this.cartSummary = new CartSummaryDialog();
    }
}

class CartSummaryDialog {
    constructor() {
        this.closeButton = Selector("span").withAttribute("title", "Close window");
        this.continueShoppingButton = Selector("span").withAttribute("class", /continue/);
        this.proceedToCheckoutButton = Selector("span").withAttribute("class", /continue/).nextSibling("a");

        //Product info
        this.successfulMessage = Selector("h2").withExactText("Product successfully added to your shopping cart");
        this.productName = Selector("span").withAttribute("class", "product-name");
        this.productAttributes = Selector("span").withAttribute("class", "product-name").nextSibling(0);
        this.productQuantityLabel = Selector("strong").withExactText("Quantity");
        this.productQuantityValue = Selector("#layer_cart_product_quantity");
        this.productPriceLabel = Selector("strong").withExactText("Total");
        this.productPriceValue = Selector("#layer_cart_product_price")

        //Summary info
        this.summaryTitle = Selector("h2").withText(/ in your cart\./mi)
        this.summaryProductsPriceLabel = Selector("strong").withExactText("Total products");
        this.summaryProductsPriceValue = Selector("span").withAttribute("class", "ajax_block_products_total");
        this.summaryShippingPriceLabel = Selector("strong").withExactText("Total shipping");
        this.summaryShippingPriceValue = Selector("span").withAttribute("class", "ajax_cart_shipping_cost");
        this.summaryTotalPriceLabel = Selector("strong").withExactText("Total");
        this.summaryTotalPriceValue = Selector("span").withAttribute("class", "ajax_block_cart_total");
    }

    verifyProductName = async (productName) => {
        await t
            .expect(this.productName.exists).ok('The product name is not displayed.')
            .expect(this.productName.innerText).eql(productName);
    }

    verifyProductAttributes = async (colour, size) => {
        await t
            .expect(this.productAttributes.exists).ok('The product attributes are not displayed.')
            .expect(this.productAttributes.innerText).eql(`${colour}, ${size}`);
    }

    verifyProductQuantity = async (quantity) => {
        if (typeof quantity == "number")
            await t
                .expect(this.productQuantityValue.exists).ok('The product quantity is not displayed.')
                .expect(this.productQuantityValue.innerText).eql(`${quantity}`);
        else
            throw new Error('The "quantity" parameter needs to be a number!');
    }

    verifyProductPrice = async (price, currency = "$") => {
        if (typeof price == "string" && typeof currency == "string")
            await t
                .expect(this.productPriceValue.exists).ok('The product price is not displayed.')
                .expect(this.productPriceValue.innerText).eql(`${currency}${price}`);
        else
            throw new Error('Both parameters need to be a string ("price" and "currency")!');
    }

    verifySummaryProductsPrice = async (price, currency = "$") => {
        if (typeof price == "string" && typeof currency == "string")
            await t
                .expect(this.summaryProductsPriceValue.exists).ok('The summary products price is not displayed.')
                .expect(this.summaryProductsPriceValue.innerText).eql(`${currency}${price}`);
        else
            throw new Error('Both parameters need to be a string ("price" and "currency")!');
    }

    verifySummaryShippingPrice = async (price, currency = "$") => {
        if (typeof price == "string" && typeof currency == "string")
            await t
                .expect(this.summaryShippingPriceValue.exists).ok('The summary shipping price is not displayed.')
                .expect(this.summaryShippingPriceValue.innerText).eql(`${currency}${price}`);
        else
            throw new Error('Both parameters need to be a string ("price" and "currency")!');
    }

    verifySummaryTotalPrice = async (price, currency = "$") => {
        if (typeof price == "string" && typeof currency == "string")
            await t
                .expect(this.summaryTotalPriceValue.exists).ok('The summary total price is not displayed.')
                .expect(this.summaryTotalPriceValue.innerText).eql(`${currency}${price}`);
        else
            throw new Error('Both parameters need to be a string ("price" and "currency")!');
    }
}

export default new Dialogs();