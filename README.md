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

## But why...?

_Why does this package even exist?_ -
Let's face it, without npm and micro-services this repo would probably not exist. 
Npm has encouraged us to create a new repo and package for every 
re-usable code snippet. This is great from the re-usability perspective,
however it means that a single developer might actively maintain many repos.

Most maintenance tasks (automated repository configuration, automated tests, automated dependency updated, automated versioning and releases) 
can be done by just simply adding a configuration file to the repo and activating the corresponding service.
That's great, but what happens when:

- A nasty bug is discovered in one of the config files? 
- A provider changes their configuration file format?
- A major language version was released and tests should also be run against it?
- A cool new service popped up and one should really use it?

How does one ensure changes will propagate to all relevant repos?
If you never had to batch update a few dozen repos with the same change manually, you're lucky -
I can tell you it's not fun. Either you do them all at the same time (let's hope it was the right change) or 
you will inadvertently forget to apply the change to some repos. That's where this package comes in! 

### Sounds scary...?

Simply pick the task(s) that is most appropriate for your repo or create your own (prs are encouraged).
Tasks and snippets are reused as appropriate. A change to a snippet will then quickly make it to every repository using it.

Sounds scary?
Consider that configuration changes are tied to version updates of this package and can not be
automatically merged since the changed configuration files have to be committed.
This tool helps you to not forget pending configuration changes.
It does not do it automatically or silently.

## Getting Started

    $ npm install --save-dev robo-config

## Usage

...

## Assorted Tasks

All usable tasks are documented [here](test/mock/plugin/docs).
