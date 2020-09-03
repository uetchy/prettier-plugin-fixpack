# prettier-plugin-fixpack

[![npm](https://badgen.net/npm/v/prettier-plugin-fixpack)][npm-url]
[![npm: total downloads](https://badgen.net/npm/dt/prettier-plugin-fixpack)][npm-url]
[![Actions Status: test](https://github.com/uetchy/prettier-plugin-fixpack/workflows/test/badge.svg)](https://github.com/uetchy/prettier-plugin-fixpack/actions?query=test)

[npm-url]: https://npmjs.org/package/prettier-plugin-fixpack

A (semi-)opinionated Prettier plugin that sort properties in `package.json` according to [`.fixpackrc`](https://github.com/HenrikJoreteg/fixpack).

## Use

```bash
npm install -g prettier prettier-plugin-fixpack
# or
yarn global add prettier prettier-plugin-fixpack
```

then:

```bash
prettier [--write] package.json
```

### Configuration

`.fixpackrc` is a JSON file consisting of the rules that define how `fixpack` organize your `package.json`.
If `.fixpackrc` is missing in both local (./.fixpackrc) and global (~/.fixpackrc), [default config](./lib/defaultConfig.js) will be used to format the file.

## Contributing

See [Contributing guide](./CONTRIBUTING.md).

## Roadmap

- [ ] Support fixpack config other than `sortToTop`
- [ ] More tests
