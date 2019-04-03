- [`json-shallow-merge/@default.json`](#mock-plugin-task-ref-json-shallow-mergedefaultjson)
  - [`json-shallow-merge/task`](#mock-plugin-task-ref-json-shallow-mergetask)

#  `json-shallow-merge/@default.json`

Task collection description.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└─ merge-shallow-target.json
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

## <a name="mock-plugin-task-ref-json-shallow-mergetask">json-shallow-merge/task</a>

_Updating `merge-shallow-target.json` using [merge-shallow](#mock-plugin-strat-ref-merge-shallow)._

- Some purpose.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ merge-shallow-target.json
```

<!---1--></details>

</details>

------
------

## Strategies

### <a name="mock-plugin-strat-ref-merge-shallow">merge-shallow</a>

Valid for: `json`, `yml`

Does a shallow merge aka `Object.assign()`.

<!---0--><details>
<!---0--><summary>Details</summary>

Useful when specific keys of the target need to be overwritten.

<!---0--></details>

