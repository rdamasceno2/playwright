# 🎭 Playwright Automation Project

This repository contains an end-to-end (E2E) test automation framework built with [Playwright](https://playwright.dev/), designed for cross-browser testing of web applications.

---

## 📁 Project Structure

```bash
playwright/
├── .github/workflows/        # GitHub Actions CI workflows
├── allure-report/            # Allure test reports
├── allure-results/           # Allure raw result files
├── pageobjects/              # Page Object Model (POM) classes (JavaScript)
├── pageobjects_ts/           # Page Object Model (POM) classes (TypeScript)
├── tests/                    # Test cases
├── utils/                    # JavaScript utility functions
├── utils-tyscript/           # TypeScript utility functions
├── playwright.config.js      # Playwright configuration
├── playwright.config1.js     # Alternate config
├── package.json              # Project metadata
├── package-lock.json         # Dependency lock file
├── state.json                # Auth/session state
├── screenshot.png            # Sample screenshot
├── partialScreenshot.png     # Partial screenshot
└── .gitignore                # Git ignore rules
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

### 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rdamasceno2/playwright.git
   cd playwright
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

---

## 🧪 Running Tests

- Run all tests:

  ```bash
  npx playwright test
  ```

- Run a specific test file:

  ```bash
  npx playwright test tests/example.spec.js
  ```

- Run tests with a specific configuration:

  ```bash
  npx playwright test --config=playwright.config1.js
  ```

---

## 📊 Generating Allure Reports

1. Run tests and generate Allure results:

   ```bash
   npx playwright test --reporter=allure-playwright
   ```

2. Generate and open the Allure report:

   ```bash
   npx allure generate allure-results --clean -o allure-report
   npx allure open allure-report
   ```

---

## 🛠️ Project Highlights

- **Page Object Model (POM):** Organized page interactions in `pageobjects/` and `pageobjects_ts/`.
- **Utilities:** Reusable functions in `utils/` and `utils-tyscript/`.
- **Cross-Browser Testing:** Runs on Chromium, Firefox, and WebKit.
- **Continuous Integration:** GitHub Actions workflows in `.github/workflows/`.
- **Reporting:** Allure integration for detailed test reports.

---

## 🤝 Contributing

Contributions are welcome!  
Please fork the repository, create a feature branch, and submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
