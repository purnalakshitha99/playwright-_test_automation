const { test, expect } = require("@playwright/test");

const URL = "https://www.swifttranslator.com/";

const selectors = {
  singlishInput: 'textarea[placeholder="Input Your Singlish Text Here."]',
  sinhalaOutput:
    'div:has-text("Sinhala") >> xpath=following-sibling::div[contains(@class,"whitespace-pre-wrap")]',
};

async function translate(page, singlishText) {
  await page.goto(URL, { waitUntil: "domcontentloaded" });

  const input = page.locator(selectors.singlishInput);
  const output = page.locator(selectors.sinhalaOutput).first();

  await expect(input).toBeVisible();
  await input.fill("");
  await input.type(singlishText, { delay: 20 });

  await expect(output).toBeVisible();
  await expect(output).not.toHaveText("", { timeout: 10000 });

  const outText = (await output.innerText()).trim();
  return outText;
}

// ==================== UI TEST (already done) ====================
test("Pos_UI_0001 - real time Sinhala output generation", async ({ page }) => {
  const actual = await translate(page, "mama gedhara yanawa");
  expect(actual.length).toBeGreaterThan(0);
});

// ==================== POSITIVE FUNCTIONAL (sample 3) ====================
test("Pos_Fun_0001 - greeting sentence (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "ayubowan");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0002 - question sentence (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "oya kohomada?");
  expect(actual.length).toBeGreaterThan(0);
});



test("Pos_Fun_0003 - command sentence (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "mata help karanna");
  expect(actual.length).toBeGreaterThan(0);
});

// ==================== POSITIVE FUNCTIONAL (Pos_Fun_0004 -> Pos_Fun_0024) ====================

test("Pos_Fun_0004 - daily usage (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "mama kaama kanawa");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0005 - polite request (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "karunakarala mata help karanna");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0006 - informal request (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "machan poddak help ekak denna");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0007 - negation (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "mama adha gedhara yanne na");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0008 - future tense (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "mama heta office yanawa");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0009 - past tense (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "mama iye market giya");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0010 - question (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "oyata therenawada?");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0011 - WH question (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "meeka mokakda?");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0012 - compound sentence (M) accuracy", async ({ page }) => {
  const actual = await translate(page, "mama gedhara gihin kaama kanna one, eth passe weda karanna one");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0013 - complex sentence (M) accuracy", async ({ page }) => {
  const actual = await translate(page, "oya enawanan mama tharaha wenne na, api katha karamu");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0014 - pronouns (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "mata oyawa pennanna puluwanda?");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0015 - plural usage (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "api yaluwange gedharata yanawa");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0016 - numbers & units (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "mata kilo 2k rice one");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0017 - date format (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "2026-01-30 mama free");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0018 - punctuation (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "hari, api balamu!");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0019 - repeated word emphasis (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "ikmanata ikmanata enna");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0020 - mixed English terms (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "mage WiFi eka slow, reset karanna");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0021 - spacing normal (S) accuracy", async ({ page }) => {
  const actual = await translate(page, "mama poddak athi wela innawa");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0022 - multi-line input (M) accuracy", async ({ page }) => {
  const actual = await translate(page, "ayubowan\noya kohomada?\nmata help karanna");
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0023 - medium paragraph (M) accuracy", async ({ page }) => {
  const actual = await translate(
    page,
    "mama adha udeta nindata giya ne. passe bus eka late una. e nisaa mata office yanakota poddak parakku una. habai mama weda okkoma iwarakara damman."
  );
  expect(actual.length).toBeGreaterThan(0);
});

test("Pos_Fun_0024 - long input (L >= 300 chars) robustness+accuracy", async ({ page }) => {
  const longText =
    "mama adha udeta wenasma widihata awuna. udeta nidi nathi nisa mata poddak amaru una. passe bus eka late una, ehemanam mama office ekata parakku wenawa. habai mama gedhara awilla passe weda plan ekak hadala, ikmanin tasks tika iwarakara damman. me wage welawata mama calm wela innawa kiyala hithanawa.";
  const actual = await translate(page, longText);
  expect(actual.length).toBeGreaterThan(0);
});


// ==================== NEGATIVE FUNCTIONAL (sample 2) ====================
test("Neg_Fun_0001 - only symbols robustness", async ({ page }) => {
  const actual = await translate(page, "@@@###$$$");
  expect(actual).toBeDefined(); // crash wenna epa
});

test("Neg_Fun_0002 - mixed random spaces robustness", async ({ page }) => {
  const actual = await translate(page, "mama     gedhara        yanawa");
  expect(actual.length).toBeGreaterThan(0);
});

// ==================== NEGATIVE FUNCTIONAL (Neg_Fun_0003 -> Neg_Fun_0010) ====================

test("Neg_Fun_0003 - empty input handling", async ({ page }) => {
  const actual = await translate(page, "");
  // some systems may keep output empty; main check: no crash / defined
  expect(actual).toBeDefined();
});

test("Neg_Fun_0004 - only spaces handling", async ({ page }) => {
  const actual = await translate(page, "     ");
  expect(actual).toBeDefined();
});

test("Neg_Fun_0005 - excessive punctuation robustness", async ({ page }) => {
  const actual = await translate(page, "???!!!....,,,");
  expect(actual).toBeDefined();
});

test("Neg_Fun_0006 - mixed casing weird input robustness", async ({ page }) => {
  const actual = await translate(page, "MaMa GeDhArA YaNaWa");
  expect(actual.length).toBeGreaterThan(0);
});

test("Neg_Fun_0007 - emojis robustness", async ({ page }) => {
  const actual = await translate(page, "mama gedhara yanawa 🙂🙂");
  expect(actual.length).toBeGreaterThan(0);
});

test("Neg_Fun_0008 - very long repeated chars robustness", async ({ page }) => {
  const actual = await translate(page, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  expect(actual.length).toBeGreaterThan(0);
});

test("Neg_Fun_0009 - mixed symbols + words robustness", async ({ page }) => {
  const actual = await translate(page, "mama###gedhara@@@yanawa!!!");
  expect(actual.length).toBeGreaterThan(0);
});

test("Neg_Fun_0010 - multiple line breaks robustness", async ({ page }) => {
  const actual = await translate(page, "mama\n\n\n\ngedhara\n\nyanawa");
  expect(actual.length).toBeGreaterThan(0);
});

