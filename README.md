<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h1>Playwright Automation Framework</h1>
      <h2 margin-top: 0px>TypeScript • Playwright • Github Actions • MySQL • Allure Reports • MySQL</h2>
    </summary>
  </ul>
</div>

<p>A modern test automation framework demonstrating practical SDET / QA Automation Engineering concepts including Page Object Model architecture, custom Playwright fixtures, REST API automation, MySQL database validation, data-driven testing, cross-browser execution, parallel testing, Allure reporting, and continuous integration with GitHub Actions.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🚀 Project Highlights </h2>
    </summary>
  </ul>
</div>

<ul>
  <li>Playwright + TypeScript test automation</li>
  <li>Page Object Model (POM) architecture</li>
  <li>Custom Playwright fixtures for dependency injection</li>
  <li>REST API automation using Playwright APIRequestContext</li>
  <li>Reusable API client architecture through APIManager</li>
  <li>MySQL database validation using mysql2</li>
  <li>Data-driven testing using external test data</li>
  <li>Tagged test suites for Smoke, Regression, API, and Database testing</li>
  <li>Cross-browser execution with Chromium, Firefox, and WebKit</li>
  <li>Parallel test execution using Playwright workers</li>
  <li>CI retry handling</li>
  <li>Playwright tracing for failure investigation</li>
  <li>Playwright HTML + Allure reporting</li>
  <li>GitHub Actions CI/CD</li>
  <li>CI report artifacts</li>
  <li>Environment-based configuration for sensitive database credentials</li>
</ul>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🛠 Technology Stack </h2>
    </summary>
  </ul>
</div>

| Technology | Purpose |
| :--- | :--- |
| Playwright | UI, browser, and API automation |
| TypeScript | Type-safe framework and test development |
| Node.js / npm | Runtime and dependency management |
| Playwright Test | Test runner, assertions, fixtures, retries, and parallel execution |
| Page Object Model | Reusable UI abstraction |
| Custom Playwright Fixtures | Framework dependency injection |
| APIRequestContext | REST API testing |
| MySQL / mysql2 | Database connectivity and validation |
| JSON / TypeScript Test Data | External test-data management |
| Allure Report | Detailed test execution reporting |
| Playwright HTML Report | Native execution and debugging report |
| GitHub Actions | Continuous integration |
| Git / GitHub | Version control and project hosting |

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🏗 Framework Architecture </h2>
    </summary>
  </ul>
</div>

<p>The project follows the Page Object Model (POM) design pattern and uses custom Playwright fixtures to separate test logic from page interactions, API clients, and framework-level dependencies.</p>

```text
PlaywrightAutomation
|
│   package.json
|   playwright.config.ts
|   tsconfig.json
│   README.md
│
├───.github
|   └───workflows
│         playwright.yml
│
├───api
│      APIManager.ts
│      [API client classes]
│
├───fixtures
|       testFixtures.ts
|
├───helpers
|       [shared helper utilities]
|
├───pageObjects
│   ├───client-booking
|   |     POManager.ts
|   |     [booking application page objects]
|   |
|   └───client-orders
|         POManager.ts
|         [order application page objects]
|
├───test-data
|       [test data files]
|
├───tests
|   ├───api
|   |     [API test files]
|   |
|   ├───client-booking
|   |     [booking test files]
|   |
|   ├───client-orders
|   |     [order test files]
|   |
|   └───database
|         [database validation files]
|
└───utils
        DatabaseUtils.ts
```

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🧱 Page Object Model </h2>
    </summary>
  </ul>
</div>

<p>UI automation is implemented using the <b>Page Object Model</b>.</p>

<p>Individual page classes encapsulate:</p>

<ul>
  <li>Playwright locators</li>
  <li>Page-specific actions</li>
  <li>Navigation</li>
  <li>Reusable UI workflows</li>
  <li>Page state exposed for test assertions</li>
</ul>

<p>Instead of tests directly containing repeated locator and browser logic:</p>

```text
const loginPage = bookingPOManager.getLoginPage();

await loginPage.goTo();
await loginPage.validLogin(username, password);

expect(await loginPage.browseEventsIsDisplayed()).toBeTruthy();
```
<p>This keeps test specifications readable while reducing duplicated UI implementation.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>📌 Multiple Application Page Object Managers</h2>
    </summary>
  </ul>
</div>

<p>The project contains separate Page Object Managers for different web applications represented by the test framework.</p>

<p>Each manager is responsible only for the pages belonging to its application.</p>

```text
                   Custom Fixture
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
      Booking POManager       Orders POManager
```

<p>This prevents unrelated page objects from being combined into a single large manager and keeps multi-application automation organized.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🧩 Custom Playwright Fixtures</h2>
    </summary>
  </ul>
</div>

<p>The framework extends Playwright's built-in fixture system to provide framework dependencies directly to tests.</p>

<p>Instead of manually constructing managers in every test:</p>

```text
const apiManager = new APIManager(request);
const poManager = new POManager(page);
```
<p>tests request the dependencies they need:</p>

```text
test('Example Test', async ({
    bookingPOManager,
    apiManager
}) => {
    // Managers are initialized by Playwright fixtures.
});
```

<p>The fixture layer handles creation of framework objects using Playwright's native page and request fixtures.</p>

```text
               Playwright Fixtures
                       │
              ┌────────┴────────┐
              ▼                 ▼
            page             request
              │                 │
              ▼                 ▼
          POManager         APIManager
              │                 │
              ▼                 ▼
         Page Objects       API Clients
```
<p>This provides:</p>

<ul>
  <li>Dependency injection</li>
  <li>Less object-construction code inside tests</li>
  <li>Consistent manager initialization</li>
  <li>Cleaner test specifications</li>
  <li>Playwright-managed lifecycle</li>
  <li>Reusable framework dependencies</li>
</ul>

<p>Tests only initialize fixtures they actually request.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🌐 REST API Automation</h2>
    </summary>
  </ul>
</div>

<p>The framework contains a dedicated API automation layer built using Playwright's APIRequestContext.</p>

<p>Reusable API clients encapsulate endpoint-specific HTTP operations.</p>

```text
                     API Test
                        │
                        ▼
                    APIManager
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
         Login Client        Booking/Event
                                Clients
              │                   │
              └─────────┬─────────┘
                        ▼
                     REST API
```
<p>API coverage demonstrates:</p>

<ul>
  <li>Authentication</li>
  <li>GET requests</li>
  <li>POST requests</li>
  <li>DELETE requests</li>
  <li>HTTP status-code validation</li>
  <li>JSON response validation</li>
  <li>Dynamic resource ID handling</li>
  <li>API test-data creation</li>
  <li>API cleanup</li>
  <li>API-driven setup for UI tests</li>
</ul>

<p>Example:</p>

```text
const loginClient = apiManager.getLoginClient();

const token = await loginClient.getAuthToken(
    data.username,
    data.password
);

const bookingClient = apiManager.getBookingClient();

const response = await bookingClient.createBooking(
    data.eventId,
    data.customerName,
    data.customerEmail,
    data.customerPhone,
    1,
    token
);

expect(response.status()).toBe(201);
```
<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🔄 UI + API End-to-End Testing</h2>
    </summary>
  </ul>
</div>

<p>The framework can combine API and UI automation within the same test.</p>

<p>For example, a booking can be created directly through the REST API and subsequently validated through the browser:</p>

```text
              REST API
                 │
                 ▼
          Create Booking
                 │
                 ▼
           Booking ID
                 │
                 ▼
              Browser
                 │
                 ▼
          My Bookings Page
                 │
                 ▼
       Validate Booking / Refund
```
<p>This demonstrates testing across application layers rather than treating UI and API automation as completely independent test suites.</p>

<p>API-driven test setup can also reduce unnecessary browser interactions and improve test execution efficiency.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🗄️ MySQL Database Validation</h2>
    </summary>
  </ul>
</div>

<p>The framework integrates directly with a MySQL database using the mysql2 Promise API.</p>

<p>A reusable database utility manages connection pooling and strongly typed query execution.</p>

<p>Database tests can compare persisted records with data returned through the application's API:</p>

```text
              REST API
                 │
                 ▼
            JSON Response
                 │
                 ├─── Compare
                 |
                 ▼
          MySQL Database
```
<p>Example validation flow:</p>

```text
      Authenticate through API
                 │
                 ▼
       Retrieve event records
                 │
                 ▼
        Query MySQL database
                 |
                 ▼
        Match records by ID
                 |
                 ▼
Validate database values against API response
```
<p>This demonstrates validation beyond the UI layer and verifies consistency between backend services and persisted application data.</p>

<p>**Database tests require access to a configured MySQL environment and are separated from tests that can run independently in GitHub-hosted CI.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>📊 Data-Driven Testing</h2>
    </summary>
  </ul>
</div>

<p>Test data is separated from test implementation and reused across automated scenarios.</p>

```text
              Test Data
                  │
                  ▼
         Parameterized Tests
             /     |     \
            ▼      ▼      ▼
         Dataset Dataset Dataset
            1      2      3
```
<p>This allows the same workflow to execute against multiple users, products, events, bookings, or validation scenarios without duplicating test logic.</p>

<p>Benefits include:</p>

<ul>
  <li>Reduced duplication</li>
  <li>Easier test maintenance</li>
  <li>Clear separation of test logic and test data</li>
  <li>Scalable scenario coverage</li>
</ul>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🏷️ Tagged Test Suites</h2>
    </summary>
  </ul>
</div>

<p>Tests are organized using Playwright tags.</p>
<p>Current suite organization includes tags such as:</p>

<ul>
  <li>@smoke</li>
  <li>@regression</li>
  <li>@api</li>
  <li>@database</li>
</ul>

<p>Tests may belong to multiple suites:</p>

```text
test.describe(
    'API Ticket Refund Test',
    { tag: ['@api', '@regression'] },
    () => {
        // tests
    }
);
```
<p>Individual tests can add more targeted classification:</p>

```text
test(
    'API Successful Refund Test',
    { tag: ['@smoke'] },
    async ({ apiManager, bookingPOManager }) => {
        // test
    }
);
```
<p>This provides flexible suite selection without maintaining external suite definition files.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🌍 Cross-Browser Testing</h2>
    </summary>
  </ul>
</div>

<p>The framework supports cross-browser execution through Playwright projects.</p>

<p>Configured browser engines include:</p>

<ul>
  <li>Chromium</li>
  <li>Firefox</li>
  <li>WebKit</li>
</ul>

<p>This allows the same test suite to validate application behavior across multiple browser engines without duplicating test code.</p>

<p>Example:</p>

```text
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```
<p>Suite and browser selection can also be combined:</p>

```text
npm run test:regression -- --project=firefox
```
<p>This keeps browser configuration independent from test-suite organization.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>⚡ Parallel Test Execution</h2>
    </summary>
  </ul>
</div>

<p>Playwright provides native parallel execution using independent workers.</p>
<p>The framework takes advantage of isolated browser contexts so tests can execute concurrently without sharing browser session state.</p>
<p>Worker configuration can differ between:</p>

```text
Worker configuration can differ between:

Local Development
        │
        ▼
Available local workers

        vs.

GitHub Actions
        │
        ▼
CI-specific worker configuration
```
<p>This provides faster execution while maintaining test isolation.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🔁 Retry Handling</h2>
    </summary>
  </ul>
</div>

<p>Retry behavior is configured through Playwright rather than custom retry listeners.</p>
<p>For example:</p>

```text
retries: process.env.CI ? 2 : 0
```
<p>This allows failed tests to retry automatically in CI while keeping local failures immediately visible during development.</p>
<p>Retries also integrate with Playwright tracing to provide additional debugging evidence for intermittent failures.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🔍 Playwright Trace Viewer</h2>
    </summary>
  </ul>
</div>

<p>Playwright tracing is enabled to assist with failure investigation.</p>
<p>Trace information can contain:</p>

<ul>
  <li>Browser actions</li>
  <li>DOM snapshots</li>
  <li>Network requests</li>
  <li>Console activity</li>
  <li>Screenshots</li>
  <li>Execution timeline</li>
</ul>

<p>This provides significantly more debugging context than a failure screenshot alone.</p>
<p>Trace files can be inspected using Playwright's Trace Viewer.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>📈 Test Reporting</h2>
    </summary>
  </ul>
</div>

<p>The framework provides both Playwright-native and third-party reporting.</p>

<h3>Playwright HTML Report</h3>

<p>Playwright's HTML reporter provides an interactive execution report containing:</p>

<ul>
  <li>Passed tests</li>
  <li>Failed tests</li>
  <li>Skipped tests</li>
  <li>Execution duration</li>
  <li>Failure stack traces</li>
  <li>Retry information</li>
  <li>Test attachments</li>
  <li>Trace information</li>
</ul>

<p>The report can be viewed locally using:</p>

```text
npm run report
```
<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>📊 Allure Report</h2>
    </summary>
  </ul>
</div>

<p>The framework also integrates Allure Playwright for richer execution reporting.</p>
<p>Allure provides:</p>

<ul>
  <li>Test status and organization</li>
  <li>Suite information</li>
  <li>Execution duration</li>
  <li>Failure details</li>
  <li>Test steps</li>
  <li>Parameters</li>
  <li>Attachments</li>
  <li>Historical reporting capabilities</li>
  <li>Playwright integration metadata</li>
</ul>

<p>Playwright execution produces raw Allure data in:</p>

```text
allure-results/
```
<p>The raw results are converted into a generated report:</p>

```text
The raw results are converted into a generated report:

allure-results/
       │
       ▼
allure generate
       │
       ▼
allure-report/
```
<p>Generate the report using:</p>

```text
npm run allure:generate
```

<p>The generated report should be served through a web server or opened through the Allure CLI rather than opening index.html directly through the browser's file:// protocol.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>⚙️ Continuous Integration — GitHub Actions</h2>
    </summary>
  </ul>
</div>

<p>The framework uses GitHub Actions for automated CI execution.</p>

<p>The pipeline performs the following workflow:</p>

```text
The pipeline performs the following workflow:

             Push / Pull Request
                     │
                     ▼
               GitHub Actions
                     │
                     ▼
             Checkout Repository
                     │
                     ▼
              Configure Node.js
                     │
                     ▼
                  npm ci
                     │
                     ▼
        Install Playwright Browsers
                     │
                     ▼
               Execute Tests
                     │
             ┌───────┴───────┐
             ▼               ▼
      Playwright Report   Allure Results
             │               │
             │               ▼
             │        Generate Allure Report
             │               │
             └───────┬───────┘
                     ▼
              Upload Artifacts
```
<p>Automated CI execution helps verify that tests run successfully outside the local development environment.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>Manual Workflow Execution</h2>
    </summary>
  </ul>
</div>

<p>GitHub Actions also supports manually triggered executions using <b>workflow_dispatch</b>.</p>

<p>This allows test execution to be configured from the GitHub Actions interface using parameters such as:</p>

```text
Test Suite
    +
Browser Project

For example:

Regression + Chromium

Smoke + Firefox

API + Chromium
```

<p>This provides a CI experience similar to a parameterized automation pipeline while remaining native to GitHub.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>📦 CI Test Artifacts</h2>
    </summary>
  </ul>
</div>

<p>GitHub Actions preserves test reports after pipeline execution.</p>

<p>Generated artifacts include:</p>

```text
playwright-report/
allure-report/
```
<p>Reports are configured to remain available even when tests fail, provided the workflow itself was not cancelled.</p>

<p>This is important because failed CI runs are precisely when screenshots, traces, stack traces, and detailed reports are most valuable.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🔐 Environment Configuration</h2>
    </summary>
  </ul>
</div>

<p>Sensitive configuration such as database credentials is supplied through environment variables rather than being hard-coded into the framework.</p>

<p>Example local configuration:</p>

```text
DB_HOST=localhost
DB_PORT=3306
DB_NAME=qadb
DB_USERNAME=your_username
DB_PASSWORD=your_password
```
<p>The local <b>.env</b> file is excluded from source control.</p>

<p>This keeps credentials separate from automation code and allows different environments to provide their own configuration.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>▶️ Running the Framework</h2>
    </summary>
  </ul>
</div>

<h3>Prerequisites</h3>

<p>Install:</p>

<ul>
  <li>Node.js</li>
  <li>npm</li>
  <li>Git</li>
</ul>

<p>MySQL is only required when executing database-specific tests.</p>

<hr>

<h3>Clone the Repository</h3>

```text
git clone https://github.com/mrdcs92/PlaywrightAutomation.git
cd PlaywrightAutomation
```
<hr>

<h3>Install Dependencies</h3>

```text
npm ci
```

<p>Install Playwright browser binaries:</p>

```text
npx playwright install
```

<hr>

<h3>Run Tests</h3>

<p>Run the default test configuration:</p>

```text
npm test
```

<p>Run in headed mode:</p>

```text
npm run test:headed
```

<p>Launch Playwright UI Mode:</p>

```text
npm run test:ui
```

<p>Run the regression suite:</p>

```text
npm run test:regression
```

<p>Run API tests:</p>

```text
npm run test:api
```

<p>Run database tests:</p>

```text
npm run test:database
```

<hr>

<h3>Run Against a Specific Browser</h3>

<p>Chromium:</p>

```text
npm run test:regression -- --project=chromium
```

<p>Firefox:</p>

```text
npm run test:regression -- --project=firefox
```

<p>WebKit:</p>

```text
npm run test:regression -- --project=webkit
```

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🧪 Example End-to-End Test Flow</h2>
    </summary>
  </ul>
</div>

<p>One of the framework's test patterns combines API setup with UI validation.</p>

```text
APIManager
    │
    ▼
Authenticate
    │
    ▼
Create Booking
    │
    ▼
Receive Booking Reference
    │
    ▼
bookingPOManager
    │
    ▼
Login through UI
    │
    ▼
Navigate to My Bookings
    │
    ▼
Locate API-created Booking
    │
    ▼
Open Event Details
    │
    ▼
Validate Refund Eligibility
```

<p>This demonstrates how the framework can use the fastest or most appropriate layer for test setup while still validating the application's user-facing behavior.</p>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🎯 Skills Demonstrated</h2>
    </summary>
  </ul>
</div>

<p>This repository demonstrates practical experience with:</p>

<h3>Test Automation</h3>

<ul>
  <li>Playwright</li>
  <li>TypeScript</li>
  <li>End-to-end UI testing</li>
  <li>Cross-browser automation</li>
  <li>Positive and negative testing</li>
  <li>Data-driven testing</li>
  <li>Parallel test execution</li>
  <li>Retry strategies</li> 
</ul>

<h3>Framework Design</h3>

<ul>
  <li>Page Object Model</li>
  <li>Multiple application Page Object Managers</li>
  <li>Custom Playwright fixtures</li>
  <li>Dependency injection</li>
  <li>Separation of concerns</li>
  <li>Reusable framework components</li>
  <li>Strong TypeScript typing</li>
</ul>

<h3>Backend Testing</h3>

<ul>
  <li>REST API automation</li>
  <li>API client abstraction</li>
  <li>Authentication handling</li>
  <li>HTTP response validation</li>
  <li>JSON response validation</li>
  <li>API-driven test setup and cleanup</li>
  <li>MySQL database validation</li>
  <li>Cross-layer API/database validation</li>
</ul>

<h3>CI/CD & Reporting</h3>

<ul>
  <li>GitHub Actions</li>
  <li>Automated CI execution</li>
  <li>Parameterized manual workflows</li>
  <li>Playwright HTML reporting</li>
  <li>Allure reporting</li>
  <li>CI artifact preservation</li>
  <li>Playwright traces</li>
  <li>Failure investigation</li>
</ul>

<h3>Development Tools</h3>

<ul>
  <li>Node.js</li>
  <li>npm</li>
  <li>Git</li>
  <li>GitHub</li>
  <li>Environment variables</li>
  <li>MySQL</li>
</ul>

<hr>

<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h2>🔮 Potential Future Improvements</h2>
    </summary>
  </ul>
</div>

<p>The framework can continue to expand with additional modern test-engineering capabilities.</p>

<h3>Authentication State Reuse</h3>

<p>Implement Playwright storageState for tests that require an authenticated session but are not specifically validating the login workflow.</p>

<h3>Containerized Execution</h3>

<p>Add Docker support to create a reproducible automation environment that can run consistently across developer machines and CI infrastructure.</p>

<h3>Published Allure Reports</h3>

<p>Publish generated Allure reports through GitHub Pages so the latest automation results can be viewed directly from the repository without downloading the GitHub Actions artifact.</p>

<hr>

