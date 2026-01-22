import { test, expect } from '@playwright/test';

test('should handle a new tab and verify its content', async ({ page }) => {
  // Navigate to the windows page
  await page.goto('https://the-internet.herokuapp.com/windows');

  // Start waiting for the new page BEFORE clicking
  const pagePromise = page.context().waitForEvent('page');

  // Click the link that opens a new tab
  await page.getByText('Click Here').click();

  // Wait for the new page
  const newPage = await pagePromise;

  // Wait for the new tab to load
  await newPage.waitForLoadState();

  // Verify content in the new tab
  const heading = newPage.locator('h3');
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText('New Window');

  // Close the new tab
  await newPage.close();

  // Verify original page is still active
  await expect(page.locator('h3')).toHaveText('Opening a new window');
});
