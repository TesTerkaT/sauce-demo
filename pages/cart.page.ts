import {expect, Locator, Page} from "@playwright/test";
import {urls} from "../model/cart.constants";

export class CartPageObjectModel {
    readonly page: Page;
    readonly cartBadge: Locator;
    readonly priceLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.locator(".shopping_cart_link");
        this.priceLocator = page.locator(".inventory_item_price");
    }

    async addItemToCart(itemName: string, expectedItemCount: string) {
        await this.page.click(`#add-to-cart-${itemName}`);
        await expect(this.cartBadge).toHaveText(expectedItemCount);
    }

    async goToCart() {
        await this.page.click(".shopping_cart_link");
        await expect(this.page).toHaveURL(urls.cart);
    }

    async removeItemFromCart(itemName: string, expectedItemCount: string) {
        await this.page.click(`#remove-${itemName}`);
        await expect(this.cartBadge).toHaveText(expectedItemCount);
    }

    async removeButtonItemFromCart(itemName: string, expectedItemCount: string) {
        await this.page.click(`#remove-${itemName}`);
        await expect(this.cartBadge).toHaveText(expectedItemCount);
    }

    async addToRemove(itemName: string) {
        await this.page.click(`#add-to-cart-${itemName}`);

        const addButton = this.page.locator(`#remove-${itemName}`);
        await expect(addButton).toHaveText("Remove");
    }

    async removeToAdd(itemName: string) {
        await this.page.click(`#remove-${itemName}`);

        const removeButton = this.page.locator(`#add-to-cart-${itemName}`);
        await expect(removeButton).toHaveText("Add to cart");
    }

    async sortAZ() {
        await this.page.selectOption(".product_sort_container", "Name (A to Z)");
    }

    // Square brackets, because it returns an ARRAY of strings
    async getAllItemNames(): Promise<string[]> {
        return await this.page.locator(".inventory_item_name").allTextContents();
    }

    async getSortedItemNamesAZ(): Promise<string[]> {
        const names = await this.getAllItemNames();
        // a.localeCompare(b) compares two strings alphabetically (A–Z)
        return names.sort((a, b) => a.localeCompare(b));
    }

    async sortZA() {
        await this.page.selectOption(".product_sort_container", "Name (Z to A)");
    }

    async sortPriceLowToHigh() {
        await this.page.selectOption(".product_sort_container", "Price (low to high)");
    }

    async getAllItemPrices(): Promise<number[]> {
        // Find all item prices (declaration of an immutable constant productPrices, to which I assign the value of a locator using the allTextContents method).
        const productPrices = await this.page.locator(".inventory_item_price").allTextContents();
        // Remove $ sign and transform all prices from string to number
        return productPrices.map(price => parseFloat(price.replace('$', '')));
    }

    // : Promise<number[]> = Return type of the method (návratový typ metody)
    async getSortedPricesLowToHigh(): Promise<number[]> {
        const numbers = await this.getAllItemPrices();
        // Sort prices as numbers from low to high
        return numbers.sort((a, b) => a - b);
    }

    async sortPriceHighToLow() {
        await this.page.selectOption(".product_sort_container", "Price (high to low)");
    }

    async itemNameNavigation(itemName: string, itemNumber: number) {
        await this.page.click(`#${itemName}_title_link`);
        await expect(this.page).toHaveURL(`https://www.saucedemo.com/inventory-item.html?id=${itemNumber}`);
    }

    async itemImageNavigation(itemName: string, itemNumber: number) {
        await this.page.click(`#${itemName}_img_link`);
        await expect(this.page).toHaveURL(`https://www.saucedemo.com/inventory-item.html?id=${itemNumber}`);
    }
}