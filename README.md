# OWL

**! Note: This project is a draft which I quickly created while in school. Sorry to my teachers :) !**

> alternative GIT hook - MIT licensed.

- Like `husky`, without the lobbyism part.
- Purely written in JS.
- Better support for monorepos through [configuration file](#the-configuration-file).

[![@bbortt/owl](https://img.shields.io/npm/v/@bbortt/owl?label=@bbortt/owl)](https://www.npmjs.com/package/@bbortt/owl)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fbbortt%2Fowl.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fbbortt%2Fowl?ref=badge_shield)
[![Blazing Fast](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280)
[![License](https://img.shields.io/github/license/bbortt/owl)](https://github/bbortt/owl/blob/release/LICENSE)

# Installation

## Automated

Add `@bbortt/owl` and `@bbortt/owl-autoinstall` at the same time. The `postinstall` script in the second package will
take care of the setup.

## Manual

Install `@bbortt/owl` via `npm` or `yarn`. Execute the installation script to initialize the folder structure:

```shell
owl install
```

Add hooks using the `owl add` command (`help` for help). Example:

```shell
owl add pre-commit "npx pretty-quick --staged"
```

See [CLI](#cli) for more information.

# The configuration file

In order to support multiple commands on the same hook this project uses a configuration file. It stores information in
a readable JSON format and will be parsed at runtime. This does make it possible to configure hooks without using the
CLI too. [An example](https://github.com/bbortt/owl/blob/release/.owl/.owlrc.json):

```json
{
  "hooks": {
    "pre-commit": ["npx pretty-quick --staged"]
    // Add more hooks here or through CLI
  }
}
```

## Supported hooks

- `pre-commit`

More to come in #1.

# CLI

> // TODO: Add documentation

# License

This project is licensed under the terms of the [MIT license](https://github/bbortt/owl/blob/release/LICENSE).
