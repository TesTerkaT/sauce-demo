import {expect, test} from "@playwright/test";

test.describe("Login suite", () => {
    test("Standard user valid login", async ({page}) => {
        await page.goto("https://www.saucedemo.com/");
        await page.fill("#user-name", "standard_user");
        await page.fill("#password", "secret_sauce");
        await page.click("#login-button");
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

    test("Standard user login with invalid username", async ({page}) => {
        await page.goto("https://www.saucedemo.com/");
        await page.fill("#user-name", "standarduser");
        await page.fill("#password", "secret_sauce");
        await page.click("#login-button");
        const errorAlert = await page.locator('h3[data-test="error"]');
        await expect(errorAlert).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    test("Standard user login with invalid password", async ({page}) => {
        await page.goto("https://www.saucedemo.com/");
        await page.fill("#user-name", "standard_user");
        await page.fill("#password", "secretsauce");
        await page.click("#login-button");
        const errorAlert = await page.locator('h3[data-test="error"]');
        await expect(errorAlert).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    test("Standard user login with empty username", async ({page}) => {
        await page.goto("https://www.saucedemo.com/");
        await page.fill("#user-name", "");
        await page.fill("#password", "secret_sauce");
        await page.click("#login-button");
        const errorAlert = await page.locator('h3[data-test="error"]');
        await expect(errorAlert).toHaveText('Epic sadface: Username is required');
    });

    test("Standard user login with empty password", async ({page}) => {
        await page.goto("https://www.saucedemo.com/");
        await page.fill("#user-name", "standard_user");
        await page.fill("#password", "");
        await page.click("#login-button");
        const errorAlert = await page.locator('h3[data-test="error"]');
        await expect(errorAlert).toHaveText('Epic sadface: Password is required');
    });

    test("Password input should be hidden)", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        const passwordField = page.locator("#password");
        // Check that the type is "password"
        await expect(passwordField).toHaveAttribute("type", "password");
    });

})