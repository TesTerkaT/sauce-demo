import { expect, Page } from "@playwright/test";
import { urls } from "../model/checkout.constans";

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkout() {
    await this.page.click("#checkout");
    await expect(this.page).toHaveURL(urls.checkoutStepOne);
  }

  async checkoutStepOne(firstName: string, lastName: string, zip: number) {
    await this.page.fill("#first-name", `${firstName}`);
    await this.page.fill("#last-name", `${lastName}`);
    await this.page.fill("#postal-code", `${zip}`);
    await this.page.click("#continue");
    await expect(this.page).toHaveURL(urls.checkoutStepTwo);
  }
}
