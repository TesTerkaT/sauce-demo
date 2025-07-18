import {expect, Locator, Page} from "@playwright/test";

export class CartPageObjectModel {
    readonly page: Page;
    readonly cartBadge: Locator;
    readonly itemPrice: Locator;

    constructor(page: Page) {
        this.page = page
        this.cartBadge = page.locator(".shopping_cart_link");
        this.itemPrice = page.locator(".inventory_item_price").locator("nth=0");
    }

    async addItemToCart(itemName: string, expectedItemCount: string) {
        await this.page.click(`#add-to-cart-${itemName}`);
        await expect(this.cartBadge).toHaveText(expectedItemCount);
    }

    async removeItemFromCart(itemName: string, expectedItemCount: string) {
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

    async sortZA() {
        await this.page.selectOption(".product_sort_container", "Name (Z to A)");

        const item3 = this.page.locator("#item_3_title_link");
        await expect(item3).toHaveText("Test.allTheThings() T-Shirt (Red)");
    }

    async sortAZ() {
        await this.page.selectOption(".product_sort_container", "Name (A to Z)");

        const item4 = this.page.locator("#item_4_title_link");
        await expect(item4).toHaveText("Sauce Labs Backpack");
    }

    async sortPriceLowToHigh() {
        await this.page.selectOption(".product_sort_container", "Price (low to high)");
        await expect(this.itemPrice).toHaveText("$7.99");
    }

    async sortPriceHighToLow() {
        await this.page.selectOption(".product_sort_container", "Price (high to low)");
        await expect(this.itemPrice).toHaveText("$49.99");
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