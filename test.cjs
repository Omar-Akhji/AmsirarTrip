/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Simple integration test for AmsirarTrip application
 * Tests basic functionality and security headers
 */

const https = require("https");
const http = require("http");

// Configuration
const BASE_URL = "http://localhost:3000";
const TIMEOUT = 10000; // 10 seconds

// Test results
const results = {
  passed: 0,
  failed: 0,
  tests: [],
};

/**
 * Make HTTP request and return response
 */
function makeRequest(path, method = "GET") {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const protocol = url.protocol === "https:" ? https : http;

    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === "https:" ? 443 : 80),
      path: url.pathname + url.search,
      method,
      timeout: TIMEOUT,
    };

    const req = protocol.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });
    req.end();
  });
}

/**
 * Run a test case
 */
async function test(name, testFn) {
  try {
    await testFn();
    results.passed++;
    results.tests.push({ name, status: "✅ PASS" });
    console.log(`✅ ${name}`);
  } catch (error) {
    results.failed++;
    results.tests.push({ name, status: "❌ FAIL", error: error.message });
    console.error(`❌ ${name}`);
    console.error(`   ${error.message}`);
  }
}

/**
 * Assert helper
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log("\n🧪 AmsirarTrip Integration Tests\n");
  console.log("=".repeat(50));
  console.log("\n📋 Testing Application Routes...\n");

  // Test 1: Home page loads
  await test("Home page (/) returns 200", async () => {
    const res = await makeRequest("/");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.includes("<!DOCTYPE html"), "Response is not valid HTML");
  });

  // Test 2: English locale works
  await test("English locale (/en) returns 200", async () => {
    const res = await makeRequest("/en");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // Test 3: Tours page loads
  await test("Tours page (/en/tours) returns 200", async () => {
    const res = await makeRequest("/en/tours");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // Test 4: Tour detail page loads
  await test("Tour 1 page (/en/tours/1) returns 200", async () => {
    const res = await makeRequest("/en/tours/1");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // Test 5: Contact page loads
  await test("Contact page (/en/contact) returns 200", async () => {
    const res = await makeRequest("/en/contact");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // Test 6: API health check
  await test("API health endpoint (/api/health) returns 200", async () => {
    const res = await makeRequest("/api/health");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const json = JSON.parse(res.body);
    assert(json.ok === true, "Health check failed");
  });

  console.log("\n🔒 Testing Security Headers...\n");

  // Test 7: Security headers present on home page
  await test("Security headers present on home page", async () => {
    const res = await makeRequest("/en");
    const headers = res.headers;

    // Critical security headers
    assert(headers["x-content-type-options"], "Missing X-Content-Type-Options");
    assert(
      headers["x-content-type-options"] === "nosniff",
      'X-Content-Type-Options should be "nosniff"'
    );

    assert(headers["x-frame-options"], "Missing X-Frame-Options");
    assert(
      headers["x-frame-options"] === "DENY",
      'X-Frame-Options should be "DENY"'
    );

    assert(headers["referrer-policy"], "Missing Referrer-Policy");
    assert(
      headers["strict-transport-security"],
      "Missing Strict-Transport-Security"
    );

    // CSP should be present
    assert(
      headers["content-security-policy"],
      "Missing Content-Security-Policy"
    );
    assert(
      headers["content-security-policy"].includes("default-src 'self'"),
      "CSP should include default-src self"
    );
  });

  // Test 8: Security headers on API routes
  await test("Security headers present on API routes", async () => {
    const res = await makeRequest("/api/health");
    const headers = res.headers;

    assert(
      headers["x-content-type-options"] === "nosniff",
      "API missing X-Content-Type-Options"
    );
    assert(
      headers["x-frame-options"] === "DENY",
      "API missing X-Frame-Options"
    );
    assert(headers["cache-control"], "API missing Cache-Control");
  });

  // Test 9: CSP includes required domains
  await test("CSP allows required external resources", async () => {
    const res = await makeRequest("/en");
    const csp = res.headers["content-security-policy"];

    assert(csp.includes("google.com/recaptcha"), "CSP should allow reCAPTCHA");
    assert(
      csp.includes("kit.fontawesome.com"),
      "CSP should allow Font Awesome"
    );
    assert(csp.includes("frame-src"), "CSP should include frame-src directive");
  });

  console.log("\n📱 Testing Internationalization...\n");

  // Test 10: All locales work
  await test("All locales accessible (en, fr, de, es)", async () => {
    const locales = ["en", "fr", "de", "es"];
    for (const locale of locales) {
      const res = await makeRequest(`/${locale}`);
      assert(res.status === 200, `Locale ${locale} returned ${res.status}`);
    }
  });

  // Test 11: Invalid locale redirects
  await test("Invalid locale redirects properly", async () => {
    const res = await makeRequest("/invalid-locale");
    assert(
      res.status === 308 || res.status === 307 || res.status === 200,
      `Invalid locale should redirect or return 200, got ${res.status}`
    );
  });

  console.log("\n🗺️ Testing Sitemap...\n");

  // Test 12: Sitemap exists
  await test("Sitemap (/sitemap.xml) returns 200", async () => {
    const res = await makeRequest("/sitemap.xml");
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.includes("<?xml"), "Sitemap should be valid XML");
    assert(res.body.includes("urlset"), "Sitemap should contain urlset");
  });

  console.log("\n" + "=".repeat(50));
  console.log("\n📊 Test Summary\n");
  console.log(`Total Tests:  ${results.passed + results.failed}`);
  console.log(`✅ Passed:     ${results.passed}`);
  console.log(`❌ Failed:     ${results.failed}`);
  console.log(
    `Success Rate: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%`
  );

  if (results.failed > 0) {
    console.log("\n❌ Failed Tests:");
    results.tests
      .filter((t) => t.status === "❌ FAIL")
      .forEach((t) => console.log(`   - ${t.name}: ${t.error}`));
  }

  console.log("\n" + "=".repeat(50) + "\n");

  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch((error) => {
  console.error("\n💥 Test suite failed:", error.message);
  process.exit(1);
});
