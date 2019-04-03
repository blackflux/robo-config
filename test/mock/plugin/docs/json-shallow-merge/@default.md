- :open_file_folder: [`json-shallow-merge/@default.json`](#mock-plugin-task-ref-json-shallow-mergedefaultjson)
  - :clipboard: [`json-shallow-merge/task`](#mock-plugin-task-ref-json-shallow-mergetask)

# :open_file_folder: <a name="mock-plugin-task-ref-json-shallow-mergedefaultjson">json-shallow-merge/@default.json</a>

Task collection description.

*Targets:*
```
project
└─ merge-shallow-target.json
```

## :clipboard: <a name="mock-plugin-task-ref-json-shallow-mergetask">json-shallow-merge/task</a>

_Updating `merge-shallow-target.json` using [merge-shallow](#mock-plugin-strat-ref-merge-shallow)._

- Some purpose.

*Targets:*
```
project
└─ merge-shallow-target.json
```

------
------

## Strategies

### <a name="mock-plugin-strat-ref-merge-shallow">merge-shallow</a>

Valid for: `json`, `yml`

Does a shallow merge aka `Object.assign()`.

*Details:*
Useful when specific keys of the target need to be overwritten.

