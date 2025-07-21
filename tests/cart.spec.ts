import {expect, test} from "@playwright/test";
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
        await cartPage.sortPriceLowToHigh();

        const prices = await cartPage.getAllItemPrices();
        const sortedPrices = await cartPage.getSortedPricesLowToHigh();

        for (let i = 0; i < prices.length; i++) {
            expect(prices[i]).toEqual(sortedPrices[i]);
        }
    })

    test("Sort items by price (high to low)", async ({page}) => {
        const loginPage = new LoginPage(page);
        // deklarace neměnné konstanty cartPage, které přidávám hodnotu nové instance classy CartPageObjectModel
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        // na instanci cartPage použij metodu sortPriceHighToLow, která klikne na sort lištu a vybere high to low
        await cartPage.sortPriceHighToLow()

        // deklarace neměnné konstanty prices (vrací typ number) má hodnotu instance cartPage která metodou getAllItemPrices shromáždí ceny všech produktů (ubírá $ a převádí ceny ze stringů na numbers)
        const prices = await cartPage.getAllItemPrices();
        // deklarace neměnné konstanty sortedPrices (vrací typ number) má hodnotu volani metody getSortedPricesLowToHigh provede metodu getAllItemPrices a následně částky seřadí low to high
        const sortedPrices = await cartPage.getSortedPricesLowToHigh();
        // seřadí výsledek nad high to low
        const reversedPrices = sortedPrices.reverse();

        // loop porovná výsledek řazení stránky s mým řazením
        for (let i = 0; i < prices.length; i++) {
            expect(prices[i]).toEqual(reversedPrices[i]);
        }
    })

    test("Click on product name navigates to product detail page", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.itemNameNavigation("item_4", 4)
    })

    test("Click on product image navigates to product detail page", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.itemImageNavigation("item_4", 4)
    })
});