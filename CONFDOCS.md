# Codebase Configuration Documentation

Documents configuration tasks managed by [robo-config](https://github.com/blackflux/robo-config).

## `assorted/@npm-opensource`

Manage various configuration files for an open source npm github repo.

<details>
  <summary>Requires</summary>

\- js-gardener\n
\- semantic-release\n
\- npm-published\n
\- david-dm\n
\- dependabot\n
\- coveralls\n
\- circleci\n
\- github\n
\- javascript\n
\- git\n
\- npm\n
\- yarn\n
\- gally\n

</details>

<details>
  <summary>Details</summary>

### `badges/@npm-opensource`

Display various badges in README.

  <details>
    <summary>Requires</summary>

\- js-gardener\n
\- semantic-release\n
\- npm-published\n
\- david-dm\n
\- dependabot\n
\- coveralls\n
\- circleci\n

  </details>

  <details>
    <summary>Details</summary>

#### badges/js-gardener

_Updating `README.md` using `merge-below-title`._

- Display [js-gardener](https://github.com/blackflux/js-gardener) badge in README.

    <details>
      <summary>Requires</summary>

\- js-gardener\n

    </details>

#### badges/semantic-release

_Updating `README.md` using `merge-below-title`._

- Display [semantic-release](https://github.com/semantic-release/semantic-release) badge in README.

    <details>
      <summary>Requires</summary>

\- semantic-release\n

    </details>

#### badges/npm-downloads

_Updating `README.md` using `merge-below-title`._

- Display [npm downloads](https://www.npmjs.com/) badge in README.

    <details>
      <summary>Requires</summary>

\- npm-published\n

    </details>

#### badges/npm-status

_Updating `README.md` using `merge-below-title`._

- Display [npm status](https://www.npmjs.com/) badge in README.

    <details>
      <summary>Requires</summary>

\- npm-published\n

    </details>

#### badges/david-dm

_Updating `README.md` using `merge-below-title`._

- Display [david-dm.com](https://david-dm.org/) badge in README.

    <details>
      <summary>Requires</summary>

\- david-dm\n

    </details>

#### badges/dependabot

_Updating `README.md` using `merge-below-title`._

- Display [dependabot](https://dependabot.com/) badge in README.

    <details>
      <summary>Requires</summary>

\- dependabot\n

    </details>

#### badges/coveralls

_Updating `README.md` using `merge-below-title`._

- Display [coveralls](https://coveralls.io/) badge in README.

    <details>
      <summary>Requires</summary>

\- coveralls\n

    </details>

#### badges/circleci

_Updating `README.md` using `merge-below-title`._

- Display [circleci](https://circleci.com/) badge in README.

    <details>
      <summary>Requires</summary>

\- circleci\n

    </details>

  </details>

### `dependabot/@default-js`

Recommended base [dependabot configuration](https://dependabot.com/) for javascript projects.

  <details>
    <summary>Requires</summary>

\- dependabot\n
\- github\n
\- javascript\n

  </details>

  <details>
    <summary>Details</summary>

#### dependabot/js-instant

_Updating `.dependabot/config.yml` using `overwrite`._

- Configure dependabot to instantly merge javascript dependency updates into the `dev` branch.

    <details>
      <summary>Requires</summary>

\- dependabot\n
\- github\n
\- javascript\n

    </details>

  </details>

### `git/@default`

Recommended base configuration when using [git](https://en.wikipedia.org/wiki/Git).

  <details>
    <summary>Requires</summary>

\- git\n

  </details>

  <details>
    <summary>Details</summary>

#### git/gitignore

_Updating `.gitignore` using `merge-top`._

- Inject recommended entries into [gitignore file](https://help.github.com/en/articles/ignoring-files).
- Default ignores for JetBrains IDE.
- Default ignores for OSX
- Default ignores for NodeJs

    <details>
      <summary>Requires</summary>

\- git\n

    </details>

  </details>

### `license/@MIT-npm`

Recommended base configuration when using MIT License with npm.

  <details>
    <summary>Requires</summary>

\- npm\n

  </details>

  <details>
    <summary>Details</summary>

#### license/MIT-LICENSE

_Updating `LICENSE` using `overwrite`._

- Generate [MIT license](https://en.wikipedia.org/wiki/MIT_License) file.

#### license/MIT-npm

_Updating `package.json` using `merge-shallow`._

- Link MIT license file into [npm](https://www.npmjs.com/) configuration.

    <details>
      <summary>Requires</summary>

\- npm\n

    </details>

  </details>

### `npm/@default`

Recommended base configuration when using [npm](https://www.npmjs.com/).

  <details>
    <summary>Requires</summary>

\- npm\n

  </details>

  <details>
    <summary>Details</summary>

#### npm/npmignore

_Updating `.npmignore` using `merge-top`._

- Inject comment into .npmignore explaining when to use it.

    <details>
      <summary>Requires</summary>

\- npm\n

    </details>

  </details>

### `semantic-release/@default`

Recommended base configuration when using [semantic-release](https://github.com/semantic-release/semantic-release).

  <details>
    <summary>Requires</summary>

\- semantic-release\n

  </details>

  <details>
    <summary>Details</summary>

#### semantic-release/commit-conventions

_Updating `.releaserc.json` using `overwrite`._

- Slightly extended [release commit convention](https://github.com/semantic-release/semantic-release#commit-message-format) for semantic-release.

    <details>
      <summary>Requires</summary>

\- semantic-release\n

    </details>

  </details>

### circleci/npm-opensource:two-branch

_Updating `.circleci/config.yml` using `overwrite`._

- Restrictive two-branch [gally](https://github.com/loopmediagroup/gally#readme) config. Custom for npm open source packages.
- TODO

  <details>
    <summary>Requires</summary>

\- npm\n
\- yarn\n
\- gally\n
\- github\n
\- circleci\n
\- coveralls\n
\- dependabot\n
\- semantic-release\n

  </details>

### gally/npm-opensource:two-branch

_Updating `.gally.json` using `overwrite`._

- Restrictive two-branch [gally](https://github.com/loopmediagroup/gally#readme) config. Custom for npm open source packages.
- TODO ...

  <details>
    <summary>Requires</summary>

\- circleci\n
\- gally\n
\- github\n

  </details>

</details>

## `jetbrains/@default`

Recommended base configuration when using Jetbrains.

<details>
  <summary>Requires</summary>

\- jetbrains\n
\- nyc\n

</details>

<details>
  <summary>Details</summary>

### jetbrains/exclude-coverage-folder

_Updating `.idea/${projectName}.iml` using `xml-merge`._

- Mark `coverage` Folder as excluded in Jetbrains.

  <details>
    <summary>Requires</summary>

\- jetbrains\n
\- nyc\n

  </details>

</details>

## `editor/@default`

Recommended base [code editor configuration](https://editorconfig.org/).

<details>
  <summary>Details</summary>

### editor/two-space

_Updating `.editorconfig` using `overwrite`._

- Two space line indentation.
- Set `lf` line endings.
- Set `utf8` encoding.
- Remove unnecessary whitespaces.

</details>

