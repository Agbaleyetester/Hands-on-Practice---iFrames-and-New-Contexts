import { test, expect } from '@playwright/test';
test('should type text into the iFrame editor', async ({ page }) => {
  // Navigate to the iFrame page
  await page.goto('https://the-internet.herokuapp.com/iframe');
   // Create a frame locator for the iFrame
  const frame = page.frameLocator('iframe[title="Rich Text Area"]');

  // Locate the editor body inside the iFrame
  const editor = frame.locator('#tinymce');

  // Clear existing text
  await editor.clear();

  // Type new text
  await editor.type('Hello, iFrame!');

  // Assert the text is present
  await expect(editor).toHaveText('Hello, iFrame!');
});