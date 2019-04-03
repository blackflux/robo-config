- :open_file_folder: [`xml-merge/@default.json`](#mock-plugin-task-ref-xml-mergedefaultjson)
  - :clipboard: [`xml-merge/task`](#mock-plugin-task-ref-xml-mergetask)

# :open_file_folder: <a name="mock-plugin-task-ref-xml-mergedefaultjson">xml-merge/@default.json</a>

Task collection description.

*Targets:*
```
project
└─ merge-target.xml
```

## :clipboard: <a name="mock-plugin-task-ref-xml-mergetask">xml-merge/task</a>

_Updating `merge-target.xml` using [xml-merge](#mock-plugin-strat-ref-xml-merge)._

- Some purpose.

*Targets:*
```
project
└─ merge-target.xml
```

------
------

## Strategies

### <a name="mock-plugin-strat-ref-xml-merge">xml-merge</a>

Valid for: `xml`

Does a "smart" deep merge.

*Details:*
This will not work as desired for all xml merging, but should for many cases.

