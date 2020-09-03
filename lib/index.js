const fs = require("fs");
const path = require("path");
const findUp = require("find-up");
const json5 = require("json5");
const { parsers } =
  require("prettier/parser-babel") || require("prettier/parser-babylon");
const defaultConfig = require("./defaultConfig.js");

const parser = parsers["json-stringify"];

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
        const original = json5.parse(text);
        const transformed = {};
        for (const key of config.sortToTop) {
          transformed[key] = original[key];
          delete original[key];
        }
        for (const key in original) {
          transformed[key] = original[key];
        }
        text = JSON.stringify(transformed, null);
      }

      return text;
    },
  },
};
