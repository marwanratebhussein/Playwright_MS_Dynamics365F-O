import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://de-cd-demo1.sandbox.operations.eu.dynamics.com/?cmp=usmf&mi=DefaultDashboard');
  await page.locator('xpath=//input[@type="email"]').fill('marwan.hussein@pwc.com');  
  await page.locator('xpath=//input[@type="submit"]').click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://de-cd-demo1.sandbox.operations.eu.dynamics.com/?cmp=usmf&mi=DefaultDashboard');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.locator('xpath=//span[@id="NavBarDashboard_label"]')).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});