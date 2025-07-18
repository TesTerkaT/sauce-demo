import {test} from "@playwright/test";
import {LoginPage} from "../pages/login.page";
import {CartPageObjectModel} from "../pages/cart.page";

test.describe('Cart suite', () => {
    test("Add to cart button adds product to cart", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.addItemToCart("sauce-labs-backpack", "1")
    })

    test("Remove button removes product from cart", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.addItemToCart("sauce-labs-backpack", "1")
        await cartPage.removeItemFromCart("sauce-labs-backpack", "")
    })

    test("Add to cart button changes to Remove", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.addToRemove("sauce-labs-backpack")
    })

    test("Remove button changes to Add to cart", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.addToRemove("sauce-labs-backpack")
        await cartPage.removeToAdd("sauce-labs-backpack")
    })

    test("Sort items by name Z-A", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.sortZA()
    })

    test("Sort items by name A-Z", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.sortZA()
        await cartPage.sortAZ()
    })

    test("Sort items by price (low to high)", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.sortPriceLowToHigh()
    })

    test("Sort items by price (high to low)", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.sortPriceHighToLow()
    })

    test("Click on product name navigates to product detail page", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.itemNameNavigation("item_4", "4")
    })

    test("Click on product image navigates to product detail page", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.itemImageNavigation("item_4", "4")
    })
});