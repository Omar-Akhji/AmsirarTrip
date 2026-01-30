#!/usr/bin/env npx tsx

/**
 * SEO Audit Script for Multilingual Websites
 *
 * Usage: npx tsx scripts/seo-audit.ts [sitemap-url] [--no-color]
 * Default: https://amsirartrip.com/sitemap.xml
 *
 * Comprehensive checks:
 * - HTTP status codes
 * - Canonical tag validation (exists, self-referencing, non-www)
 * - Hreflang tags (all languages, self-referencing, reciprocal)
 * - x-default (exists, unique, points to English)
 * - Noindex + crawlability validation
 */

// Types
interface PageData {
  url: string;
  status: number | string;
  canonical: string | null;
  hreflangs: Record<string, string>;
  hasNoindex: boolean;
  html: string;
}

interface CanonicalIssue {
  url: string;
  issue: string;
  canonical?: string;
}

interface HreflangIssue {
  url: string;
  issue: string;
  details?: string;
}

interface StatusIssue {
  url: string;
  status: number | string;
}

interface NoindexIssue {
  url: string;
  issue: string;
}

interface Issues {
  canonical: CanonicalIssue[];
  hreflang: HreflangIssue[];
  xDefault: HreflangIssue[];
  status: StatusIssue[];
  www: string[];
  noindex: NoindexIssue[];
}

interface Colors {
  reset: string;
  red: string;
  green: string;
  yellow: string;
  cyan: string;
  bold: string;
  dim: string;
}

// Configuration
const NO_COLOR: boolean = process.argv.includes("--no-color");
const args = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
const SITEMAP_URL: string = args[0] || "https://amsirartrip.com/sitemap.xml";
const ROBOTS_URL: string = new URL(
  "/robots.txt",
  SITEMAP_URL.replace("/sitemap.xml", "")
).href;
const EXPECTED_LANGUAGES: string[] = ["en", "fr", "es", "de"];
const BASE_URL = "https://amsirartrip.com";

// Colors
const colors: Colors = NO_COLOR
  ? { reset: "", red: "", green: "", yellow: "", cyan: "", bold: "", dim: "" }
  : {
      reset: "\x1b[0m",
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      cyan: "\x1b[36m",
      bold: "\x1b[1m",
      dim: "\x1b[2m",
    };

// Issue collectors
const issues: Issues = {
  canonical: [],
  hreflang: [],
  xDefault: [],
  status: [],
  www: [],
  noindex: [],
};

// Store all page data for reciprocal checks
const allPages: Map<string, PageData> = new Map();
let robotsTxtContent: string = "";

let totalPages = 0;
let checkedPages = 0;

/**
 * Fetch robots.txt content
 */
async function fetchRobotsTxt(): Promise<void> {
  try {
    const response = await fetch(ROBOTS_URL);
    if (response.ok) {
      robotsTxtContent = await response.text();
    }
  } catch {
    console.log(`${colors.dim}Could not fetch robots.txt${colors.reset}`);
  }
}

/**
 * Check if URL is blocked by robots.txt
 */
function isBlockedByRobotsTxt(url: string): boolean {
  if (!robotsTxtContent) return false;

  const urlPath = new URL(url).pathname;
  const lines = robotsTxtContent.split("\n");
  let currentUserAgent = "";
  let isBlocked = false;

  for (const line of lines) {
    const trimmed = line.trim().toLowerCase();

    if (trimmed.startsWith("user-agent:")) {
      currentUserAgent = trimmed.replace("user-agent:", "").trim();
    } else if (
      trimmed.startsWith("disallow:") &&
      (currentUserAgent === "*" || currentUserAgent === "googlebot")
    ) {
      const disallowPath = trimmed.replace("disallow:", "").trim();
      if (disallowPath && urlPath.startsWith(disallowPath)) {
        isBlocked = true;
      }
    } else if (
      trimmed.startsWith("allow:") &&
      (currentUserAgent === "*" || currentUserAgent === "googlebot")
    ) {
      const allowPath = trimmed.replace("allow:", "").trim();
      if (allowPath && urlPath.startsWith(allowPath)) {
        isBlocked = false;
      }
    }
  }

  return isBlocked;
}

/**
 * Parse XML sitemap and extract URLs
 */
async function parseSitemap(sitemapUrl: string): Promise<string[]> {
  console.log(`${colors.cyan}Fetching sitemap: ${sitemapUrl}${colors.reset}\n`);

  const response = await fetch(sitemapUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch sitemap: ${response.status} ${response.statusText}`
    );
  }

  const xml = await response.text();
  const urls: string[] = [];

  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match: RegExpExecArray | null;
  while ((match = locRegex.exec(xml)) !== null) {
    const url = match[1].trim();
    if (!url.endsWith(".xml")) {
      urls.push(url);
    }
  }

  return Array.from(new Set(urls));
}

/**
 * Extract canonical URL from HTML
 */
function extractCanonical(html: string): string | null {
  const match =
    html.match(
      /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*\/?>/i
    ) ||
    html.match(
      /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*\/?>/i
    );
  return match ? match[1] : null;
}

/**
 * Extract hreflang tags from HTML
 */
function extractHreflangTags(html: string): Record<string, string> {
  const hreflangs: Record<string, string> = {};

  // Multiple regex patterns to catch different attribute orders
  const patterns = [
    /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*\/?>/gi,
    /<link[^>]*hreflang=["']([^"']+)["'][^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*\/?>/gi,
    /<link[^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*rel=["']alternate["'][^>]*\/?>/gi,
    /<link[^>]*href=["']([^"']+)["'][^>]*hreflang=["']([^"']+)["'][^>]*rel=["']alternate["'][^>]*\/?>/gi,
    /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*\/?>/gi,
  ];

  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(html)) !== null) {
      // Determine which group is hreflang and which is href based on pattern
      if (match[1].startsWith("http") || match[1].startsWith("/")) {
        hreflangs[match[2]] = match[1];
      } else {
        hreflangs[match[1]] = match[2];
      }
    }
  }

  return hreflangs;
}

/**
 * Check if HTML has noindex
 */
function hasNoindex(html: string): boolean {
  const metaMatch = html.match(
    /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*\/?>/i
  );
  if (metaMatch && metaMatch[1].toLowerCase().includes("noindex")) {
    return true;
  }

  const googleBotMatch = html.match(
    /<meta[^>]*name=["']googlebot["'][^>]*content=["']([^"']+)["'][^>]*\/?>/i
  );
  if (googleBotMatch && googleBotMatch[1].toLowerCase().includes("noindex")) {
    return true;
  }

  return false;
}

/**
 * Check if URL uses www
 */
function usesWww(url: string): boolean {
  return url.includes("://www.");
}

/**
 * Normalize URL for comparison
 */
function normalizeUrl(url: string): string {
  return url.replace(/\/$/, "");
}

/**
 * Get the base path without locale prefix
 */
function getBasePath(url: string): string {
  const urlObj = new URL(url);
  let path = urlObj.pathname;

  // Remove locale prefix
  for (const lang of EXPECTED_LANGUAGES) {
    if (path.startsWith(`/${lang}/`) || path === `/${lang}`) {
      path = path.substring(lang.length + 1) || "/";
      break;
    }
  }

  return path;
}

/**
 * Check a single page
 */
async function checkPage(url: string): Promise<void> {
  checkedPages++;
  const progress = `[${checkedPages}/${totalPages}]`;

  try {
    // Check for www in sitemap URL
    if (usesWww(url)) {
      issues.www.push(url);
    }

    const response = await fetch(url, {
      headers: { "User-Agent": "SEO-Audit-Bot/1.0" },
      redirect: "follow",
    });

    // Check status code
    if (response.status !== 200) {
      issues.status.push({ url, status: response.status });
      console.log(
        `${progress} ${colors.red}X${colors.reset} ${url} (HTTP ${response.status})`
      );
      return;
    }

    const html = await response.text();
    const canonical = extractCanonical(html);
    const hreflangs = extractHreflangTags(html);
    const pageHasNoindex = hasNoindex(html);

    // Store page data for reciprocal checks
    allPages.set(url, {
      url,
      status: response.status,
      canonical,
      hreflangs,
      hasNoindex: pageHasNoindex,
      html,
    });

    let pageHasIssues = false;

    // === CANONICAL CHECKS ===
    if (!canonical) {
      issues.canonical.push({ url, issue: "Missing canonical tag" });
      pageHasIssues = true;
    } else {
      if (usesWww(canonical)) {
        issues.canonical.push({ url, issue: "Canonical uses www", canonical });
        pageHasIssues = true;
      }
      if (normalizeUrl(canonical) !== normalizeUrl(url)) {
        issues.canonical.push({
          url,
          issue: `Not self-referencing`,
          canonical,
        });
        pageHasIssues = true;
      }
    }

    // === HREFLANG CHECKS ===
    const foundLangs = Object.keys(hreflangs).filter((l) => l !== "x-default");

    if (foundLangs.length === 0) {
      issues.hreflang.push({ url, issue: "Missing all hreflang tags" });
      pageHasIssues = true;
    } else {
      // Check for missing languages
      const missingLangs = EXPECTED_LANGUAGES.filter(
        (lang) => !hreflangs[lang]
      );
      if (missingLangs.length > 0) {
        issues.hreflang.push({
          url,
          issue: `Missing hreflang for: ${missingLangs.join(", ")}`,
        });
        pageHasIssues = true;
      }

      // Check self-referencing hreflang
      const urlLang = url.includes("/fr/")
        ? "fr"
        : url.includes("/es/")
          ? "es"
          : url.includes("/de/")
            ? "de"
            : "en";
      const selfHreflang = hreflangs[urlLang];
      if (selfHreflang && normalizeUrl(selfHreflang) !== normalizeUrl(url)) {
        issues.hreflang.push({
          url,
          issue: `hreflang[${urlLang}] not self-referencing`,
          details: `Points to ${selfHreflang}`,
        });
        pageHasIssues = true;
      }

      // Check for www in hreflang URLs
      for (const [lang, hrefUrl] of Object.entries(hreflangs)) {
        if (usesWww(hrefUrl)) {
          issues.hreflang.push({
            url,
            issue: `hreflang[${lang}] uses www`,
            details: hrefUrl,
          });
          pageHasIssues = true;
        }
      }
    }

    // === X-DEFAULT CHECKS ===
    const xDefaultCount = Object.keys(hreflangs).filter(
      (k) => k === "x-default"
    ).length;
    if (!hreflangs["x-default"]) {
      issues.xDefault.push({ url, issue: "Missing x-default" });
      pageHasIssues = true;
    } else {
      // Check x-default points to English version
      const xDefaultUrl = hreflangs["x-default"];
      const basePath = getBasePath(url);
      const expectedXDefault = `${BASE_URL}${basePath}`;

      if (normalizeUrl(xDefaultUrl) !== normalizeUrl(expectedXDefault)) {
        // Allow if x-default points to the English version path
        const xDefaultPath = new URL(xDefaultUrl).pathname;
        if (
          xDefaultPath.startsWith("/fr/") ||
          xDefaultPath.startsWith("/es/") ||
          xDefaultPath.startsWith("/de/")
        ) {
          issues.xDefault.push({
            url,
            issue: "x-default should point to English version",
            details: `Points to ${xDefaultUrl}`,
          });
          pageHasIssues = true;
        }
      }

      if (xDefaultCount > 1) {
        issues.xDefault.push({
          url,
          issue: "Multiple x-default tags found",
        });
        pageHasIssues = true;
      }
    }

    // === NOINDEX CHECKS ===
    if (pageHasNoindex) {
      if (isBlockedByRobotsTxt(url)) {
        issues.noindex.push({
          url,
          issue:
            "Has noindex but is blocked by robots.txt (noindex won't be seen)",
        });
        pageHasIssues = true;
      }
    }

    if (pageHasIssues) {
      console.log(`${progress} ${colors.yellow}!${colors.reset} ${url}`);
    } else {
      console.log(`${progress} ${colors.green}OK${colors.reset} ${url}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    issues.status.push({ url, status: `Error: ${errorMessage}` });
    console.log(
      `${progress} ${colors.red}X${colors.reset} ${url} (${errorMessage})`
    );
  }
}

/**
 * Check reciprocal hreflang links
 */
function checkReciprocalHreflangs(): void {
  console.log(
    `\n${colors.cyan}Checking reciprocal hreflang links...${colors.reset}\n`
  );

  for (const [url, pageData] of allPages) {
    for (const [lang, targetUrl] of Object.entries(pageData.hreflangs)) {
      if (lang === "x-default") continue;

      const targetPage =
        allPages.get(normalizeUrl(targetUrl)) || allPages.get(targetUrl);

      if (!targetPage) {
        // Target page not in our dataset - might be OK if it's a different locale
        continue;
      }

      // Check if target page links back
      const urlLang = url.includes("/fr/")
        ? "fr"
        : url.includes("/es/")
          ? "es"
          : url.includes("/de/")
            ? "de"
            : "en";

      const backLink = targetPage.hreflangs[urlLang];
      if (!backLink) {
        issues.hreflang.push({
          url,
          issue: `Missing reciprocal link from ${lang} version`,
          details: `${targetUrl} doesn't link back to ${urlLang} version`,
        });
      } else if (normalizeUrl(backLink) !== normalizeUrl(url)) {
        issues.hreflang.push({
          url,
          issue: `Reciprocal link mismatch`,
          details: `${targetUrl} links to ${backLink} instead of ${url}`,
        });
      }
    }
  }
}

/**
 * Print final report
 */
function printReport(): void {
  console.log("\n" + "=".repeat(80));
  console.log(`${colors.bold}${colors.cyan}SEO AUDIT REPORT${colors.reset}`);
  console.log("=".repeat(80) + "\n");

  const totalIssues =
    issues.canonical.length +
    issues.hreflang.length +
    issues.xDefault.length +
    issues.status.length +
    issues.www.length +
    issues.noindex.length;

  console.log(`Total pages checked: ${totalPages}`);
  console.log(`Total issues found: ${totalIssues}\n`);

  // Status Errors
  if (issues.status.length > 0) {
    console.log(
      `${colors.red}${colors.bold}[HTTP ERRORS] (${issues.status.length}):${colors.reset}`
    );
    issues.status.forEach(({ url, status }) => {
      console.log(`  - ${url}`);
      console.log(`    Status: ${status}`);
    });
    console.log();
  }

  // WWW URLs
  if (issues.www.length > 0) {
    console.log(
      `${colors.red}${colors.bold}[WWW URLS IN SITEMAP] (${issues.www.length}):${colors.reset}`
    );
    issues.www.forEach((url) => console.log(`  - ${url}`));
    console.log();
  }

  // Canonical Issues
  if (issues.canonical.length > 0) {
    console.log(
      `${colors.yellow}${colors.bold}[CANONICAL ISSUES] (${issues.canonical.length}):${colors.reset}`
    );
    issues.canonical.forEach(({ url, issue, canonical }) => {
      console.log(`  - ${url}`);
      console.log(`    Issue: ${issue}`);
      if (canonical) console.log(`    Canonical: ${canonical}`);
    });
    console.log();
  }

  // Hreflang Issues
  if (issues.hreflang.length > 0) {
    console.log(
      `${colors.yellow}${colors.bold}[HREFLANG ISSUES] (${issues.hreflang.length}):${colors.reset}`
    );
    issues.hreflang.forEach(({ url, issue, details }) => {
      console.log(`  - ${url}`);
      console.log(`    Issue: ${issue}`);
      if (details) console.log(`    Details: ${details}`);
    });
    console.log();
  }

  // x-default Issues
  if (issues.xDefault.length > 0) {
    console.log(
      `${colors.yellow}${colors.bold}[X-DEFAULT ISSUES] (${issues.xDefault.length}):${colors.reset}`
    );
    issues.xDefault.forEach(({ url, issue, details }) => {
      console.log(`  - ${url}`);
      console.log(`    Issue: ${issue}`);
      if (details) console.log(`    Details: ${details}`);
    });
    console.log();
  }

  // Noindex Issues
  if (issues.noindex.length > 0) {
    console.log(
      `${colors.yellow}${colors.bold}[NOINDEX ISSUES] (${issues.noindex.length}):${colors.reset}`
    );
    issues.noindex.forEach(({ url, issue }) => {
      console.log(`  - ${url}`);
      console.log(`    Issue: ${issue}`);
    });
    console.log();
  }

  // Summary
  console.log("=".repeat(80));
  if (totalIssues === 0) {
    console.log(
      `${colors.green}${colors.bold}[PASS] All SEO checks passed! No issues found.${colors.reset}`
    );
  } else {
    console.log(
      `${colors.yellow}${colors.bold}[ATTENTION] Found ${totalIssues} issue(s) that need attention.${colors.reset}`
    );
  }
  console.log("=".repeat(80) + "\n");
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log("\n" + "=".repeat(80));
  console.log(
    `${colors.bold}${colors.cyan}SEO AUDIT TOOL - Multilingual Website Validator${colors.reset}`
  );
  console.log("=".repeat(80) + "\n");

  try {
    // Fetch robots.txt first
    await fetchRobotsTxt();

    const urls = await parseSitemap(SITEMAP_URL);
    totalPages = urls.length;

    console.log(`Found ${totalPages} URLs in sitemap\n`);
    console.log("Checking pages...\n");

    // Process URLs with concurrency limit
    const CONCURRENCY = 3;
    for (let i = 0; i < urls.length; i += CONCURRENCY) {
      const batch = urls.slice(i, i + CONCURRENCY);
      await Promise.all(batch.map((url) => checkPage(url)));
    }

    // Check reciprocal hreflangs after all pages are fetched
    checkReciprocalHreflangs();

    printReport();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`${colors.red}Error: ${errorMessage}${colors.reset}`);
    process.exit(1);
  }
}

main();
