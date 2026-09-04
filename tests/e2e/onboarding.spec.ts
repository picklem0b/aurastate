import { test, expect } from "@playwright/test";

test.describe("Onboarding — 13-Card Gatekeeper", () => {
  test("shows progress bar on load", async ({ page }) => {
    await page.goto("/onboarding");
    await expect(page.getByText("1 / 13")).toBeVisible();
  });

  test("regional selector shows province picker for South Africa", async ({ page }) => {
    await page.goto("/onboarding");

    while (!(await page.getByText("Where are you studying?").isVisible())) {
      await page.getByRole("button", { name: /continue/i }).click();
    }

    const countrySelect = page.locator("select").first();
    await countrySelect.selectOption("ZA");
    await expect(page.getByText("Western Cape")).toBeVisible();
  });
});
