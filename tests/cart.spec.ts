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

    test("Remove product from cart", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.addItemToCart("sauce-labs-backpack", "1")
        await cartPage.goToCart()
        await cartPage.removeItemFromCart("sauce-labs-backpack", "")
    })

    test("Remove button removes product from cart", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.addItemToCart("sauce-labs-backpack", "1")
        await cartPage.removeButtonItemFromCart("sauce-labs-backpack", "")
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

    test("Sort items by name A-Z", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.sortAZ()

        const names = await cartPage.getAllItemNames();
        const sortedNames = await cartPage.getSortedItemNamesAZ();

        for (let i = 0; i < names.length; i++) {
            expect(names[i]).toEqual(sortedNames[i]);
        }
    })

    test("Sort items by name Z-A", async ({page}) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        await cartPage.sortZA()

        const names = await cartPage.getAllItemNames();
        const sortedNames = await cartPage.getSortedItemNamesAZ();
        const reversedNames = sortedNames.reverse();

        for (let i = 0; i < names.length; i++) {
            expect(names[i]).toEqual(reversedNames[i]);
        }
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
        // Declaration of an immutable constant cartPage, to which I assign the value of a new instance of the class CartPageObjectModel.
        const cartPage = new CartPageObjectModel(page);

        await loginPage.login("standard_user", "secret_sauce");
        // Use the sortPriceHighToLow method on the cartPage instance, which clicks on the sort dropdown and selects "high to low".
        await cartPage.sortPriceHighToLow()

        // Declaration of an immutable constant "prices" (returns type number), which is assigned the value from the cartPage instance that, using the getAllItemPrices method, gathers all product prices (removes the $ symbol and converts prices from strings to numbers).
        const prices = await cartPage.getAllItemPrices();
        // Declaration of an immutable constant sortedPrices (returns type number), which is assigned the value from calling the getSortedPricesLowToHigh method — it executes the getAllItemPrices method and then sorts the amounts from low to high.
        const sortedPrices = await cartPage.getSortedPricesLowToHigh();
        // Sorts the result from high to low
        const reversedPrices = sortedPrices.reverse();

        // The loop compares the page’s sorting result with my sorting.
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