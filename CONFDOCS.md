# Codebase Configuration Documentation

Documents configuration managed by [robo-config](https://github.com/blackflux/robo-config) for this Codebase.

## assorted/@npm-opensource

Manage various configuration files for an open source npm github repo.

### circleci/npm-opensource:two-branch

- Restrictive two-branch [gally](https://github.com/loopmediagroup/gally#readme) config. Custom for npm open source packages.
- TODO

### gally/npm-opensource:two-branch

- Restrictive two-branch [gally](https://github.com/loopmediagroup/gally#readme) config. Custom for npm open source packages.
- TODO ...

### badges/@npm-opensource

Display various badges in README.

#### badges/js-gardener

- Display [js-gardener](https://github.com/blackflux/js-gardener) badge in README.

#### badges/semantic-release

- Display [semantic-release](https://github.com/semantic-release/semantic-release) badge in README.

#### badges/npm-downloads

- Display [npm downloads](https://www.npmjs.com/) badge in README.

#### badges/npm-status

- Display [npm status](https://www.npmjs.com/) badge in README.

#### badges/david-dm

- Display [david-dm.com](https://david-dm.org/) badge in README.

#### badges/dependabot

- Display [dependabot](https://dependabot.com/) badge in README.

#### badges/coveralls

- Display [coveralls](https://coveralls.io/) badge in README.

#### badges/circleci

- Display [circleci](https://circleci.com/) badge in README.

### dependabot/@default-js

Recommended base [dependabot configuration](https://dependabot.com/) for javascript projects.

#### dependabot/js-instant

- Configure dependabot to instantly merge javascript dependency updates into the `dev` branch.

### git/@default

Recommended base configuration when using [git](https://en.wikipedia.org/wiki/Git).

#### git/gitignore

- Inject recommended entries into [gitignore file](https://help.github.com/en/articles/ignoring-files).
- Default ignores for JetBrains IDE.
- Default ignores for OSX
- Default ignores for NodeJs

### license/@MIT-npm

Recommended base configuration when using MIT License with npm.

#### license/MIT-LICENSE

- Generate [MIT license](https://en.wikipedia.org/wiki/MIT_License) file.

#### license/MIT-npm

- Link MIT license file into [npm](https://www.npmjs.com/) configuration.

### npm/@default

Recommended base configuration when using [npm](https://www.npmjs.com/).

#### npm/npmignore

- Inject comment into .npmignore explaining when to use it.

### semantic-release/@default

Recommended base configuration when using [semantic-release](https://github.com/semantic-release/semantic-release).

#### semantic-release/commit-conventions

- Slightly extended [release commit convention](https://github.com/semantic-release/semantic-release#commit-message-format) for semantic-release.

## jetbrains/@default

Recommended base configuration when using Jetbrains.

### jetbrains/exclude-coverage-folder

- Mark `coverage` Folder as excluded in Jetbrains.

## editor/@default

Recommended base [code editor configuration](https://editorconfig.org/).

### editor/two-space

- Two space line indentation.
- Set `lf` line endings.
- Set `utf8` encoding.
- Remove unnecessary whitespaces.

