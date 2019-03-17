# `license/@MIT-npm.json`

Recommended base configuration when using MIT License with npm.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
├── LICENSE
└── package.json
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Requires</summary>

- npm

<!---0--></details>

<!---0--><details>
<!---0--><summary>Variables</summary>

- authorName
- repoKey

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

## license/MIT-LICENSE

_Updating `LICENSE` using `overwrite`._

- Generate [MIT license](https://en.wikipedia.org/wiki/MIT_License) file.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└── LICENSE
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Variables</summary>

- authorName

<!---1--></details>

## license/MIT-npm

_Updating `package.json` using `merge-shallow`._

- Link MIT license file into [npm](https://www.npmjs.com/) configuration.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└── package.json
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- npm

<!---1--></details>

<!---1--><details>
<!---1--><summary>Variables</summary>

- authorName
- repoKey

<!---1--></details>

</details>

