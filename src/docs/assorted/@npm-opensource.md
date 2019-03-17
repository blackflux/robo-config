# `assorted/@npm-opensource.json`

Manage various configuration files for an open source npm github repo.

<details>
  <summary>Requires</summary>

- js-gardener
- semantic-release
- npm-published
- david-dm
- dependabot
- coveralls
- circleci
- github
- javascript
- git
- npm
- yarn
- gally

</details>

<details>
  <summary>Details</summary>

## `badges/@npm-opensource`

Display various badges in README.

  <details>
    <summary>Requires</summary>

- js-gardener
- semantic-release
- npm-published
- david-dm
- dependabot
- coveralls
- circleci

  </details>

  <details>
    <summary>Details</summary>

### badges/js-gardener

_Updating `README.md` using `merge-below-title`._

- Display [js-gardener](https://github.com/blackflux/js-gardener) badge in README.

    <details>
      <summary>Requires</summary>

- js-gardener

    </details>

### badges/semantic-release

_Updating `README.md` using `merge-below-title`._

- Display [semantic-release](https://github.com/semantic-release/semantic-release) badge in README.

    <details>
      <summary>Requires</summary>

- semantic-release

    </details>

### badges/npm-downloads

_Updating `README.md` using `merge-below-title`._

- Display [npm downloads](https://www.npmjs.com/) badge in README.

    <details>
      <summary>Requires</summary>

- npm-published

    </details>

### badges/npm-status

_Updating `README.md` using `merge-below-title`._

- Display [npm status](https://www.npmjs.com/) badge in README.

    <details>
      <summary>Requires</summary>

- npm-published

    </details>

### badges/david-dm

_Updating `README.md` using `merge-below-title`._

- Display [david-dm.com](https://david-dm.org/) badge in README.

    <details>
      <summary>Requires</summary>

- david-dm

    </details>

### badges/dependabot

_Updating `README.md` using `merge-below-title`._

- Display [dependabot](https://dependabot.com/) badge in README.

    <details>
      <summary>Requires</summary>

- dependabot

    </details>

### badges/coveralls

_Updating `README.md` using `merge-below-title`._

- Display [coveralls](https://coveralls.io/) badge in README.

    <details>
      <summary>Requires</summary>

- coveralls

    </details>

### badges/circleci

_Updating `README.md` using `merge-below-title`._

- Display [circleci](https://circleci.com/) badge in README.

    <details>
      <summary>Requires</summary>

- circleci

    </details>

  </details>

## `dependabot/@default-js`

Recommended base [dependabot configuration](https://dependabot.com/) for javascript projects.

  <details>
    <summary>Requires</summary>

- dependabot
- github
- javascript

  </details>

  <details>
    <summary>Details</summary>

### dependabot/js-instant

_Updating `.dependabot/config.yml` using `overwrite`._

- Configure dependabot to instantly merge javascript dependency updates into the `dev` branch.

    <details>
      <summary>Requires</summary>

- dependabot
- github
- javascript

    </details>

  </details>

## `git/@default`

Recommended base configuration when using [git](https://en.wikipedia.org/wiki/Git).

  <details>
    <summary>Requires</summary>

- git

  </details>

  <details>
    <summary>Details</summary>

### git/gitignore

_Updating `.gitignore` using `merge-top`._

- Inject recommended entries into [gitignore file](https://help.github.com/en/articles/ignoring-files).
- Default ignores for JetBrains IDE.
- Default ignores for OSX
- Default ignores for NodeJs

    <details>
      <summary>Requires</summary>

- git

    </details>

  </details>

## `license/@MIT-npm`

Recommended base configuration when using MIT License with npm.

  <details>
    <summary>Requires</summary>

- npm

  </details>

  <details>
    <summary>Details</summary>

### license/MIT-LICENSE

_Updating `LICENSE` using `overwrite`._

- Generate [MIT license](https://en.wikipedia.org/wiki/MIT_License) file.

### license/MIT-npm

_Updating `package.json` using `merge-shallow`._

- Link MIT license file into [npm](https://www.npmjs.com/) configuration.

    <details>
      <summary>Requires</summary>

- npm

    </details>

  </details>

## `npm/@default`

Recommended base configuration when using [npm](https://www.npmjs.com/).

  <details>
    <summary>Requires</summary>

- npm

  </details>

  <details>
    <summary>Details</summary>

### npm/npmignore

_Updating `.npmignore` using `merge-top`._

- Inject comment into .npmignore explaining when to use it.

    <details>
      <summary>Requires</summary>

- npm

    </details>

  </details>

## `semantic-release/@default`

Recommended base configuration when using [semantic-release](https://github.com/semantic-release/semantic-release).

  <details>
    <summary>Requires</summary>

- semantic-release

  </details>

  <details>
    <summary>Details</summary>

### semantic-release/commit-conventions

_Updating `.releaserc.json` using `overwrite`._

- Slightly extended [release commit convention](https://github.com/semantic-release/semantic-release#commit-message-format) for semantic-release.

    <details>
      <summary>Requires</summary>

- semantic-release

    </details>

  </details>

## circleci/npm-opensource:two-branch

_Updating `.circleci/config.yml` using `overwrite`._

- Restrictive two-branch [gally](https://github.com/loopmediagroup/gally#readme) config. Custom for npm open source packages.
- TODO

  <details>
    <summary>Requires</summary>

- npm
- yarn
- gally
- github
- circleci
- coveralls
- dependabot
- semantic-release

  </details>

## gally/npm-opensource:two-branch

_Updating `.gally.json` using `overwrite`._

- Restrictive two-branch [gally](https://github.com/loopmediagroup/gally#readme) config. Custom for npm open source packages.
- TODO ...

  <details>
    <summary>Requires</summary>

- circleci
- gally
- github

  </details>

</details>

