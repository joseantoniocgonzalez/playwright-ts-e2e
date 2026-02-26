playwright-ts-e2e
===============

Playwright + TypeScript E2E automation portfolio repo using Page Object Model (POM), CI with GitHub Actions, and Playwright HTML report published to GitHub Pages (nightly).

Badges
------

.. image:: https://github.com/joseantoniocgonzalez/playwright-ts-e2e/actions/workflows/pr-smoke.yml/badge.svg
   :target: https://github.com/joseantoniocgonzalez/playwright-ts-e2e/actions/workflows/pr-smoke.yml
   :alt: PR - Smoke

.. image:: https://github.com/joseantoniocgonzalez/playwright-ts-e2e/actions/workflows/nightly-regression-pages.yml/badge.svg
   :target: https://github.com/joseantoniocgonzalez/playwright-ts-e2e/actions/workflows/nightly-regression-pages.yml
   :alt: Nightly - Regression + Publish Report

Reports
-------

- Latest nightly HTML report (GitHub Pages): https://joseantoniocgonzalez.github.io/playwright-ts-e2e/

Target under test
-----------------

This repo uses **Sauce Demo** (public demo site designed for automation):

- https://www.saucedemo.com/

The base URL is configured via ``BASE_URL``.

Configuration
-------------

Create a local ``.env`` based on the example::

  cp .env.example .env

Example::

  BASE_URL=https://www.saucedemo.com

To run against another target/environment, change ``BASE_URL`` accordingly.

Install
-------

::

  npm ci
  npx playwright install --with-deps

Run tests
---------

All tests::

  npm test

Smoke suite (filters by title tag)::

  npm run smoke

Regression suite (filters by title tag)::

  npm run regression

Tags and filtering
------------------

Tags are included in the test title as plain text:

- ``@smoke``
- ``@regression``

Filtering is done via Playwright CLI::

  playwright test --grep @smoke
  playwright test --grep @regression

Evidence on failure
-------------------

Configured in ``playwright.config.ts``:

- Screenshot: only on failure
- Trace: retained on failure

Open the last HTML report::

  npx playwright show-report

Lint / Format
-------------

::

  npm run lint
  npm run format
  npm run format:check

CI
--

- PR workflow runs ``@smoke`` and uploads artifacts (HTML report + test-results).
- Nightly workflow runs ``@regression``, uploads artifacts, and publishes the HTML report to GitHub Pages.

Progress
--------

- Base structure + TypeScript strict + Playwright config (baseURL via ``.env``).
- POM for Sauce Demo (login, inventory, cart, checkout).
- Smoke suite:
  - Healthcheck ``@smoke``
  - Login → Inventory ``@smoke``
  - Add to cart ``@smoke``
  - Checkout end-to-end ``@smoke``
- Regression suite:
  - Invalid login shows error ``@regression``
  - Locked out user cannot login ``@regression``
- CI:
  - PR: smoke
  - Nightly: regression + publish Pages report

GitHub CLI (optional)
---------------------

If you have GitHub CLI installed, you can clone the repository via SSH::

  gh repo clone joseantoniocgonzalez/playwright-ts-e2e -- --recurse-submodules=no
