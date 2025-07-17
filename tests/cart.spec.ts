import {expect, test} from "@playwright/test";
import {LoginPage} from "../pages/login.page";

test.describe('Cart suite', () => {
    test("Add to cart button adds product to cart", async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.login("standard_user", "secret_sauce");

        await page.click("#add-to-cart-sauce-labs-backpack");

        const cartBadge = page.locator(".shopping_cart_link");
        await expect(cartBadge).toHaveText("1");
    })

    test("Remove button removes product from cart", async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.login("standard_user", "secret_sauce");

        await page.click("#add-to-cart-sauce-labs-backpack");

        const cartBadge = page.locator(".shopping_cart_link");
        await expect(cartBadge).toHaveText("1");

        await page.click("#remove-sauce-labs-backpack");

        await expect(cartBadge).toHaveText("");
    })

    test("Add to cart button changes to Remove", async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.login("standard_user", "secret_sauce");

        await page.click("#add-to-cart-sauce-labs-backpack");

        const addButton = page.locator("#remove-sauce-labs-backpack");
        await expect(addButton).toHaveText("Remove");
    })

    test("Remove button changes to Add to cart", async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.login("standard_user", "secret_sauce");

        await page.click("#add-to-cart-sauce-labs-backpack");

        const addButton = page.locator("#remove-sauce-labs-backpack");
        await expect(addButton).toHaveText("Remove");

        await page.click("#remove-sauce-labs-backpack");

        const removeButton = page.locator("#add-to-cart-sauce-labs-backpack");
        await expect(removeButton).toHaveText("Add to cart");
    })
});