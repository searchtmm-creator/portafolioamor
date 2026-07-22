import { expect, test } from "@playwright/test";

test("a deliberate drag does not open a project and reset restores transforms", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "mobile",
    "Desktop drag enhancement only",
  );
  await page.goto("/");
  const card = page.getByTestId("polaroid").first();
  const box = await card.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(
    box.x + box.width / 2 + 40,
    box.y + box.height / 2 + 18,
    { steps: 6 },
  );
  await page.mouse.up();
  await expect(page).toHaveURL(/\/$/);
  await page.getByTestId("reset-layout").click();
  await expect(card).toBeVisible();
});

test("mobile has no horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only layout assertion");
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  expect(overflow).toBe(false);
});

test("reduced motion leaves all projects usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByTestId("polaroid")).toHaveCount(16);
  await expect(page.getByTestId("polaroid").last()).toBeVisible();
});
