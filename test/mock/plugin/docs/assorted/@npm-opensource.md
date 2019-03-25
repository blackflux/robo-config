# `assorted/@npm-opensource.json`

Manage various configuration files for an open source npm github repo.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
├─ .circleci
│  └─ config.yml
├─ .dependabot
│  └─ config.yml
├─ .gally.json
├─ .gitignore
├─ .npmignore
├─ .releaserc.json
├─ LICENSE
├─ package.json
└─ README.md
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Requires</summary>

- `js-gardener`
- `semantic-release`
- `npm-published`
- `david-dm`
- `dependabot`
- `coveralls`
- `circleci`
- `github`
- `javascript`
- `git`
- `npm`
- `yarn`
- `gally`

<!---0--></details>

<!---0--><details>
<!---0--><summary>Variables</summary>

- `repoName`
- `repoKey`
- `authorName`
- `owner`
- `mergeBot`

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

## `badges/@npm-opensource`

Display various badges in README.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ README.md
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- `js-gardener`
- `semantic-release`
- `npm-published`
- `david-dm`
- `dependabot`
- `coveralls`
- `circleci`

<!---1--></details>

<!---1--><details>
<!---1--><summary>Variables</summary>

- `repoName`
- `repoKey`

<!---1--></details>

<!---1--><details>
<!---1--><summary>Details</summary>

### badges/js-gardener

_Updating `README.md` using `merge-below-title`._

- Display [js-gardener](https://github.com/blackflux/js-gardener) badge in README.

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ README.md
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Requires</summary>

- `js-gardener`

<!---2--></details>

### badges/semantic-release

_Updating `README.md` using `merge-below-title`._

- Display [semantic-release](https://github.com/semantic-release/semantic-release) badge in README.

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ README.md
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Requires</summary>

- `semantic-release`

<!---2--></details>

### badges/npm-downloads

_Updating `README.md` using `merge-below-title`._

- Display [npm downloads](https://www.npmjs.com/) badge in README.

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ README.md
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Requires</summary>

- `npm-published`

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- `repoName`

<!---2--></details>

### badges/npm-status

_Updating `README.md` using `merge-below-title`._

- Display [npm status](https://www.npmjs.com/) badge in README.

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ README.md
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Requires</summary>

- `npm-published`

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- `repoName`

<!---2--></details>

### badges/david-dm

_Updating `README.md` using `merge-below-title`._

- Display [david-dm.com](https://david-dm.org/) badge in README.

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ README.md
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Requires</summary>

- `david-dm`

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- `repoKey`

<!---2--></details>

### badges/dependabot

_Updating `README.md` using `merge-below-title`._

- Display [dependabot](https://dependabot.com/) badge in README.

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ README.md
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Requires</summary>

- `dependabot`

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- `repoKey`

<!---2--></details>

### badges/coveralls

_Updating `README.md` using `merge-below-title`._

- Display [coveralls](https://coveralls.io/) badge in README.

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ README.md
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Requires</summary>

- `coveralls`

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- `repoKey`

<!---2--></details>

### badges/circleci

_Updating `README.md` using `merge-below-title`._

- Display [circleci](https://circleci.com/) badge in README.

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ README.md
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Requires</summary>

- `circleci`

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- `repoKey`

<!---2--></details>

------
<!---1--></details>

## `dependabot/@default-js`

Recommended base [dependabot configuration](https://dependabot.com/) for javascript projects.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ .dependabot
   └─ config.yml
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- `dependabot`
- `github`
- `javascript`

<!---1--></details>

<!---1--><details>
<!---1--><summary>Details</summary>

### dependabot/js-instant

_Updating `.dependabot/config.yml` using `overwrite`._

- Configure dependabot to instantly merge javascript dependency updates into the `dev` branch.

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ .dependabot
   └─ config.yml
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Requires</summary>

- `dependabot`
- `github`
- `javascript`

<!---2--></details>

------
<!---1--></details>

## `git/@default`

Recommended base configuration when using [git](https://en.wikipedia.org/wiki/Git).

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ .gitignore
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- `git`

<!---1--></details>

<!---1--><details>
<!---1--><summary>Details</summary>

### git/gitignore

_Updating `.gitignore` using `merge-top`._

- Inject recommended entries into [gitignore file](https://help.github.com/en/articles/ignoring-files).
- Default ignores for JetBrains IDE.
- Default ignores for OSX
- Default ignores for NodeJs

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ .gitignore
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Requires</summary>

- `git`

<!---2--></details>

------
<!---1--></details>

## `license/@MIT-npm`

Recommended base configuration when using MIT License with npm.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
├─ LICENSE
└─ package.json
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- `npm`

<!---1--></details>

<!---1--><details>
<!---1--><summary>Variables</summary>

- `authorName`
- `repoKey`

<!---1--></details>

<!---1--><details>
<!---1--><summary>Details</summary>

### license/MIT-LICENSE

_Updating `LICENSE` using `overwrite`._

- Generate [MIT license](https://en.wikipedia.org/wiki/MIT_License) file.

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ LICENSE
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- `authorName`

<!---2--></details>

### license/MIT-npm

_Updating `package.json` using `merge-shallow`._

- Link MIT license file into [npm](https://www.npmjs.com/) configuration.

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ package.json
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Requires</summary>

- `npm`

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- `authorName`
- `repoKey`

<!---2--></details>

------
<!---1--></details>

## `npm/@default`

Recommended base configuration when using [npm](https://www.npmjs.com/).

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ .npmignore
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- `npm`

<!---1--></details>

<!---1--><details>
<!---1--><summary>Details</summary>

### npm/npmignore

_Updating `.npmignore` using `merge-top`._

- Inject comment into .npmignore explaining when to use it.

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ .npmignore
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Requires</summary>

- `npm`

<!---2--></details>

------
<!---1--></details>

## `semantic-release/@default`

Recommended base configuration when using [semantic-release](https://github.com/semantic-release/semantic-release).

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ .releaserc.json
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- `semantic-release`

<!---1--></details>

<!---1--><details>
<!---1--><summary>Details</summary>

### semantic-release/commit-conventions

_Updating `.releaserc.json` using `overwrite`._

- Slightly extended [release commit convention](https://github.com/semantic-release/semantic-release#commit-message-format) for semantic-release.

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ .releaserc.json
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Requires</summary>

- `semantic-release`

<!---2--></details>

------
<!---1--></details>

## circleci/npm-opensource:two-branch

_Updating `.circleci/config.yml` using `overwrite`._

- Restrictive two-branch [gally](https://github.com/loopmediagroup/gally#readme) config. Custom for npm open source packages.
- TODO

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ .circleci
   └─ config.yml
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- `npm`
- `yarn`
- `gally`
- `github`
- `circleci`
- `coveralls`
- `dependabot`
- `semantic-release`

<!---1--></details>

## gally/npm-opensource:two-branch

_Updating `.gally.json` using `overwrite`._

- Restrictive two-branch [gally](https://github.com/loopmediagroup/gally#readme) config. Custom for npm open source packages.
- TODO ...

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ .gally.json
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- `circleci`
- `gally`
- `github`

<!---1--></details>

<!---1--><details>
<!---1--><summary>Variables</summary>

- `owner`
- `mergeBot`
- `repoKey`

<!---1--></details>

</details>

