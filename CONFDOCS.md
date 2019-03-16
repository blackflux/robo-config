# Codebase Configuration Documentation

Documents configuration managed by [robo-config](https://github.com/blackflux/robo-config) for this Codebase.

## `assorted/@npm-opensource`

Manage various configuration files for an open source npm github repo.

### circleci/npm-opensource:two-branch

_Updating `.circleci/config.yml` using `overwrite`._

- Restrictive two-branch [gally](https://github.com/loopmediagroup/gally#readme) config. Custom for npm open source packages.
- TODO

### gally/npm-opensource:two-branch

_Updating `.gally.json` using `overwrite`._

- Restrictive two-branch [gally](https://github.com/loopmediagroup/gally#readme) config. Custom for npm open source packages.
- TODO ...

### `badges/@npm-opensource`

Display various badges in README.

#### badges/js-gardener

_Updating `README.md` using `merge-below-title`._

- Display [js-gardener](https://github.com/blackflux/js-gardener) badge in README.

#### badges/semantic-release

_Updating `README.md` using `merge-below-title`._

- Display [semantic-release](https://github.com/semantic-release/semantic-release) badge in README.

#### badges/npm-downloads

_Updating `README.md` using `merge-below-title`._

- Display [npm downloads](https://www.npmjs.com/) badge in README.

#### badges/npm-status

_Updating `README.md` using `merge-below-title`._

- Display [npm status](https://www.npmjs.com/) badge in README.

#### badges/david-dm

_Updating `README.md` using `merge-below-title`._

- Display [david-dm.com](https://david-dm.org/) badge in README.

#### badges/dependabot

_Updating `README.md` using `merge-below-title`._

- Display [dependabot](https://dependabot.com/) badge in README.

#### badges/coveralls

_Updating `README.md` using `merge-below-title`._

- Display [coveralls](https://coveralls.io/) badge in README.

#### badges/circleci

_Updating `README.md` using `merge-below-title`._

- Display [circleci](https://circleci.com/) badge in README.

### `dependabot/@default-js`

Recommended base [dependabot configuration](https://dependabot.com/) for javascript projects.

#### dependabot/js-instant

_Updating `.dependabot/config.yml` using `overwrite`._

- Configure dependabot to instantly merge javascript dependency updates into the `dev` branch.

### `git/@default`

Recommended base configuration when using [git](https://en.wikipedia.org/wiki/Git).

#### git/gitignore

_Updating `.gitignore` using `merge-top`._

- Inject recommended entries into [gitignore file](https://help.github.com/en/articles/ignoring-files).
- Default ignores for JetBrains IDE.
- Default ignores for OSX
- Default ignores for NodeJs

### `license/@MIT-npm`

Recommended base configuration when using MIT License with npm.

#### license/MIT-LICENSE

_Updating `LICENSE` using `overwrite`._

- Generate [MIT license](https://en.wikipedia.org/wiki/MIT_License) file.

#### license/MIT-npm

_Updating `package.json` using `merge-shallow`._

- Link MIT license file into [npm](https://www.npmjs.com/) configuration.

### `npm/@default`

Recommended base configuration when using [npm](https://www.npmjs.com/).

#### npm/npmignore

_Updating `.npmignore` using `merge-top`._

- Inject comment into .npmignore explaining when to use it.

### `semantic-release/@default`

Recommended base configuration when using [semantic-release](https://github.com/semantic-release/semantic-release).

#### semantic-release/commit-conventions

_Updating `.releaserc.json` using `overwrite`._

- Slightly extended [release commit convention](https://github.com/semantic-release/semantic-release#commit-message-format) for semantic-release.

## `jetbrains/@default`

Recommended base configuration when using Jetbrains.

### jetbrains/exclude-coverage-folder

_Updating `.idea/${projectName}.iml` using `xml-merge`._

- Mark `coverage` Folder as excluded in Jetbrains.

## `editor/@default`

Recommended base [code editor configuration](https://editorconfig.org/).

### editor/two-space

_Updating `.editorconfig` using `overwrite`._

- Two space line indentation.
- Set `lf` line endings.
- Set `utf8` encoding.
- Remove unnecessary whitespaces.

