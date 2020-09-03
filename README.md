# prettier-plugin-fixpack

A (semi-)opinionated Prettier plugin that sort properties in `package.json` according to [`.fixpackrc`](https://github.com/HenrikJoreteg/fixpack).

## Use

```bash
npm install --save-dev prettier prettier-plugin-fixpack
# or
yarn add -D prettier prettier-plugin-fixpack
```

then:

```bash
prettier [--write] package.json
```

### Configuration

`.fixpackrc` is a JSON file consisting of the rules that define how `fixpack` organize your `package.json`.
If `.fixpackrc` is missing in both local (./.fixpackrc) and global (~/.fixpackrc), [default config](./lib/defaultConfig.js) will be used to format the file.

```json
{
  "sortToTop": ["name", "description", "version"]
}
```

## Contributing

See [Contributing guide](./CONTRIBUTING.md).
