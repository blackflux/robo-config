# `jetbrains/@default.json`

Recommended base configuration when using Jetbrains.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└── .idea
    └── ${projectName}.iml
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Requires</summary>

- jetbrains
- nyc

<!---0--></details>

<!---0--><details>
<!---0--><summary>Variables</summary>

- projectName

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

## jetbrains/exclude-coverage-folder

_Updating `.idea/${projectName}.iml` using `xml-merge`._

- Mark `coverage` Folder as excluded in Jetbrains.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└── .idea
    └── ${projectName}.iml
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- jetbrains
- nyc

<!---1--></details>

<!---1--><details>
<!---1--><summary>Variables</summary>

- projectName

<!---1--></details>

</details>

