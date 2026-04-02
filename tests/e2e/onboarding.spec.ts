import { test, expect } from "@playwright/test";

test.describe("Onboarding — 13-Card Gatekeeper", () => {
  test.beforeEach(async ({ page }) => {
    // Stub Clerk auth in test environment
    await page.goto("/onboarding");
  });

  test("shows progress bar on load", async ({ page }) => {
    await expect(page.getByText("1 / 13")).toBeVisible();
  });

  test("regional selector shows province picker for South Africa", async ({ page }) => {
    // Advance to region card
    while (!(await page.getByText("Where are you studying?").isVisible())) {
      await page.getByRole("button", { name: /continue/i }).click();
    }

    const countrySelect = page.locator("select").first();
    await countrySelect.selectOption("ZA");
    await expect(page.getByText("Western Cape")).toBeVisible();
  });

  test("selecting ZA_WC shows curriculum preview", async ({ page }) => {
    while (!(await page.getByText("Where are you studying?").isVisible())) {
      await page.getByRole("button", { name: /continue/i }).click();
    }

    const countrySelect = page.locator("select").first();
    await countrySelect.selectOption("ZA");

    const provinceSelect = page.locator("select").nth(1);
    await provinceSelect.selectOption("WC");

    await expect(page.getByText("4 Mandatory subjects locked")).toBeVisible();
  });
});
