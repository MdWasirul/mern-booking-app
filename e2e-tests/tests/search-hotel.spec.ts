import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("tase@gmail.com");
  await page.locator("[name=password]").fill("test@123");
  await page.getByRole("button", { name: "LogIn" }).click();
  //This is assertion --something to be as it is expected
  await expect(page.getByText("LogIn Success")).toBeVisible({ timeout: 10000 });
});

// test("should show hotel detail", async ({ page }) => {
//   //   await page.goto(UI_URL);
//   await page.getByPlaceholder("Where are you going?").fill("Hotel City");
//   await page.getByRole("button", { name: "Search" }).click();
//   await expect(page.getByText("Hotels found in Hotel City")).toBeVisible({
//     timeout: 10000,
//   });
//   await expect(page.getByRole("link", { name: "Hotel Bihar" })).toBeVisible({
//     timeout: 10000,
//   });
// });

test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Hotel City");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Hotel Bihar").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});
