# OWL

**! Note: This project is a draft which I quickly created while in school. Sorry to my teachers :) !**

> pure JS GIT hook library

&plus; MIT Licensed. \
&plus; Configuration as code: Stored in readable JSON format. \
&plus; Written in pure JS.

[![@bbortt/owl](https://img.shields.io/npm/v/@bbortt/owl?label=@bbortt/owl)](https://www.npmjs.com/package/@bbortt/owl)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fbbortt%2Fowl.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fbbortt%2Fowl?ref=badge_shield)
[![Blazing Fast](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280)
[![License](https://img.shields.io/github/license/bbortt/owl)](https://github/bbortt/owl/blob/release/LICENSE)

# Installation

Once downloaded you need to install the binary and initialize the configuration. Follow the steps below, and you will be
good to go in seconds!

## Scripts

### Automated

Add `@bbortt/owl` and `@bbortt/owl-autoinstall` at the same time. The `postinstall` script in the second package will
take care of installing the scripts in `.owl`.

### Manual

Install `@bbortt/owl` via `npm` or `yarn` and execute the installation script to initialize the folder structure:

```shell
owl install
```

## Initialization

You can create a compatible rc file by hand or via `owl init` (see the [documentation](#init)). Add hooks using
the `owl add` command (`help` for help), or by hand too. Example:

```shell
owl add pre-commit "npx pretty-quick --staged"
```

Take a look at [configuration files](#configuration-files) or the [CLI documentation](#cli) for more information.

# Configuration files

In order to support multiple commands in the same hook this project reads configuration files
via [`cosmiconfig`](https://github.com/davidtheclark/cosmiconfig). \
This does make it possible to configure hooks without using the [CLI](#cli)
too. [An example](https://github.com/bbortt/owl/blob/release/.owlrc.json):

```json
{
  "hooks": {
    "pre-commit": ["npx pretty-quick --staged"]
  }
}
```

## Supported hooks

- `pre-commit`

More to come in #1.

# CLI

The following commands are accessible through the cli `owl`:

## `install`

Signature: `owl install [folder]`.

Installs the binary into `.owl`. **Careful:** Do not manually update the generated files. They will be overwritten by
any subsequent calls of this command (for example in a `postinstall` script).

## `init`

Signature: `owl add init`.

Initializes a configuration file called `.owlrc.json` in the root directory. It does not contain any hooks.

## `add`

Signature: `owl add [HOOK-TYPE] [HOOK]`.

Adds a hook by type into any found configuration file. E.g.
the [`.owlrc.json`](https://github.com/bbortt/owl/blob/release/.owlrc.json) was completed
using `owl add pre-commit "ngx pretty-quick --staged"`. \
Supported hooks are: [ `pre-commit` ].

# License

This project is licensed under the terms of the [MIT license](https://github/bbortt/owl/blob/release/LICENSE).
