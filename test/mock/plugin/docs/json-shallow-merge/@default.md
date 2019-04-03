- :open_file_folder: <a href="#mock-plugin-task-ref-json-shallow-mergedefaultjson">`json-shallow-merge/@default.json`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-json-shallow-mergetask">`json-shallow-merge/task`</a>

# :open_file_folder: <a name="mock-plugin-task-ref-json-shallow-mergedefaultjson">json-shallow-merge/@default.json</a>

Task collection description.

*Targets:*
```
project
└─ merge-shallow-target.json
```

## :clipboard: <a name="mock-plugin-task-ref-json-shallow-mergetask">json-shallow-merge/task</a>

_Updating `merge-shallow-target.json` using <a href="#mock-plugin-strat-ref-merge-shallow">merge-shallow</a>._

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

