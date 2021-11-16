// This file contains selectors and functions related to the main header
import { Selector } from 'testcafe';


class PageHeader {
    constructor() {
        this.signInButton = Selector("a").withAttribute("class", "login");
        this.signOutButton = Selector("a").withAttribute("class", "logout");
    }
}

export default new PageHeader();