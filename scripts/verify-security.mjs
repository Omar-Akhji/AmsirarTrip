import http from "http";
import https from "https";

const BASE_URL = process.argv[2] || process.env.BASE_URL || "http://localhost:3000";

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

function log(type, message) {
  const color =
    type === "success"
      ? colors.green
      : type === "error"
        ? colors.red
        : colors.blue;
  console.log(`${color}[${type.toUpperCase()}]${colors.reset} ${message}`);
}

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || "GET",
      headers: options.headers || {},
    };

    const client = url.protocol === "https:" ? https : http;

    const req = client.request(url, reqOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on("error", reject);

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runTests() {
  console.log(
    `${colors.yellow}Starting Security Verification Tests...${colors.reset}\n`
  );
  let passed = 0;
  let failed = 0;

  async function assert(name, condition, message) {
    if (condition) {
      log("success", `${name}: ${message}`);
      passed++;
    } else {
      log("error", `${name}: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Test Security Headers
    console.log(
      `\n${colors.blue}--- Testing Security Headers ---${colors.reset}`
    );
    const homeRes = await request("/");

    await assert(
      "CSP",
      !!homeRes.headers["content-security-policy"],
      "Content-Security-Policy header should exist"
    );
    await assert(
      "CSP Map Allowed",
      homeRes.headers["content-security-policy"].includes(
        "https://www.google.com"
      ),
      "CSP should allow google.com"
    );
    await assert(
      "X-Frame-Options",
      homeRes.headers["x-frame-options"] === "DENY" ||
      homeRes.headers["x-frame-options"] === "SAMEORIGIN",
      "X-Frame-Options should be DENY or SAMEORIGIN"
    );
    await assert(
      "X-Content-Type-Options",
      homeRes.headers["x-content-type-options"] === "nosniff",
      "X-Content-Type-Options should be nosniff"
    );
    await assert(
      "HSTS",
      !!homeRes.headers["strict-transport-security"],
      "Strict-Transport-Security should be present"
    );

    // 2. Test Bot Protection
    console.log(
      `\n${colors.blue}--- Testing Bot Protection ---${colors.reset}`
    );
    const botRes = await request("/", {
      headers: { "User-Agent": "curl/7.64.1" },
    });
    await assert(
      "Block Bad Bot",
      botRes.statusCode === 403,
      `Should block 'curl' user agent (Got ${botRes.statusCode})`
    );

    const goodBotRes = await request("/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    await assert(
      "Allow Normal User",
      goodBotRes.statusCode === 200,
      `Should allow normal user agent (Got ${goodBotRes.statusCode})`
    );

    // 3. Test CSRF / Origin
    console.log(
      `\n${colors.blue}--- Testing CSRF Protection ---${colors.reset}`
    );

    // Note: We need a valid API route to test. Using /api/booking as per context, assuming it exists.
    // If it doesn't, we might get 404, which is fine as long as it's not 403 for the wrong reason,
    // but middleware checks happen before 404 usually if path matches.
    // Middleware checks /api/ paths.

    const evilOriginRes = await request("/api/booking", {
      method: "POST",
      headers: {
        Origin: "https://evil.com",
        Host: "localhost:3000",
      },
    });
    await assert(
      "Block Invalid Origin",
      evilOriginRes.statusCode === 403,
      `Should block POST with invalid Origin (Got ${evilOriginRes.statusCode})`
    );

    // const noOriginRes = await request("/api/booking", {
    //   method: "POST",
    //   headers: {
    //     // No origin, no referer
    //     Host: "localhost:3000",
    //   },
    // });
    // Middleware logic: if origin && host ... else if referer && host ...
    // If neither, it might pass or fail depending on strictness.
    // Looking at middleware:
    // if (origin && host) { ... } else if (referer && host) { ... }
    // It doesn't explicitly block if BOTH are missing in the provided snippet?
    // Wait, let's check the snippet again.
    // It only checks IF they exist. So if I send neither, it might pass?
    // That's a potential finding.

    const validOriginRes = await request("/api/booking", {
      method: "POST",
      headers: {
        Origin: "http://localhost:3000",
        Host: "localhost:3000",
      },
    });
    // It might return 400 or 404 or 500 or 200, but NOT 403 from the middleware.
    await assert(
      "Allow Valid Origin",
      validOriginRes.statusCode !== 403,
      `Should allow POST with valid Origin (Got ${validOriginRes.statusCode})`
    );
  } catch (error) {
    console.error(
      `${colors.red}Fatal Error running tests:${colors.reset}`,
      error.message
    );
    if (error.code === "ECONNREFUSED") {
      console.error(
        `${colors.yellow}Is the server running on port 3000?${colors.reset}`
      );
    }
  }

  console.log(
    `\n${colors.yellow}Summary: ${passed} Passed, ${failed} Failed${colors.reset}`
  );
}

runTests();
