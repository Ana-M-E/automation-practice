// This file contains selectors and functions for the product page
import { Selector, t } from 'testcafe';
import { Urls } from '../resources/constants';


class ProductPage {
    constructor() {
        //Buttons
        this.addToCartButton = Selector("button").withAttribute("name", "Submit");
        this.quantityPlus = Selector("a").withAttribute("class", /button-plus/);
        this.quantityMinus = Selector("a").withAttribute("class", /button-minus/);

        //Input field
        this.quantityInput = Selector("input").withAttribute("name", "qty");

        //Drop-down
        this.sizeDropDown = Selector("select");
    }

    selectSize = async (sizeValue) => {
        sizeValue = sizeValue.toUpperCase();
        let sizeOption = this.sizeDropDown.child("option").withAttribute("title", sizeValue);

        await t
            .click(this.sizeDropDown)
            .click(sizeOption)
            .expect(sizeOption.withAttribute("selected", "selected").exists).ok("The size has not been set correctly.");

    }

    updateQuantity = async (quantityValue) => {
        await t.typeText(this.quantityInput, `${quantityValue}`, { replace: true });
    }

    addProductToCart = async (productUrl) => {
        await t
            .navigateTo(`${Urls.landingPage}${productUrl}`)
            .click(this.addToCartButton);
    }
}

export default new ProductPage();