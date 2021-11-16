import { Role } from 'testcafe'
import authenticationPage from '../pageModels/authenticationPage';
import pageHeader from '../pageModels/pageHeader';
import { LoginInfo, Urls } from "./constants";

let baseUrl = Urls.landingPage;

export const GuestUser = Role(baseUrl, async t => {
    await t
        .maximizeWindow()
        .navigateTo(baseUrl);
}, { preserveUrl: false });

export const LoggedUser = Role(baseUrl, async t => {
    await t
        .maximizeWindow()
        .navigateTo(baseUrl)
        .click(pageHeader.signInButton);

    await authenticationPage.signInForm.signInWithCredentials(LoginInfo.emailAddress, LoginInfo.password);
    await t.expect(pageHeader.signOutButton.exists).ok();
}, { preserveUrl: false });