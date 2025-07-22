import { expect, test } from '@playwright/test';
import { urls } from '../model/login.constants';
import { LoginPage } from '../pages/login.page';

test.describe('Login suite', () => {
  test('Standard user valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(urls.inventory);
  });

  test('Standard user login with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('standarduser', 'secret_sauce');

    const errorAlert = page.locator('h3[data-test="error"]');
    await expect(errorAlert).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('Standard user login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('standard_user', 'secretsauce');

    const errorAlert = page.locator('h3[data-test="error"]');
    await expect(errorAlert).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('Standard user login with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('', 'secret_sauce');

    const errorAlert = page.locator('h3[data-test="error"]');
    await expect(errorAlert).toHaveText('Epic sadface: Username is required');
  });

  test('Standard user login with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('standard_user', '');

    const errorAlert = page.locator('h3[data-test="error"]');
    await expect(errorAlert).toHaveText('Epic sadface: Password is required');
  });

  test('Password input should be hidden)', async ({ page }) => {
    await page.goto(urls.index);
    const passwordField = page.locator('#password');
    // Check that the type is "password"
    await expect(passwordField).toHaveAttribute('type', 'password');
  });
});
