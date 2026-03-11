import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from '../pages/playwright-dev-page';
import path from 'node:path';

test('getting started should contain table of contents', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.getStarted();
  await expect(playwrightDev.tocList).toHaveText([
    `How to install Playwright`,
    `What's installed`,
    `How to run the example test`,
    `How to open the HTML test report`,
    `Write tests using web-first assertions, fixtures and locators`,
    `Run single or multiple tests; headed mode`,
    `Generate tests with Codegen`,
    `View a trace of your tests`
  ]);
  await playwrightDev.takePageScreenshot();
});

test('should show Page Object Model article', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.pageObjectModel();
  await expect(page.locator('article')).toContainText('Page Object Model is a common pattern');
});

test('Open the F&O dashboard', async({ page }) => {
  await page.goto("https://de-cd-demo1.sandbox.operations.eu.dynamics.com/?cmp=usmf&mi=DefaultDashboard");
  await expect(page.locator('xpath=//span[contains(text(), "Contoso Entertainment System USA")]')).toBeVisible();
});

test('Create Purchase Order', async({ page }) => {
  await page.goto("https://de-cd-demo1.sandbox.operations.eu.dynamics.com/?cmp=usmf&mi=DefaultDashboard");
  await expect(page.locator('xpath=//span[contains(text(), "Contoso Entertainment System USA")]')).toBeVisible();
  await page.locator('xpath=//span[@data-dyn-title="Modules"]').click();
  await page.locator('xpath=//a[@aria-posinset="1"]').click();
  await page.locator('xpath=//a[@data-dyn-title="All purchase orders"]').click();
  await page.locator('xpath=//span[@class="button-commandRing New-symbol"]').click();
  await page.getByLabel('Create purchase order').getByRole('combobox', { name: 'Vendor account' }).fill('Acme');
  await page.locator('#PurchCreateOrder_3_PurchTable_OrderAccount > .lookupDock-buttonContainer > .lookupButton').click();
  await page.keyboard.press('Enter');
  await page.getByRole('combobox', { name: 'Warehouse' }).fill('ColdWH');
  await page.locator('#PurchCreateOrder_3_PurchTable_InventLocationId > .lookupDock-buttonContainer > .lookupButton').click();
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'OK' }).click();
});
