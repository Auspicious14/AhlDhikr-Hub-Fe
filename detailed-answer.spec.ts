import { test, expect } from '@playwright/test';

test.describe('Detailed Answer Page Verification', () => {
  test('should load and display a valid answer page', async ({ page }) => {
    // Navigate to a known valid slug from the mock data
    await page.goto('/ask/ruling-on-fast-of-arafah');

    // Check for the main question heading to ensure the page loaded correctly
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('What is the ruling on fasting on the Day of Arafah?');

    // Check for a key piece of content in the answer body
    await expect(page.locator('text=Fasting on the Day of Arafah is a highly recommended Sunnah')).toBeVisible();

    // Verify that the evidence sidebar is present by looking for its heading
    const sidebar = page.locator('div').filter({ hasText: 'Cited Sources' }).first();
    await expect(sidebar).toBeVisible();
    await expect(sidebar).toContainText('Sahih Muslim, 1162');

    // Capture a screenshot for visual confirmation
    await page.screenshot({ path: 'screenshots/detailed-answer-page.png', fullPage: true });
  });
});
