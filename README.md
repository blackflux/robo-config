# Robo-Config

[![Build Status](https://circleci.com/gh/blackflux/robo-config.png?style=shield)](https://circleci.com/gh/blackflux/robo-config)
[![Test Coverage](https://img.shields.io/coveralls/blackflux/robo-config/master.svg)](https://coveralls.io/github/blackflux/robo-config?branch=master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=blackflux/robo-config)](https://dependabot.com)
[![Dependencies](https://david-dm.org/blackflux/robo-config/status.svg)](https://david-dm.org/blackflux/robo-config)
[![NPM](https://img.shields.io/npm/v/robo-config.svg)](https://www.npmjs.com/package/robo-config)
[![Downloads](https://img.shields.io/npm/dt/robo-config.svg)](https://www.npmjs.com/package/robo-config)
[![Semantic-Release](https://github.com/blackflux/js-gardener/blob/master/assets/icons/semver.svg)](https://github.com/semantic-release/semantic-release)
[![Gardener](https://github.com/blackflux/js-gardener/blob/master/assets/badge.svg)](https://github.com/blackflux/js-gardener)

Automatically manage configuration files.

## Getting Started

The package itself requires npm. However it can be used to manage files for any type of project.

First we need to set up the (hopefully) only manually managed configuration file called `.roboconfig.json`.

This file could for example contain:

```json
{
  "@blackflux/robo-config-plugin": {
    "tasks": [
      "editor/@default"
    ],
    "variables": {}
  }
}
```

where `@blackflux/robo-config-plugin` is a specific robo-config plugin.

To sync the configuration into the project we have two options:

### Option A: Sync through test (preferred)

First install `robo-config` and any plugins referenced in the configuration file, e.g.

    $ npm install --save-dev robo-config @blackflux/robo-config-plugin

Then create a test similar to

<!-- eslint-disable import/no-unresolved, import/no-extraneous-dependencies -->
```js
const expect = require('chai').expect;
const robo = require('robo-config');

it('Apply Robo Configuration', () => {
  expect(robo()).to.deep.equal([]);
});

```


### Option B: Sync through CLI

`// TODO: still needs to be implemented`


## But why...?

_Why does this package even exist?_ -
Let's face it, without npm and micro-services this repo would probably not exist. 
Npm has encouraged us developers to create a new repo and package for every 
re-usable code snippet. This is great from the re-usability perspective,
however it means that a single developer might actively maintain many repos.

Most maintenance tasks (automated repository configuration, automated tests, automated dependency updates, automated versioning or releases) 
can be done by just simply adding a configuration file to the repo and activating the corresponding service.
That's great, but what happens when:

- A nasty bug is discovered in one of the config files? 
- A provider changes their configuration file (format)?
- A major language version was released and tests should also be run against it?
- A cool new service popped up and one should really use it?

How does one ensure changes will propagate to all relevant repos?
If you never had to batch update a few dozen repos with the same change manually, you're lucky -
I can tell you it's not fun. Either you do them all at the same time (let's hope it was the right change) or 
you will inadvertently forget to apply the change to some repos. That's where this package comes in! 

Simply pick the plugin(s)/task(s) that are most appropriate for your repo or create your own.
Changes will propagate to your repos as dependencies are updated, giving you full control when they are applied.

## Writing your own Plugin

Writing your own robo-config plugin is very easy and gives you the most control. However it is recommended that you
use popular plugins for basic configuration management and then write your own plugin for those cases that are not covered yet.

Writing your own Plugin for robo-config is very simple.
A full example can be found [here](https://github.com/blackflux/robo-config-plugin/blob/master/src/index.js).

A plugin is an npm package that exposes an object containing exactly four keys:

- `name`: Fully qualified npm package name of the plugin
- `taskDir`: Absolute path to the plugin tasks
- `reqDir`: Absolute path to the plugin dependency definitions
- `varDir`: Absolute path to the plugin variable definitions
- `docDir`: Absolute path to the automatically maintained internal plugin documentation

The folder structures are as following:

### taskDir

This directory is the core of every robo-config plugin.

Top level it only contains sub-directories, which we call "task directories" since they are used to group tasks.
For example a task directory `editor` might indicate tasks related to the editor that is used for the project that uses robo-config.

Each task directory then contains task files and a `snippets` folder. 

The snippets folder contains raw configuration files or parts thereof which are applied using tasks and merge strategies.
Snippet files can contain variables which need to be provided when a task references the snippet.

There are two types of task files: 

- `@containerTaskName.json`: Container task files. They do not specify any action themselves, but reference other tasks.
- `actionableTaskName.json`: Actionable task files, which contain a single task definition, referencing a snippet.

#### Container Tasks

Container task names always starts with an `@` symbol. Only container tasks are usable from outside your plugin.

A container task definition file contains the following keys:

- `tasks`: Array of task names. These can be relative as `actionableTask` 
or referencing a different task directory as `taskDirectory/actionableTask`
- `description`: High level description of what this container task does. 

#### Actionable Tasks

Actionable task names must not start with an `@` symbol. They can only be used by container tasks.

Actionable task definition files contain the following keys:

- `target`: The relative file path to the target file in the project that robo-config is used in.
- `format` (_optional_): Indicates the format of the target file. E.g. the file extension might be `dat`, but the content `xml`). 
Automatically deduced by default. See [smart-fs](https://github.com/blackflux/smart-fs) for supported formats.
- `strategy`: One of the available merge strategies. These are detailed below.
- `snippets`: Array of snippets. A snippet is either the name of the snippet file (if no variables are present) or an object
containing a `variables` object and the snippet file name as `name`.
- `requires`: Array of dependencies that this task has. For example when managing the `.gitignore` file this should contain `git`.
- `purpose`: Description of what the task accomplishes provided as Array. Each entry corresponds to a new line in markdown.

#### Local and Global Variables

Variables are specified as `${variableName}`.

They can be placed as local variables anywhere in the snippet file (e.g. in the key of an object).

Local variables must be defined in every task that is using the snippet. Variable values can be strings or any other json structure.

The definitions for local variables can contain variables themselves, which are global variables.
These are required to be filled in by the maintainer of the project using robo-config and need to be documented.

Variables can also be used in the `target` of an `actionable` task. These are also global variables.

### reqDir

Contains a definition file `$$REQ$$.json` for every global dependency `$$REQ$$`. Each file contains the following entries:

- `description`: Short description of this dependency.
- `details`: Array containing detailed description of this dependency and how it's used. Each line corresponds to a new line in markdown.
- `website`: Related website for this dependency.

### varDir

Contains a definition file `$$VAR$$.json` for every global variable `$$VAR$$`. Each file contains the following entries:

- `description`: Short description of what is expected for this variable.
- `details`: Array containing longer description of what is expected and high level "why". Each line corresponds to a new line in markdown.
- `type`: The expected variable type.

### docDir

The folder structure is automatically managed and updated by the plugin tests. You should never need to touch this.

Very useful when previewing the configuration your plugin will generate.

To ensure this is synchronized you should set up a test.

### Merge Strategies

There are several merge strategies available and more will be added over time:

- `overwrite`: Simply replace the old with the new content.
- `merge-below-title`: Used for `line` style files. Merges content below title.
- `unique-top`: Used for unique `line` style files. E.g. `.gitignore`.
Merges content at the top of the file and removes existing, duplicate lines.
- `merge-shallow`: Used for `json/yml` style files. Does a shallow merge aka `Object.assign`.
- `merge-deep`: Used for `json/yml` style files. Does a "smart" deep merge.
- `xml-merge`: Used for `xml` style files. Does a "smart" deep merge.

### Tests

To ensure your plugin is in a valid state you should set up tests like so

<!-- eslint-disable import/no-unresolved, import/no-extraneous-dependencies -->
```js
const path = require('path');
const expect = require('chai').expect;
const { load } = require('robo-config');
const plugin = require('./path/to/plugin');

it('Documenting Plugin Tasks', () => {
  expect(load(plugin).syncDocs()).to.deep.equal([]);
});

it('Testing Plugin Tasks', () => {
  expect(load(plugin).test(path.join(__dirname, 'path', 'to', 'mock', 'project'))).to.deep.equal([]);
});

```

where `project` should contain files similar to a project you would your plugin expect to be used in. 

### Gotchas

#### Variable Escaping

Variables used in your snippets can be escaped as `$\{escapedVar}`.
This is converted into `${escapedVar}` before the snippet is applied.
Handy when configuration files need to contain variables of the same format.

#### File Guessing

In almost all cases you don't need to and should not specify the file extension of a task/file you're using.
It will automatically be picked up. 
