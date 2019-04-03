# Codebase Configuration Documentation

Documents configuration tasks managed by [robo-config](https://github.com/blackflux/robo-config).

## Plugin [@blackflux/robo-config-plugin](https://www.npmjs.com/package/@blackflux/robo-config-plugin)

- :open_file_folder: [`assorted/@npm-opensource`](#blackfluxrobo-config-plugin-task-ref-assortednpm-opensource)
  - :open_file_folder: [`badges/@npm-opensource`](#blackfluxrobo-config-plugin-task-ref-badgesnpm-opensource)
    - :clipboard: [`badges/js-gardener`](#blackfluxrobo-config-plugin-task-ref-badgesjs-gardener)
    - :clipboard: [`badges/semantic-release`](#blackfluxrobo-config-plugin-task-ref-badgessemantic-release)
    - :clipboard: [`badges/npm-downloads`](#blackfluxrobo-config-plugin-task-ref-badgesnpm-downloads)
    - :clipboard: [`badges/npm-status`](#blackfluxrobo-config-plugin-task-ref-badgesnpm-status)
    - :clipboard: [`badges/david-dm`](#blackfluxrobo-config-plugin-task-ref-badgesdavid-dm)
    - :clipboard: [`badges/dependabot`](#blackfluxrobo-config-plugin-task-ref-badgesdependabot)
    - :clipboard: [`badges/coveralls`](#blackfluxrobo-config-plugin-task-ref-badgescoveralls)
    - :clipboard: [`badges/circleci`](#blackfluxrobo-config-plugin-task-ref-badgescircleci)
  - :open_file_folder: [`dependabot/@default-js`](#blackfluxrobo-config-plugin-task-ref-dependabotdefault-js)
    - :clipboard: [`dependabot/js-instant`](#blackfluxrobo-config-plugin-task-ref-dependabotjs-instant)
  - :open_file_folder: [`git/@default`](#blackfluxrobo-config-plugin-task-ref-gitdefault)
    - :clipboard: [`git/gitignore`](#blackfluxrobo-config-plugin-task-ref-gitgitignore)
  - :open_file_folder: [`license/@MIT-npm`](#blackfluxrobo-config-plugin-task-ref-licensemit-npm)
    - :clipboard: [`license/MIT-LICENSE`](#blackfluxrobo-config-plugin-task-ref-licensemit-license)
    - :clipboard: [`license/MIT-npm`](#blackfluxrobo-config-plugin-task-ref-licensemit-npm)
  - :open_file_folder: [`npm/@default`](#blackfluxrobo-config-plugin-task-ref-npmdefault)
    - :clipboard: [`npm/npmignore`](#blackfluxrobo-config-plugin-task-ref-npmnpmignore)
  - :open_file_folder: [`semantic-release/@default`](#blackfluxrobo-config-plugin-task-ref-semantic-releasedefault)
    - :clipboard: [`semantic-release/commit-conventions`](#blackfluxrobo-config-plugin-task-ref-semantic-releasecommit-conventions)
  - :clipboard: [`circleci/npm-opensource:two-branch`](#blackfluxrobo-config-plugin-task-ref-circlecinpm-opensourcetwo-branch)
  - :clipboard: [`gally/npm-opensource:two-branch`](#blackfluxrobo-config-plugin-task-ref-gallynpm-opensourcetwo-branch)
- :open_file_folder: [`jetbrains/@default`](#blackfluxrobo-config-plugin-task-ref-jetbrainsdefault)
  - :clipboard: [`jetbrains/exclude-coverage-folder`](#blackfluxrobo-config-plugin-task-ref-jetbrainsexclude-coverage-folder)
- :open_file_folder: [`editor/@default`](#blackfluxrobo-config-plugin-task-ref-editordefault)
  - :clipboard: [`editor/two-space`](#blackfluxrobo-config-plugin-task-ref-editortwo-space)

### :open_file_folder: <a name="blackfluxrobo-config-plugin-task-ref-assortednpm-opensource">assorted/@npm-opensource</a>

Manage various configuration files for an open source npm github repo.

*Targets:*
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

*Requires:*
- [js-gardener](#blackfluxrobo-config-plugin-req-ref-js-gardener)
- [semantic-release](#blackfluxrobo-config-plugin-req-ref-semantic-release)
- [npm-published](#blackfluxrobo-config-plugin-req-ref-npm-published)
- [david-dm](#blackfluxrobo-config-plugin-req-ref-david-dm)
- [dependabot](#blackfluxrobo-config-plugin-req-ref-dependabot)
- [coveralls](#blackfluxrobo-config-plugin-req-ref-coveralls)
- [circleci](#blackfluxrobo-config-plugin-req-ref-circleci)
- [github](#blackfluxrobo-config-plugin-req-ref-github)
- [javascript](#blackfluxrobo-config-plugin-req-ref-javascript)
- [git](#blackfluxrobo-config-plugin-req-ref-git)
- [npm](#blackfluxrobo-config-plugin-req-ref-npm)
- [yarn](#blackfluxrobo-config-plugin-req-ref-yarn)
- [gally](#blackfluxrobo-config-plugin-req-ref-gally)

*Variables:*
- [packageName](#blackfluxrobo-config-plugin-var-ref-packagename)
- [repoKey](#blackfluxrobo-config-plugin-var-ref-repokey)
- [ownerName](#blackfluxrobo-config-plugin-var-ref-ownername)
- [owner](#blackfluxrobo-config-plugin-var-ref-owner)
- [mergeBot](#blackfluxrobo-config-plugin-var-ref-mergebot)

#### :open_file_folder: <a name="blackfluxrobo-config-plugin-task-ref-badgesnpm-opensource">badges/@npm-opensource</a>

Display various badges in README.

*Targets:*
```
project
└─ README.md
```

*Requires:*
- [js-gardener](#blackfluxrobo-config-plugin-req-ref-js-gardener)
- [semantic-release](#blackfluxrobo-config-plugin-req-ref-semantic-release)
- [npm-published](#blackfluxrobo-config-plugin-req-ref-npm-published)
- [david-dm](#blackfluxrobo-config-plugin-req-ref-david-dm)
- [dependabot](#blackfluxrobo-config-plugin-req-ref-dependabot)
- [coveralls](#blackfluxrobo-config-plugin-req-ref-coveralls)
- [circleci](#blackfluxrobo-config-plugin-req-ref-circleci)

*Variables:*
- [packageName](#blackfluxrobo-config-plugin-var-ref-packagename)
- [repoKey](#blackfluxrobo-config-plugin-var-ref-repokey)

##### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-badgesjs-gardener">badges/js-gardener</a>

_Updating `README.md` using [merge-below-title](#blackfluxrobo-config-plugin-strat-ref-merge-below-title)._

- Display [js-gardener](https://github.com/blackflux/js-gardener) badge in README.

*Targets:*
```
project
└─ README.md
```

*Requires:*
- [js-gardener](#blackfluxrobo-config-plugin-req-ref-js-gardener)

##### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-badgessemantic-release">badges/semantic-release</a>

_Updating `README.md` using [merge-below-title](#blackfluxrobo-config-plugin-strat-ref-merge-below-title)._

- Display [semantic-release](https://github.com/semantic-release/semantic-release) badge in README.

*Targets:*
```
project
└─ README.md
```

*Requires:*
- [semantic-release](#blackfluxrobo-config-plugin-req-ref-semantic-release)

##### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-badgesnpm-downloads">badges/npm-downloads</a>

_Updating `README.md` using [merge-below-title](#blackfluxrobo-config-plugin-strat-ref-merge-below-title)._

- Display [npm downloads](https://www.npmjs.com/) badge in README.

*Targets:*
```
project
└─ README.md
```

*Requires:*
- [npm-published](#blackfluxrobo-config-plugin-req-ref-npm-published)

*Variables:*
- [packageName](#blackfluxrobo-config-plugin-var-ref-packagename)

##### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-badgesnpm-status">badges/npm-status</a>

_Updating `README.md` using [merge-below-title](#blackfluxrobo-config-plugin-strat-ref-merge-below-title)._

- Display [npm status](https://www.npmjs.com/) badge in README.

*Targets:*
```
project
└─ README.md
```

*Requires:*
- [npm-published](#blackfluxrobo-config-plugin-req-ref-npm-published)

*Variables:*
- [packageName](#blackfluxrobo-config-plugin-var-ref-packagename)

##### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-badgesdavid-dm">badges/david-dm</a>

_Updating `README.md` using [merge-below-title](#blackfluxrobo-config-plugin-strat-ref-merge-below-title)._

- Display [david-dm.com](https://david-dm.org/) badge in README.

*Targets:*
```
project
└─ README.md
```

*Requires:*
- [david-dm](#blackfluxrobo-config-plugin-req-ref-david-dm)

*Variables:*
- [repoKey](#blackfluxrobo-config-plugin-var-ref-repokey)

##### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-badgesdependabot">badges/dependabot</a>

_Updating `README.md` using [merge-below-title](#blackfluxrobo-config-plugin-strat-ref-merge-below-title)._

- Display [dependabot](https://dependabot.com/) badge in README.

*Targets:*
```
project
└─ README.md
```

*Requires:*
- [dependabot](#blackfluxrobo-config-plugin-req-ref-dependabot)

*Variables:*
- [repoKey](#blackfluxrobo-config-plugin-var-ref-repokey)

##### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-badgescoveralls">badges/coveralls</a>

_Updating `README.md` using [merge-below-title](#blackfluxrobo-config-plugin-strat-ref-merge-below-title)._

- Display [coveralls](https://coveralls.io/) badge in README.

*Targets:*
```
project
└─ README.md
```

*Requires:*
- [coveralls](#blackfluxrobo-config-plugin-req-ref-coveralls)

*Variables:*
- [repoKey](#blackfluxrobo-config-plugin-var-ref-repokey)

##### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-badgescircleci">badges/circleci</a>

_Updating `README.md` using [merge-below-title](#blackfluxrobo-config-plugin-strat-ref-merge-below-title)._

- Display [circleci](https://circleci.com/) badge in README.

*Targets:*
```
project
└─ README.md
```

*Requires:*
- [circleci](#blackfluxrobo-config-plugin-req-ref-circleci)

*Variables:*
- [repoKey](#blackfluxrobo-config-plugin-var-ref-repokey)

#### :open_file_folder: <a name="blackfluxrobo-config-plugin-task-ref-dependabotdefault-js">dependabot/@default-js</a>

Recommended base [dependabot configuration](https://dependabot.com/) for javascript projects.

*Targets:*
```
project
└─ .dependabot
   └─ config.yml
```

*Requires:*
- [dependabot](#blackfluxrobo-config-plugin-req-ref-dependabot)
- [github](#blackfluxrobo-config-plugin-req-ref-github)
- [javascript](#blackfluxrobo-config-plugin-req-ref-javascript)

##### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-dependabotjs-instant">dependabot/js-instant</a>

_Updating `.dependabot/config.yml` using [overwrite](#blackfluxrobo-config-plugin-strat-ref-overwrite)._

- Configure dependabot to instantly merge javascript dependency updates into the `dev` branch.

*Targets:*
```
project
└─ .dependabot
   └─ config.yml
```

*Requires:*
- [dependabot](#blackfluxrobo-config-plugin-req-ref-dependabot)
- [github](#blackfluxrobo-config-plugin-req-ref-github)
- [javascript](#blackfluxrobo-config-plugin-req-ref-javascript)

#### :open_file_folder: <a name="blackfluxrobo-config-plugin-task-ref-gitdefault">git/@default</a>

Recommended base configuration when using [git](https://en.wikipedia.org/wiki/Git).

*Targets:*
```
project
└─ .gitignore
```

*Requires:*
- [git](#blackfluxrobo-config-plugin-req-ref-git)

##### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-gitgitignore">git/gitignore</a>

_Updating `.gitignore` using [unique-top](#blackfluxrobo-config-plugin-strat-ref-unique-top)._

- Inject recommended entries into [gitignore file](https://help.github.com/en/articles/ignoring-files).
- Default ignores for JetBrains IDE.
- Default ignores for OSX
- Default ignores for NodeJs

*Targets:*
```
project
└─ .gitignore
```

*Requires:*
- [git](#blackfluxrobo-config-plugin-req-ref-git)

#### :open_file_folder: <a name="blackfluxrobo-config-plugin-task-ref-licensemit-npm">license/@MIT-npm</a>

Recommended base configuration when using MIT License with npm.

*Targets:*
```
project
├─ LICENSE
└─ package.json
```

*Requires:*
- [npm](#blackfluxrobo-config-plugin-req-ref-npm)

*Variables:*
- [ownerName](#blackfluxrobo-config-plugin-var-ref-ownername)
- [repoKey](#blackfluxrobo-config-plugin-var-ref-repokey)

##### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-licensemit-license">license/MIT-LICENSE</a>

_Updating `LICENSE` using [overwrite](#blackfluxrobo-config-plugin-strat-ref-overwrite)._

- Generate [MIT license](https://en.wikipedia.org/wiki/MIT_License) file.

*Targets:*
```
project
└─ LICENSE
```

*Variables:*
- [ownerName](#blackfluxrobo-config-plugin-var-ref-ownername)

##### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-licensemit-npm">license/MIT-npm</a>

_Updating `package.json` using [merge-shallow](#blackfluxrobo-config-plugin-strat-ref-merge-shallow)._

- Link MIT license file into [npm](https://www.npmjs.com/) configuration.

*Targets:*
```
project
└─ package.json
```

*Requires:*
- [npm](#blackfluxrobo-config-plugin-req-ref-npm)

*Variables:*
- [ownerName](#blackfluxrobo-config-plugin-var-ref-ownername)
- [repoKey](#blackfluxrobo-config-plugin-var-ref-repokey)

#### :open_file_folder: <a name="blackfluxrobo-config-plugin-task-ref-npmdefault">npm/@default</a>

Recommended base configuration when using [npm](https://www.npmjs.com/).

*Targets:*
```
project
└─ .npmignore
```

*Requires:*
- [npm](#blackfluxrobo-config-plugin-req-ref-npm)

##### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-npmnpmignore">npm/npmignore</a>

_Updating `.npmignore` using [unique-top](#blackfluxrobo-config-plugin-strat-ref-unique-top)._

- Inject comment into .npmignore explaining when to use it.

*Targets:*
```
project
└─ .npmignore
```

*Requires:*
- [npm](#blackfluxrobo-config-plugin-req-ref-npm)

#### :open_file_folder: <a name="blackfluxrobo-config-plugin-task-ref-semantic-releasedefault">semantic-release/@default</a>

Recommended base configuration when using [semantic-release](https://github.com/semantic-release/semantic-release).

*Targets:*
```
project
└─ .releaserc.json
```

*Requires:*
- [semantic-release](#blackfluxrobo-config-plugin-req-ref-semantic-release)

##### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-semantic-releasecommit-conventions">semantic-release/commit-conventions</a>

_Updating `.releaserc.json` using [overwrite](#blackfluxrobo-config-plugin-strat-ref-overwrite)._

- Slightly extended [release commit convention](https://github.com/semantic-release/semantic-release#commit-message-format) for semantic-release.

*Targets:*
```
project
└─ .releaserc.json
```

*Requires:*
- [semantic-release](#blackfluxrobo-config-plugin-req-ref-semantic-release)

#### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-circlecinpm-opensourcetwo-branch">circleci/npm-opensource:two-branch</a>

_Updating `.circleci/config.yml` using [overwrite](#blackfluxrobo-config-plugin-strat-ref-overwrite)._

- Restrictive two-branch [gally](https://github.com/loopmediagroup/gally#readme) config. Custom for npm open source packages.
- TODO

*Targets:*
```
project
└─ .circleci
   └─ config.yml
```

*Requires:*
- [npm](#blackfluxrobo-config-plugin-req-ref-npm)
- [yarn](#blackfluxrobo-config-plugin-req-ref-yarn)
- [gally](#blackfluxrobo-config-plugin-req-ref-gally)
- [github](#blackfluxrobo-config-plugin-req-ref-github)
- [circleci](#blackfluxrobo-config-plugin-req-ref-circleci)
- [coveralls](#blackfluxrobo-config-plugin-req-ref-coveralls)
- [dependabot](#blackfluxrobo-config-plugin-req-ref-dependabot)
- [semantic-release](#blackfluxrobo-config-plugin-req-ref-semantic-release)

#### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-gallynpm-opensourcetwo-branch">gally/npm-opensource:two-branch</a>

_Updating `.gally.json` using [overwrite](#blackfluxrobo-config-plugin-strat-ref-overwrite)._

- Restrictive two-branch [gally](https://github.com/loopmediagroup/gally#readme) config. Custom for npm open source packages.
- TODO ...

*Targets:*
```
project
└─ .gally.json
```

*Requires:*
- [circleci](#blackfluxrobo-config-plugin-req-ref-circleci)
- [gally](#blackfluxrobo-config-plugin-req-ref-gally)
- [github](#blackfluxrobo-config-plugin-req-ref-github)

*Variables:*
- [owner](#blackfluxrobo-config-plugin-var-ref-owner)
- [mergeBot](#blackfluxrobo-config-plugin-var-ref-mergebot)
- [repoKey](#blackfluxrobo-config-plugin-var-ref-repokey)

### :open_file_folder: <a name="blackfluxrobo-config-plugin-task-ref-jetbrainsdefault">jetbrains/@default</a>

Recommended base configuration when using Jetbrains.

*Targets:*
```
project
└─ .idea
   └─ ${projectName}.iml
```

*Requires:*
- [jetbrains](#blackfluxrobo-config-plugin-req-ref-jetbrains)
- [nyc](#blackfluxrobo-config-plugin-req-ref-nyc)

*Variables:*
- [projectName](#blackfluxrobo-config-plugin-var-ref-projectname)

#### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-jetbrainsexclude-coverage-folder">jetbrains/exclude-coverage-folder</a>

_Updating `.idea/${projectName}.iml` using [xml-merge](#blackfluxrobo-config-plugin-strat-ref-xml-merge)._

- Mark `coverage` Folder as excluded in Jetbrains.

*Targets:*
```
project
└─ .idea
   └─ ${projectName}.iml
```

*Requires:*
- [jetbrains](#blackfluxrobo-config-plugin-req-ref-jetbrains)
- [nyc](#blackfluxrobo-config-plugin-req-ref-nyc)

*Variables:*
- [projectName](#blackfluxrobo-config-plugin-var-ref-projectname)

### :open_file_folder: <a name="blackfluxrobo-config-plugin-task-ref-editordefault">editor/@default</a>

Recommended base [code editor configuration](https://editorconfig.org/).

*Targets:*
```
project
└─ .editorconfig
```

#### :clipboard: <a name="blackfluxrobo-config-plugin-task-ref-editortwo-space">editor/two-space</a>

_Updating `.editorconfig` using [overwrite](#blackfluxrobo-config-plugin-strat-ref-overwrite)._

- Two space line indentation.
- Set `lf` line endings.
- Set `utf8` encoding.
- Remove unnecessary whitespaces.

*Targets:*
```
project
└─ .editorconfig
```

------
------

## Requires

### <a name="blackfluxrobo-config-plugin-req-ref-js-gardener">js-gardener</a>

[Website](https://github.com/blackflux/js-gardener#readme)

NodeJs Project Management.

*Details:*
Enforces and helps setting up best practices around NodeJs projects.
Enforces highest code quality and minimizes package setup and maintenance complexity - so you can focus on writing code.
Highly recommended if you are getting started with a new package and extremely useful if you are maintaining multiple packages.

### <a name="blackfluxrobo-config-plugin-req-ref-semantic-release">semantic-release</a>

[Website](https://github.com/semantic-release/semantic-release)

Automates npm package release workflow.

*Details:*
Automates the package release workflow including:
- determining the next version number
- generating the release notes
- publishing the package

### <a name="blackfluxrobo-config-plugin-req-ref-npm-published">npm-published</a>

[Website](https://docs.npmjs.com/about-npm/)

Javascript package repository published.

*Details:*
Requires the project to be published to npm either as a private or public package.

### <a name="blackfluxrobo-config-plugin-req-ref-david-dm">david-dm</a>

[Website](https://david-dm.org/)

Dependency badge for javascript github repositories.

*Details:*
Enables displaying of a status badge indicated whether the dependencies are outdated.

### <a name="blackfluxrobo-config-plugin-req-ref-dependabot">dependabot</a>

[Website](https://dependabot.com/)

Automatic dependency updates.

*Details:*
Makes dependency updates very easy by automatically creating pull requests in your repo.
All major programming languages are supported or work is done towards supporting them.

### <a name="blackfluxrobo-config-plugin-req-ref-coveralls">coveralls</a>

[Website](https://coveralls.io/)

Showcase and analyze coverage reports.

*Details:*
Enables displaying of a status badge indicated code coverage percent of the project.
Furthermore allows anyone to easily drill down into missing coverage or coverage changes.

### <a name="blackfluxrobo-config-plugin-req-ref-circleci">circleci</a>

[Website](https://circleci.com/)

Run automated jobs using docker containers.

*Details:*
Allows set up for ci/cd using docker containers.
Automates development process quickly, safely, and at scale.

### <a name="blackfluxrobo-config-plugin-req-ref-github">github</a>

[Website](https://github.com/)

Major development platform powered by git.

*Details:*
GitHub is a code hosting platform for collaboration and version control.
Lets you and others work together on projects.

### <a name="blackfluxrobo-config-plugin-req-ref-javascript">javascript</a>

[Website](https://en.wikipedia.org/wiki/JavaScript)

Programming Language.

*Details:*
JavaScript, often abbreviated as JS, is a high-level, interpreted programming language that conforms to the ECMAScript specification.
It is characterized as dynamic, weakly typed, prototype-based and multi-paradigm.

### <a name="blackfluxrobo-config-plugin-req-ref-git">git</a>

[Website](https://git-scm.com/)

Version control system.

*Details:*
The most used version control system. Not to be confused with github (which uses git).

### <a name="blackfluxrobo-config-plugin-req-ref-npm">npm</a>

[Website](https://docs.npmjs.com/about-npm/)

Javascript package repository.

*Details:*
Requires the project to be conform with the npm standard, i.e. contain a package.json file.
Does not require the project to be published to npm.

### <a name="blackfluxrobo-config-plugin-req-ref-yarn">yarn</a>

[Website](https://yarnpkg.com/)

Dependency management similar to npm.

*Details:*
Very similar functionality to npm cli. However there are some significant differences.

### <a name="blackfluxrobo-config-plugin-req-ref-gally">gally</a>

[Website](https://github.com/loopmediagroup/gally)

Automation around github.com Repository Management

*Details:*
Allows management of github.com repositories through configuration.
Very powerful when you need to synchronize settings across multiple repositories.

### <a name="blackfluxrobo-config-plugin-req-ref-jetbrains">jetbrains</a>

[Website](https://www.jetbrains.com)

Collection of various IDEs.

*Details:*
Collection of various IDEs. There exists one for every major programming language and 
they are all very similar (i.e. shortcuts, layout), which makes them great when switching languages.

### <a name="blackfluxrobo-config-plugin-req-ref-nyc">nyc</a>

[Website](https://github.com/istanbuljs/nyc#readme)

Coverage testing for javascript projects.

*Details:*
A major coverage testing framework for javascript.
Comes with all the bells and whistles.

------
------

## Variables

### <a name="blackfluxrobo-config-plugin-var-ref-packagename">packageName</a>

Type: `string`

Name of the package on npm.

*Details:*
The name of the project as published to npm.
Note that for scoped packages the name can differ significantly from the repo name.

### <a name="blackfluxrobo-config-plugin-var-ref-repokey">repoKey</a>

Type: `string`

Repository key.

*Details:*
The repository key contains the owner or organization of the project and the repository name itself, separated by a slash.

### <a name="blackfluxrobo-config-plugin-var-ref-ownername">ownerName</a>

Type: `string`

Name of the owner of this project.

*Details:*
The owner name of the project is the name of the person or organization publishing the project under their license.

### <a name="blackfluxrobo-config-plugin-var-ref-owner">owner</a>

Type: `string`

The owner of the code on github.

*Details:*
The code owner is the gatekeeper of the project, ultimately responsible for all changes.

### <a name="blackfluxrobo-config-plugin-var-ref-mergebot">mergeBot</a>

Type: `string`

The github name of the bot used for automatic merging.

### <a name="blackfluxrobo-config-plugin-var-ref-projectname">projectName</a>

Type: `string`

Name of the project.

*Details:*
The project name is in most cases identical to the repository name.

------
------

## Strategies

### <a name="blackfluxrobo-config-plugin-strat-ref-merge-below-title">merge-below-title</a>

Valid for: `list`, `nostruct`

Merges content below title.

### <a name="blackfluxrobo-config-plugin-strat-ref-overwrite">overwrite</a>

Valid for: `any`

Simply replace the old with the new content.

### <a name="blackfluxrobo-config-plugin-strat-ref-unique-top">unique-top</a>

Valid for: `list`

Merges content at the top of the file and removes existing, duplicate lines.

*Details:*
Useful for managing e.g. `.gitignore` when the original content should be kept.

### <a name="blackfluxrobo-config-plugin-strat-ref-merge-shallow">merge-shallow</a>

Valid for: `json`, `yml`

Does a shallow merge aka `Object.assign()`.

*Details:*
Useful when specific keys of the target need to be overwritten.

### <a name="blackfluxrobo-config-plugin-strat-ref-xml-merge">xml-merge</a>

Valid for: `xml`

Does a "smart" deep merge.

*Details:*
This will not work as desired for all xml merging, but should for many cases.

