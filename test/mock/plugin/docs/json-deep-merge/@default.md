- [`json-deep-merge/@default.json`](#mock-plugin-task-ref-json-deep-mergedefaultjson)
  - [`json-deep-merge/task`](#mock-plugin-task-ref-json-deep-mergetask)

# <a name="mock-plugin-task-ref-json-deep-mergedefaultjson">json-deep-merge/@default.json</a>

Task collection description.

*Targets:*
```
project
└─ merge-deep-target.json
```

*Details:*
## <a name="mock-plugin-task-ref-json-deep-mergetask">json-deep-merge/task</a>

_Updating `merge-deep-target.json` using [merge-deep](#mock-plugin-strat-ref-merge-deep)._

- Some purpose.

*Targets:*
```
project
└─ merge-deep-target.json
```

</details>

------
------

## Strategies

### <a name="mock-plugin-strat-ref-merge-deep">merge-deep</a>

Valid for: `json`, `yml`

Does a "smart" deep merge.

*Details:*
This will not work as desired for all object deep merging, but should for many cases.

