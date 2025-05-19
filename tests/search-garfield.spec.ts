import { test } from '@playwright/test';
import { MovieAppPage } from '../pageobjects_ts/MovieAppPage';

test('search for Garfield movie', async ({ page }) => {
  const movieApp = new MovieAppPage(page);
  
  // Navigate to movie app homepage
  await movieApp.goto();

  // Search for Garfield movie
  await movieApp.searchForMovie('Garfield');

  // Verify Garfield movie appears in results
  await movieApp.verifyMovieInResults('Garfield');
});
