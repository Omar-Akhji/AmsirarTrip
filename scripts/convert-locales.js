import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to convert flat keys to nested structure (recursive)
function flatToNested(flat) {
  const nested = {};

  for (const [key, value] of Object.entries(flat)) {
    // If value is an object, recursively process it
    if (value && typeof value === "object" && !Array.isArray(value)) {
      nested[key] = flatToNested(value);
      continue;
    }

    // If key contains dots, nest it
    if (key.includes(".")) {
      const parts = key.split(".");
      let current = nested;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (i === parts.length - 1) {
          // Last part - assign the value
          current[part] = value;
        } else {
          // Not the last part - ensure object exists
          if (
            !current[part] ||
            typeof current[part] !== "object" ||
            Array.isArray(current[part])
          ) {
            current[part] = {};
          }
          current = current[part];
        }
      }
    } else {
      // No dots in key, just assign
      nested[key] = value;
    }
  }

  return nested;
}

// Process all locale files
const localesDir = join(__dirname, "../public/locales");
const languages = ["en", "fr", "es", "de"];

languages.forEach((lang) => {
  const filePath = join(localesDir, lang, "common.json");

  try {
    // Read the current structure
    const data = JSON.parse(readFileSync(filePath, "utf8"));

    // Convert to fully nested structure
    const nestedData = flatToNested(data);

    // Write back to file with proper formatting
    writeFileSync(filePath, JSON.stringify(nestedData, null, 2), "utf8");

    console.log(`✓ Converted ${lang}/common.json`);
  } catch (error) {
    console.error(`✗ Error converting ${lang}/common.json:`, error.message);
  }
});

console.log("\nConversion complete!");
