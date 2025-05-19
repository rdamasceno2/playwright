import { Page, Locator, expect } from '@playwright/test';

export class MovieAppPage {
    readonly page: Page;
    readonly searchButton: Locator;
    readonly searchInput: Locator;
    readonly movieTitles: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchButton = page.getByRole('search');
        this.searchInput = page.getByRole('textbox', { name: 'Search Input' });
        this.movieTitles = page.getByRole('heading', { level: 2 });
    }

    async goto() {
        await this.page.goto('https://debs-obrien.github.io/playwright-movies-app');
    }

    async searchForMovie(movieName: string) {
        await this.searchButton.click();
        await this.searchInput.fill(movieName);
        await this.searchInput.press('Enter');
    }

    async verifyMovieInResults(movieTitle: string) {
        await expect(this.page).toHaveTitle(`${movieTitle} - Search Results`);
        await expect(this.page.getByRole('heading', { name: `The ${movieTitle} Movie`, level: 2 })).toBeVisible();
    }
}
