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

test("should book hotel with +3 days", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Hyderabad");

  const today = new Date();
  const checkOutDate = new Date(today);
  checkOutDate.setDate(today.getDate() + 3); // add 3 days
  const formattedDate = checkOutDate.toISOString().split("T")[0]!; // e.g., "2025-10-17"
  await page.getByPlaceholder("Check-out Date").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("TestHotel").click();
  await page.getByRole("button", { name: "Book now" }).click();

  await expect(page.getByText("Total Cost: £303.00")).toBeVisible();

  await page.waitForSelector("iframe", { timeout: 15000 });
  const stripeLocator = page.locator("iframe").first();
  const stripeFrame = await stripeLocator.contentFrame(); // Frame object
  if (!stripeFrame) throw new Error("Stripe iframe did not load in time");

  const cardNumber = stripeFrame.locator('[placeholder="Card number"]');
  await cardNumber.first().waitFor({ timeout: 10000 }); // Wait for field

  await cardNumber.fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("12/34");
  await stripeFrame.locator('[placeholder="CVC"]').fill("242");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("12345");

  await page.getByRole("button", { name: "Confirm Booking" }).click();

  await expect(page.getByText("Booking Saved!")).toBeVisible({
    timeout: 10000,
  });

  await page.getByRole("link", { name: "My Bookings" }).click();
  await expect(page.getByText("TestHotel")).toBeVisible({ timeout: 10000 });
});
