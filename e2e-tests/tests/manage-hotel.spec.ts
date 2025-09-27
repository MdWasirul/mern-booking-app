import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";
// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UI_URL = "http://localhost:5173/";

// test.beforeEach is a Playwright hook that runs a block of code before each individual test within a test file or a test.describe group.

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

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);
  await page.locator("[name=name]").fill("Hotel Test");
  await page.locator("[name=city]").fill("Hotel City");
  await page.locator("[name=country]").fill("Test Country");
  await page
    .locator("[name=description]")
    .fill("This is a description for Hotel Test");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Cottage").click();
  await page.getByLabel("Free Wi-Fi").check();
  await page.getByLabel("Restaurant").check();
  await page.locator("[name=adultCount]").fill("14");
  await page.locator("[name=childCount]").fill("8");
  await page.setInputFiles("[name=imageFiles]", [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
    path.join(__dirname, "files", "3.jpg"),
  ]);
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 10000 });
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotel`);
  await expect(page.getByText("Hotel Test")).toBeVisible();
  await expect(
    page.getByText("This is a description for Hotel Test")
  ).toBeVisible();
  await expect(page.getByText("Hotel City,Test Country")).toBeVisible();
  await expect(page.getByText("Cottage")).toBeVisible();
  await expect(page.getByText("100 per night")).toBeVisible();
  await expect(page.getByText("14 adults, 8 children")).toBeVisible();
  await expect(page.getByText("3 Star rating")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "AddHotel" })).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotel`);
  await page.getByRole("link", { name: "View Details" }).first().click();
  await page.waitForSelector("[name=name]", { state: "attached" });
  await expect(page.locator("[name=name]")).toHaveValue("Hotel Test");
  await page.locator("[name=name]").fill("Hotel Test UPDATED");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 10000 });
  await page.reload();
  await expect(page.locator("[name=name]")).toHaveValue("Hotel Test UPDATED");
  await page.locator("[name=name]").fill("Hotel Test");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 10000 });
});
