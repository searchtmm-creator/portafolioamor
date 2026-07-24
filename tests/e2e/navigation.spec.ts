import { expect, test } from "@playwright/test";

test("archive contains all projects and navigation works", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("polaroid")).toHaveCount(16);
  await page.getByRole("link", { name: "bio", exact: true }).click();
  await expect(page).toHaveURL(/\/bio$/);
  await page.getByRole("link", { name: "work", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("keyboard opens a project", async ({ page }) => {
  await page.goto("/");
  const first = page.getByTestId("polaroid").first();
  await first.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work\/old-spice-no-seas-paloma$/);
});

test("invalid project uses the archive 404", async ({ page }) => {
  const response = await page.goto("/work/not-a-real-folder");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "We couldn’t find this project." }),
  ).toBeVisible();
});
