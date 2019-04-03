- [`xml-merge/@default.json`](#mock-plugin-task-ref-xml-mergedefaultjson)
  - [`xml-merge/task`](#mock-plugin-task-ref-xml-mergetask)

# <a name="mock-plugin-task-ref-xml-mergedefaultjson">xml-merge/@default.json</a>

Task collection description.

*Targets:*
```
project
└─ merge-target.xml
```

*Details:*
## <a name="mock-plugin-task-ref-xml-mergetask">xml-merge/task</a>

_Updating `merge-target.xml` using [xml-merge](#mock-plugin-strat-ref-xml-merge)._

- Some purpose.

*Targets:*
```
project
└─ merge-target.xml
```

</details>

------
------

## Strategies

### <a name="mock-plugin-strat-ref-xml-merge">xml-merge</a>

Valid for: `xml`

Does a "smart" deep merge.

*Details:*
This will not work as desired for all xml merging, but should for many cases.

