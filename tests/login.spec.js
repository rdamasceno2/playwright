const { test, expect } = require('@playwright/test');

test.describe('Login Scenarios', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/client');
    });

    test('LOGIN_001 - Valid Login', async ({ page }) => {
        await page.fill('#userEmail', 'damasceno999@gmail.com');
        await page.fill('#userPassword', 'Learning1');
        await page.click('#login');
        
        // Verify redirect and welcome message
        await expect(page.locator('.left.mt-1 p')).toHaveText('Automation Practice');
    });

    test('LOGIN_002 - Invalid Email Format', async ({ page }) => {
        await page.fill('#userEmail', 'invalidemail');
        await page.fill('#userPassword', 'Learning1');
        await page.click('#login');
        
        // Verify error message
        const errorMessage = page.locator('[class*="invalid-feedback"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Email');
    });

    test('LOGIN_003 - Invalid Password', async ({ page }) => {
        await page.fill('#userEmail', 'damasceno999@gmail.com');
        await page.fill('#userPassword', 'WrongPass123');
        await page.click('#login');
        
        // Verify error message
        const errorToast = page.locator('[aria-label="Incorrect email or password."]');
        await expect(errorToast).toBeVisible();
    });

    test('LOGIN_004 - Empty Email Field', async ({ page }) => {
        await page.fill('#userPassword', 'Learning1');
        await page.click('#login');
        
        // Verify error message
        const errorMessage = page.locator('[class*="invalid-feedback"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Email is required');
    });

    test('LOGIN_005 - Empty Password Field', async ({ page }) => {
        await page.fill('#userEmail', 'damasceno999@gmail.com');
        await page.click('#login');
        
        // Verify error message
        const errorMessage = page.locator('[class*="invalid-feedback"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Password is required');
    });

    test('LOGIN_006 - Both Fields Empty', async ({ page }) => {
        await page.click('#login');
        
        // Verify error messages
        const errorMessages = page.locator('[class*="invalid-feedback"]');
        await expect(errorMessages).toHaveCount(2);
        await expect(errorMessages).toContainText(['Email is required', 'Password is required']);
    });

    test('LOGIN_007 - Special Characters in Email', async ({ page }) => {
        await page.fill('#userEmail', 'test@#$%@test.com');
        await page.fill('#userPassword', 'Learning1');
        await page.click('#login');
        
        // Verify error message
        const errorMessage = page.locator('[class*="invalid-feedback"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Enter Valid Email');
    });
});
