- [`txt-unique-top/@default.json`](#mock-plugin-task-ref-txt-unique-topdefaultjson)
  - [`txt-unique-top/task`](#mock-plugin-task-ref-txt-unique-toptask)

# <a name="mock-plugin-task-ref-txt-unique-topdefaultjson">txt-unique-top/@default.json</a>

Task collection description.

*Targets:*
```
project
└─ unique-top.txt
```

*Details:*
## <a name="mock-plugin-task-ref-txt-unique-toptask">txt-unique-top/task</a>

_Updating `unique-top.txt` using [unique-top](#mock-plugin-strat-ref-unique-top)._

- Some purpose.

*Targets:*
```
project
└─ unique-top.txt
```

</details>

------
------

## Strategies

### <a name="mock-plugin-strat-ref-unique-top">unique-top</a>

Valid for: `list`

Merges content at the top of the file and removes existing, duplicate lines.

*Details:*
Useful for managing e.g. `.gitignore` when the original content should be kept.

