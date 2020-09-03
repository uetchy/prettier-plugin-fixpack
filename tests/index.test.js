const prettier = require("prettier");

const fixture = `
{
  "author": "",
  "version": "0.0.0",
  "description": "Pretiter plugin",
  "name": "prettier-plugin-fixpack",
  "main": "lib/index.js",
  "scripts": {
    "test": "jest"
  },
  "files": [
    "lib"
  ],
  "dependencies": {
    "json5": "^2.1.3",
    "find-up": "^5.0.0"
  },
  "peerDependencies": {
    "prettier": "^2.1.1"
  },
  "devDependencies": {
    "jest": "^26.4.2",
    "prettier": "^2.1.1",
    "release-it": "^13.6.6",
    "@release-it/conventional-changelog": "^1.1.4"
  },
  "homepage": "https://github.com/uetchy/prettier-plugin-fixpack",
  "repository": {
    "url": "https://github.com/uetchy/prettier-plugin-fixpack.git",
    "type": "git",
  },
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/uetchy/prettier-plugin-fixpack/issues"
  },
  "keywords": [
    "prettier-plugin",
    "prettier",
    "package.json",
  ],
  "b": 1,
  "a": 1,
  "engines": {
    "node": ">= 12.18.3"
  },
}
`;

it("sort", () => {
  expect(
    prettier.format(fixture, {
      filepath: "package.json",
      plugins: ["."],
    })
  ).toMatchSnapshot();
});
