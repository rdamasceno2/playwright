// @ts-check
import { test, expect } from '@playwright/test';


test('invalid login', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await page.fill('#username', 'rahulshetty');
  await page.fill('#password', 'learning');
  await page.click('#signInBtn');
  // option 1 for validation
  const textContent = await page.locator("[style*='block']").textContent()
  await expect(textContent).toBe('Incorrect username/password.');
  //option 2
  await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');


});
test('valid login', async ({ page }) => {
  const cardTitles = page.locator('.card-body a');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('#password', 'learning');
  await page.click('#signInBtn');
  await expect(page).toHaveTitle("ProtoCommerce");
  const first_element = await cardTitles.first().textContent()
  const second_elements = await cardTitles.nth(1).textContent()
  const all_Titles = await cardTitles.allTextContents();
  console.log(all_Titles)
});

test('UI controls', async ({ page }) => {
  const documentLink = page.locator("[href*='documents-request']");
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  // Locate the dropdown
  const dropdown = page.locator("select.form-control");

  // Wait for the dropdown to be visible
  await dropdown.waitFor({ state: 'visible' });

  // Select the option with value "consult"
  await dropdown.selectOption({ value: "consult" });

  // Optionally verify the selection
  const selectedValue = await dropdown.inputValue();
  console.log(`Selected value: ${selectedValue}`);
  await expect(selectedValue).toContain('consult');

  const selectedOptionText = await dropdown.locator('option:checked').innerText();
  console.log(`Selected value: ${selectedOptionText}`);
  await expect(selectedOptionText).toContain('Consultant');
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click()
  expect(page.locator(".radiotextsty").last()).toBeChecked();

  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect( await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute("class","blinkingText") 
});

test('@Child windows hadl', async ({browser})=>
  {
     const context = await browser.newContext();
     const page =  await context.newPage();
     const userName = page.locator('#username');
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     const documentLink = page.locator("[href*='documents-request']");
 
     const [newPage]= await Promise.all(
    [
       context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
       documentLink.click(),
    
    ])//new page is opened






    const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").textContent());

 
  });



