const findUp = require("find-up");
const fs = require("fs");
const json5 = require("json5");
const { parsers } =
  require("prettier/parser-babel") || require("prettier/parser-babylon");
const path = require("path");
const defaultConfig = require("./defaultConfig.js");

const parser = parsers["json-stringify"];

// sort any items
function sortAlphanumerically(target) {
  if (Array.isArray(target)) {
    return target.sort();
  }

  if (typeof target === "object" && target !== null) {
    const entries = Object.entries(target)
      .map(([k, v]) => [k, sortAlphanumerically(v)])
      .sort();
    return Object.fromEntries(entries);
  }

  return target;
}

exports.parsers = {
  "json-stringify": {
    ...parser,
    preprocess(text, options) {
      const configPath = findUp.sync(".fixpackrc", {
        cwd: path.dirname(options.filepath),
      });
      const config = configPath
        ? json5.parse(fs.readFileSync(configPath, "utf-8"))
        : defaultConfig;

      if (parser.preprocess) {
        text = parser.preprocess(text, options);
      }

      if (/(^|\\|\/)package.json/.test(options.filepath) && config.sortToTop) {
        const original = sortAlphanumerically(json5.parse(text));
        const transformed = {};

        // sort prioritized items
        for (const key of config.sortToTop) {
          transformed[key] = original[key];
          delete original[key];
        }

        // sort remaining
        for (const key in original) {
          transformed[key] = original[key];
        }

        text = JSON.stringify(transformed, null);
      }

      return text;
    },
  },
};
