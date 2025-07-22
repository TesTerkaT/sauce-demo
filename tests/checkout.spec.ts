import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CartPageObjectModel } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

test.describe('Checkout suite', () => {
  test('Checkout cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cartPage = new CartPageObjectModel(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.login('standard_user', 'secret_sauce');
    await cartPage.addItemToCart('sauce-labs-backpack', '1');
    await cartPage.goToCart();
    await checkoutPage.checkout();
  });

  test('Checkout StepOne with valid data', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cartPage = new CartPageObjectModel(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.login('standard_user', 'secret_sauce');
    await cartPage.addItemToCart('sauce-labs-backpack', '1');
    await cartPage.goToCart();
    await checkoutPage.checkout();
    await checkoutPage.checkoutStepOne('Jane', 'Doe', 12345);
  });

  test('Checkout StepOne with invalid first name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cartPage = new CartPageObjectModel(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.login('standard_user', 'secret_sauce');
    await cartPage.addItemToCart('sauce-labs-backpack', '1');
    await cartPage.goToCart();
    await checkoutPage.checkout();
    await checkoutPage.checkoutStepOne('123', 'Doe', 12345);
  });

  test('Checkout StepOne with invalid last name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cartPage = new CartPageObjectModel(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.login('standard_user', 'secret_sauce');
    await cartPage.addItemToCart('sauce-labs-backpack', '1');
    await cartPage.goToCart();
    await checkoutPage.checkout();
    await checkoutPage.checkoutStepOne('Jane', '456', 12345);
  });

  test('Checkout StepOne with invalid zip code', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cartPage = new CartPageObjectModel(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.login('standard_user', 'secret_sauce');
    await cartPage.addItemToCart('sauce-labs-backpack', '1');
    await cartPage.goToCart();
    await checkoutPage.checkout();
    await checkoutPage.checkoutStepOne('Jane', 'Doe', 1234567891234);
  });
});
