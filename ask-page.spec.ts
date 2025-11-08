import { test, expect } from '@playwright/test';

test('should ask a question, receive an answer, and see recent questions', async ({ page }) => {
  // Navigate to the ask page
  await page.goto('/ask');

  // Verify that the "Recent Questions" sidebar is visible if there are recent questions
  const recentQuestionsCount = await page.locator('[href^="/ask/"]').count();
  if (recentQuestionsCount > 0) {
    await expect(page.locator('text="Recent Questions"')).toBeVisible();
  }

  // Fill in the question form
  const question = 'What is the ruling on fasting on the day of Ashura?';
  await page.fill('textarea[name="question"]', question);

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait for the answer page to load
  await page.waitForURL('**/ask/**');

  // Verify the content of the answer page
  const questionText = await page.textContent('h1');
  expect(questionText).toContain('What is the ruling on fasting on the day of Ashura?');

  // Capture a screenshot of the successful answer
  await page.screenshot({ path: 'screenshots/ask-page-answer.png' });
});
