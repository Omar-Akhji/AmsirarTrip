/* eslint-disable @typescript-eslint/no-require-imports */
const { PurgeCSS } = require("purgecss");
const fs = require("fs");
const path = require("path");

// quick arg parsing without extra deps
const rawMode = process.argv.find((a) => a.startsWith("--mode="));
const mode = (rawMode ? rawMode.split("=")[1] : "detect").toLowerCase();

const projectRoot = path.resolve(__dirname, "..");
const cssFile = path.join(projectRoot, "src", "App.css");
const outPurged = path.join(projectRoot, "src", "App.purged.css");
const reportFile = path.join(projectRoot, "purge-report.json");

// Look for classes/usages in sources + index.html
const contentFiles = [
  path.join(projectRoot, "index.html"),
  path.join(projectRoot, "src", "**", "*.{js,jsx,ts,tsx}"),
  path.join(projectRoot, "public", "**", "*.html"),
];

async function run() {
  if (!fs.existsSync(cssFile)) {
    console.error("✖ src/App.css not found — aborting");
    process.exit(1);
  }

  console.log(`Running PurgeCSS in ${mode} mode. This will analyze ${cssFile}`);

  try {
    const purgecss = new PurgeCSS();
    const results = await purgecss.purge({
      content: contentFiles,
      css: [cssFile],
      rejected: true,
      safelist: [
        // keep Font Awesome and similar icon helpers
        /^fa-/,
        /^fab-/,
        /^far-/,
        /^fas-/,
        /^fak-/,
        // data attributes and stateful names
        /\[data-.*\]/,
        /(^|\/)active$/,
        /(^|\/)open$/,
      ],
    });

    if (!results || !results.length) {
      console.log("No results from PurgeCSS.");
      return;
    }

    const r = results[0];

    // Write the extracted CSS to a separate file so you can inspect first.
    fs.writeFileSync(outPurged, r.css, "utf8");

    const report = {
      source: cssFile,
      originalSize: fs.statSync(cssFile).size,
      purgedSize: Buffer.byteLength(r.css, "utf8"),
      removedSelectors: r.rejected || [],
      timestamp: new Date().toISOString(),
    };

    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), "utf8");

    console.log(
      `✓ Purged CSS written to ${path.relative(projectRoot, outPurged)}`
    );
    console.log(
      `✓ Report written to ${path.relative(projectRoot, reportFile)}`
    );
    console.log(`  Original size: ${report.originalSize} bytes`);
    console.log(`  Purged size: ${report.purgedSize} bytes`);
    console.log(`  Selectors removed: ${report.removedSelectors.length}`);

    if (mode === "apply") {
      const backup = cssFile + ".bak." + Date.now();
      fs.copyFileSync(cssFile, backup);
      fs.copyFileSync(outPurged, cssFile);
      console.log(
        `Applied purged css — original backed up to ${path.relative(projectRoot, backup)}`
      );
    }
  } catch (err) {
    console.error(
      "Error while running PurgeCSS:",
      err && err.stack ? err.stack : err
    );
    process.exit(1);
  }
}

run();
