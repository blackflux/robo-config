# Codebase Configuration Documentation

Documents configuration tasks managed by [robo-config](https://github.com/blackflux/robo-config).

## Plugin [@blackflux/robo-config-plugin](https://www.npmjs.com/package/@blackflux/robo-config-plugin)

### `assorted/@npm-opensource`

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

- [js-gardener](#req-ref-js-gardener)
- [semantic-release](#req-ref-semantic-release)
- [npm-published](#req-ref-npm-published)
- [david-dm](#req-ref-david-dm)
- [dependabot](#req-ref-dependabot)
- [coveralls](#req-ref-coveralls)
- [circleci](#req-ref-circleci)
- [github](#req-ref-github)
- [javascript](#req-ref-javascript)
- [git](#req-ref-git)
- [npm](#req-ref-npm)
- [yarn](#req-ref-yarn)
- [gally](#req-ref-gally)

<!---0--></details>

<!---0--><details>
<!---0--><summary>Variables</summary>

- [packageName](#var-ref-packagename)
- [repoKey](#var-ref-repokey)
- [authorName](#var-ref-authorname)
- [owner](#var-ref-owner)
- [mergeBot](#var-ref-mergebot)

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

#### `badges/@npm-opensource`

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

- [js-gardener](#req-ref-js-gardener)
- [semantic-release](#req-ref-semantic-release)
- [npm-published](#req-ref-npm-published)
- [david-dm](#req-ref-david-dm)
- [dependabot](#req-ref-dependabot)
- [coveralls](#req-ref-coveralls)
- [circleci](#req-ref-circleci)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Variables</summary>

- [packageName](#var-ref-packagename)
- [repoKey](#var-ref-repokey)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Details</summary>

##### badges/js-gardener

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

- [js-gardener](#req-ref-js-gardener)

<!---2--></details>

##### badges/semantic-release

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

- [semantic-release](#req-ref-semantic-release)

<!---2--></details>

##### badges/npm-downloads

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

- [npm-published](#req-ref-npm-published)

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- [packageName](#var-ref-packagename)

<!---2--></details>

##### badges/npm-status

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

- [npm-published](#req-ref-npm-published)

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- [packageName](#var-ref-packagename)

<!---2--></details>

##### badges/david-dm

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

- [david-dm](#req-ref-david-dm)

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- [repoKey](#var-ref-repokey)

<!---2--></details>

##### badges/dependabot

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

- [dependabot](#req-ref-dependabot)

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- [repoKey](#var-ref-repokey)

<!---2--></details>

##### badges/coveralls

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

- [coveralls](#req-ref-coveralls)

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- [repoKey](#var-ref-repokey)

<!---2--></details>

##### badges/circleci

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

- [circleci](#req-ref-circleci)

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- [repoKey](#var-ref-repokey)

<!---2--></details>

------
<!---1--></details>

#### `dependabot/@default-js`

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

- [dependabot](#req-ref-dependabot)
- [github](#req-ref-github)
- [javascript](#req-ref-javascript)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Details</summary>

##### dependabot/js-instant

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

- [dependabot](#req-ref-dependabot)
- [github](#req-ref-github)
- [javascript](#req-ref-javascript)

<!---2--></details>

------
<!---1--></details>

#### `git/@default`

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

- [git](#req-ref-git)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Details</summary>

##### git/gitignore

_Updating `.gitignore` using `unique-top`._

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

- [git](#req-ref-git)

<!---2--></details>

------
<!---1--></details>

#### `license/@MIT-npm`

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

- [npm](#req-ref-npm)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Variables</summary>

- [authorName](#var-ref-authorname)
- [repoKey](#var-ref-repokey)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Details</summary>

##### license/MIT-LICENSE

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

- [authorName](#var-ref-authorname)

<!---2--></details>

##### license/MIT-npm

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

- [npm](#req-ref-npm)

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- [authorName](#var-ref-authorname)
- [repoKey](#var-ref-repokey)

<!---2--></details>

------
<!---1--></details>

#### `npm/@default`

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

- [npm](#req-ref-npm)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Details</summary>

##### npm/npmignore

_Updating `.npmignore` using `unique-top`._

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

- [npm](#req-ref-npm)

<!---2--></details>

------
<!---1--></details>

#### `semantic-release/@default`

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

- [semantic-release](#req-ref-semantic-release)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Details</summary>

##### semantic-release/commit-conventions

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

- [semantic-release](#req-ref-semantic-release)

<!---2--></details>

------
<!---1--></details>

#### circleci/npm-opensource:two-branch

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

- [npm](#req-ref-npm)
- [yarn](#req-ref-yarn)
- [gally](#req-ref-gally)
- [github](#req-ref-github)
- [circleci](#req-ref-circleci)
- [coveralls](#req-ref-coveralls)
- [dependabot](#req-ref-dependabot)
- [semantic-release](#req-ref-semantic-release)

<!---1--></details>

#### gally/npm-opensource:two-branch

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

- [circleci](#req-ref-circleci)
- [gally](#req-ref-gally)
- [github](#req-ref-github)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Variables</summary>

- [owner](#var-ref-owner)
- [mergeBot](#var-ref-mergebot)
- [repoKey](#var-ref-repokey)

<!---1--></details>

------
<!---0--></details>

### `jetbrains/@default`

Recommended base configuration when using Jetbrains.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└─ .idea
   └─ ${projectName}.iml
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Requires</summary>

- [jetbrains](#req-ref-jetbrains)
- [nyc](#req-ref-nyc)

<!---0--></details>

<!---0--><details>
<!---0--><summary>Variables</summary>

- [projectName](#var-ref-projectname)

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

#### jetbrains/exclude-coverage-folder

_Updating `.idea/${projectName}.iml` using `xml-merge`._

- Mark `coverage` Folder as excluded in Jetbrains.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ .idea
   └─ ${projectName}.iml
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- [jetbrains](#req-ref-jetbrains)
- [nyc](#req-ref-nyc)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Variables</summary>

- [projectName](#var-ref-projectname)

<!---1--></details>

------
<!---0--></details>

### `editor/@default`

Recommended base [code editor configuration](https://editorconfig.org/).

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└─ .editorconfig
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

#### editor/two-space

_Updating `.editorconfig` using `overwrite`._

- Two space line indentation.
- Set `lf` line endings.
- Set `utf8` encoding.
- Remove unnecessary whitespaces.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ .editorconfig
```

<!---1--></details>

</details>

------
------

## Requires

### <a name="req-ref-js-gardener">js-gardener</a>

### <a name="req-ref-semantic-release">semantic-release</a>

### <a name="req-ref-npm-published">npm-published</a>

### <a name="req-ref-david-dm">david-dm</a>

### <a name="req-ref-dependabot">dependabot</a>

### <a name="req-ref-coveralls">coveralls</a>

### <a name="req-ref-circleci">circleci</a>

### <a name="req-ref-github">github</a>

### <a name="req-ref-javascript">javascript</a>

### <a name="req-ref-git">git</a>

### <a name="req-ref-npm">npm</a>

### <a name="req-ref-yarn">yarn</a>

### <a name="req-ref-gally">gally</a>

### <a name="req-ref-jetbrains">jetbrains</a>

### <a name="req-ref-nyc">nyc</a>

------
------

## Variables

### <a name="var-ref-packagename">packageName</a>

### <a name="var-ref-repokey">repoKey</a>

### <a name="var-ref-authorname">authorName</a>

### <a name="var-ref-owner">owner</a>

### <a name="var-ref-mergebot">mergeBot</a>

### <a name="var-ref-projectname">projectName</a>

