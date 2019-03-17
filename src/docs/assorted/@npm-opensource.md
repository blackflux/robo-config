## `assorted/@npm-opensource.json`

Manage various configuration files for an open source npm github repo.

<details>
  <summary>Details</summary>

### `badges/@npm-opensource`

Display various badges in README.

  <details>
    <summary>Details</summary>

#### badges/js-gardener

_Updating `README.md` using `merge-below-title`._

_Requires `js-gardener`._

- Display [js-gardener](https://github.com/blackflux/js-gardener) badge in README.

#### badges/semantic-release

_Updating `README.md` using `merge-below-title`._

_Requires `semantic-release`._

- Display [semantic-release](https://github.com/semantic-release/semantic-release) badge in README.

#### badges/npm-downloads

_Updating `README.md` using `merge-below-title`._

_Requires `npm-published`._

- Display [npm downloads](https://www.npmjs.com/) badge in README.

#### badges/npm-status

_Updating `README.md` using `merge-below-title`._

_Requires `npm-published`._

- Display [npm status](https://www.npmjs.com/) badge in README.

#### badges/david-dm

_Updating `README.md` using `merge-below-title`._

_Requires `david-dm`._

- Display [david-dm.com](https://david-dm.org/) badge in README.

#### badges/dependabot

_Updating `README.md` using `merge-below-title`._

_Requires `dependabot`._

- Display [dependabot](https://dependabot.com/) badge in README.

#### badges/coveralls

_Updating `README.md` using `merge-below-title`._

_Requires `coveralls`._

- Display [coveralls](https://coveralls.io/) badge in README.

#### badges/circleci

_Updating `README.md` using `merge-below-title`._

_Requires `circleci`._

- Display [circleci](https://circleci.com/) badge in README.

  </details>

### `dependabot/@default-js`

Recommended base [dependabot configuration](https://dependabot.com/) for javascript projects.

  <details>
    <summary>Details</summary>

#### dependabot/js-instant

_Updating `.dependabot/config.yml` using `overwrite`._

_Requires `dependabot`, `github`, `javascript`._

- Configure dependabot to instantly merge javascript dependency updates into the `dev` branch.

  </details>

### `git/@default`

Recommended base configuration when using [git](https://en.wikipedia.org/wiki/Git).

  <details>
    <summary>Details</summary>

#### git/gitignore

_Updating `.gitignore` using `merge-top`._

_Requires `git`._

- Inject recommended entries into [gitignore file](https://help.github.com/en/articles/ignoring-files).
- Default ignores for JetBrains IDE.
- Default ignores for OSX
- Default ignores for NodeJs

  </details>

### `license/@MIT-npm`

Recommended base configuration when using MIT License with npm.

  <details>
    <summary>Details</summary>

#### license/MIT-LICENSE

_Updating `LICENSE` using `overwrite`._

- Generate [MIT license](https://en.wikipedia.org/wiki/MIT_License) file.

#### license/MIT-npm

_Updating `package.json` using `merge-shallow`._

_Requires `npm`._

- Link MIT license file into [npm](https://www.npmjs.com/) configuration.

  </details>

### `npm/@default`

Recommended base configuration when using [npm](https://www.npmjs.com/).

  <details>
    <summary>Details</summary>

#### npm/npmignore

_Updating `.npmignore` using `merge-top`._

_Requires `npm`._

- Inject comment into .npmignore explaining when to use it.

  </details>

### `semantic-release/@default`

Recommended base configuration when using [semantic-release](https://github.com/semantic-release/semantic-release).

  <details>
    <summary>Details</summary>

#### semantic-release/commit-conventions

_Updating `.releaserc.json` using `overwrite`._

_Requires `semantic-release`._

- Slightly extended [release commit convention](https://github.com/semantic-release/semantic-release#commit-message-format) for semantic-release.

  </details>

### circleci/npm-opensource:two-branch

_Updating `.circleci/config.yml` using `overwrite`._

_Requires `npm`, `yarn`, `gally`, `github`, `circleci`, `coveralls`, `dependabot`, `semantic-release`._

- Restrictive two-branch [gally](https://github.com/loopmediagroup/gally#readme) config. Custom for npm open source packages.
- TODO

### gally/npm-opensource:two-branch

_Updating `.gally.json` using `overwrite`._

_Requires `circleci`, `gally`, `github`._

- Restrictive two-branch [gally](https://github.com/loopmediagroup/gally#readme) config. Custom for npm open source packages.
- TODO ...

</details>

