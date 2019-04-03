- [`json-deep-merge/@default.json`](#mock-plugin-task-ref-json-deep-mergedefaultjson)
  - [`json-deep-merge/task`](#mock-plugin-task-ref-json-deep-mergetask)

#  `json-deep-merge/@default.json`

Task collection description.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└─ merge-deep-target.json
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

## <a name="mock-plugin-task-ref-json-deep-mergetask">json-deep-merge/task</a>

_Updating `merge-deep-target.json` using [merge-deep](#mock-plugin-strat-ref-merge-deep)._

- Some purpose.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ merge-deep-target.json
```

<!---1--></details>

</details>

------
------

## Strategies

### <a name="mock-plugin-strat-ref-merge-deep">merge-deep</a>

Valid for: `json`, `yml`

Does a "smart" deep merge.

<!---0--><details>
<!---0--><summary>Details</summary>

This will not work as desired for all object deep merging, but should for many cases.

<!---0--></details>

