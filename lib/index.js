const findUp = require("find-up");
const fs = require("fs");
const json5 = require("json5");
const { parsers } =
  require("prettier/parser-babel") || require("prettier/parser-babylon");
const { dirname } = require("path");
const defaultConfig = require("./defaultConfig.json");

const parser = parsers["json-stringify"];

// sort any items
function sortAlphanumerically(target) {
  if (Array.isArray(target)) return target.sort();

  if (typeof target === "object" && target !== null) {
    const entries = Object.entries(target)
      .map(([k, v]) => [k, sortAlphanumerically(v)])
      .sort();
    return Object.fromEntries(entries);
  }

  return target;
}

// collect config
function collectConfig(options) {
  const configPath = findUp.sync(".fixpackrc", {
    cwd: dirname(options.filepath),
  });

  return configPath
    ? json5.parse(fs.readFileSync(configPath, "utf-8"))
    : defaultConfig;
}

// sort package.json
function transform(text, config) {
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

  return JSON.stringify(transformed);
}

exports.parsers = {
  "json-stringify": {
    ...parser,
    preprocess(text, options) {
      const config = collectConfig(options);
      const isPackageJson = /(^|\\|\/)package.json/.test(options.filepath);

      if (parser.preprocess) text = parser.preprocess(text, options);
      if (isPackageJson && config.sortToTop) text = transform(text, config);

      return text;
    },
  },
};
