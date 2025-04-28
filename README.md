# FVTT-Infinity

Unofficial implementation of the Infinity RPG by Modiphius for FoundryVTT

## Building
FVTT-Infinity is set up as a fairly straightforward Vite project using Yarn as a package manager.

### Build
```sh
yarn build
```

### Lint (Oxlint + Stylelint)
```sh
yarn lint
```

### Format (Prettier)
```sh
yarn format
```

### Dev Server (Vite)
```sh
yarn dev
```

The dev server by default will assume Foundry is running on port `:30000`, and the Vite server will be on port `:30001`. You can edit the dev server details with the `VITE_PROXY_HOST`, `VITE_PROXY_PORT`, and `VITE_SERVER_PORT` environment variables.

## Contributing

All pull requests and forks must adhere to the following:

- Respect the FontAwesome licensing. If you don't have a seat on a FontAwesome license, do not use FontAwesome Pro icons in your contributions.
- If adapting code from other sources, you must update the "Further Licenses" section below to indicate its licensing and include an appropriately-placed license file where applicable.
- All contributions to this project, unless otherwise noted through licenses as mentioned above, fall under the project's MIT License.
- AI-generated code contributions are not permitted under any circumstances.
- Contributors who act in a bad faith, hateful, or otherwise harmful manner will be blocked from making future contributions. This includes notable behavior outside this system and its community.

## LICENSE
This codebase is licensed under the [**MIT License**](LICENSE).

#### foundryvtt/pf2e

> **License:** [Apache License 2.0](https://raw.githubusercontent.com/foundryvtt/pf2e/refs/heads/master/LICENSE)

Borrowed the HMR Helper in `vite.config.ts`. Was modified to just use Foundry's default HMR support for Handlebars template files and JSON translation files by copying changes over to dist/languages and dist/templates.

#### ⚠️ FontAwesome ⚠️

> **License:** [Proprietary](https://fontawesome.com/license)

There are a couple of important nuances to use of FontAwesome in this project.

> 1. The official FoundryVTT has a license to use and distribute FontAwesome Pro icons within their software. To my knowledge and based on information shared in the [FoundryVTT Discord Server](https://discord.gg/foundryvtt), this **_does not_** include systems developed for Foundry by third-party creators.
> 2. This system makes use of the FontAwesome Pro icons packaged with Foundry VTT. _This is allowable only because I have a FontAwesome Pro license._ No other seats are provided for contributors at this time.
>
> This means:
>
> 1. Contributors should not make use of FontAwesome Pro icons in the code they contribute to the project (because FontAwesome licenses are based on individual seats) unless they have a seat on a FontAwesome Pro license.
> 2. If you fork this project, you are responsible for either removing all uses of FontAwesome Pro icons, or purchasing an appropriate license.

## Copyright Disclaimer

This project, and the creator of this project, are unaffiliated with Modiphius and Corvus Belli. This is an unofficial, third-party system implementation built freely as a hobby project.
