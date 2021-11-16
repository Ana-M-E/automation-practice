// This file contains selectors and functions related to the authentication page
import { Selector, t } from 'testcafe';
import { TextOnAuthenticationPage, Urls } from "../resources/constants";


class AuthenticationPage {
    constructor() {
        this.title = Selector("h1").withExactText(TextOnAuthenticationPage.title);
        this.signInForm = new SignInForm();
        this.registerForm = new RegisterForm();
    }
}

// Sign in form
class SignInForm {
    constructor() {
        //Labels
        this.formTitleLabel = Selector("form").withAttribute("id", "login_form").child("h3");
        this.emailLabel = Selector("label").withAttribute("for", "email");
        this.passwordLabel = Selector("label").withAttribute("for", "passwd");

        //Input boxes
        this.emailInput = Selector('input').withAttribute("name", 'email');
        this.passwordInput = Selector('input').withAttribute("name", 'passwd');

        //Button, Link
        this.signInButton = Selector('button').withAttribute("name", 'SubmitLogin');
        this.forgotPassword = Selector("a").withAttribute("href", Urls.forgotPasswordPage);
    }

    signInWithCredentials = async (emailAddress, password) => {
        await t
            .typeText(this.emailInput, emailAddress, { replace: true })
            .typeText(this.passwordInput, password, { replace: true })
            .click(this.signInButton)
            .expect(this.signInButton.exists).notOk("Sign in button is displayed. The login was not successful.");
    }
}

//Register form
class RegisterForm {
    constructor() {
        //Labels
        this.formTitleLabel = Selector("form").withAttribute("id", "create-account_form").child("h3");
        this.emailLabel = Selector("label").withAttribute("for", "email_create");

        //Input box
        this.emailInput = Selector('input').withAttribute("name", 'email_create');

        //Button
        this.createAccountButton = Selector('button').withAttribute("name", 'SubmitCreate');
    }
}

export default new AuthenticationPage();