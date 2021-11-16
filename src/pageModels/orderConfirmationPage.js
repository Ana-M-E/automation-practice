// This file contains selectors and functions related to the order confirmation page
import { Selector, t } from 'testcafe';
import { PaymentType, TextOnConfirmationPage } from '../resources/constants';


class OrderConfirmationPage {
    constructor() {
        this.messageSuccessfulBankWire = Selector("p").withAttribute("class", "cheque-indent");
        this.messageSuccessfulCheck = Selector("p").withAttribute("class", "alert alert-success");
        this.amountToPay = Selector("span").withAttribute("class", "price");
    }

    verifyAmount = async (price, currency = "$") => {
        if (typeof price == "string" && typeof currency == "string")
            await t
                .expect(this.amountToPay.exists).ok("The amount value is not displayed.")
                .expect(this.amountToPay.innerText).eql(`${currency}${price}`);
        else
            throw new Error('Both parameters need to be a string ("price" and "currency")!');
    }

    verifySuccessMessage = async (paymentType) => {
        let paymentTypes = PaymentType;

        switch (paymentType) {
            case PaymentType.bankWire:
                await t
                    .expect(this.messageSuccessfulBankWire.exists).ok()
                    .expect(this.messageSuccessfulBankWire.innerText).eql(TextOnConfirmationPage.messageSuccessful);
                break;

            case PaymentType.check:
                await t
                    .expect(this.messageSuccessfulCheck.exists).ok()
                    .expect(this.messageSuccessfulCheck.innerText).eql(TextOnConfirmationPage.messageSuccessful);
                break;
            default:
                await t.expect(true).eql(false, `The ${paymentType} is not one of the expected payment types. Please, use one of the following: ${JSON.stringify(PaymentType)}`)
                break;
        }
    }
}

export default new OrderConfirmationPage();