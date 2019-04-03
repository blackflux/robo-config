- :open_file_folder: <a href="#mock-plugin-task-ref-xml-mergedefaultjson">`xml-merge/@default.json`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-xml-mergetask">`xml-merge/task`</a>

# :open_file_folder: <a name="mock-plugin-task-ref-xml-mergedefaultjson">xml-merge/@default.json</a>

Task collection description.

*Targets:*
```
project
└─ merge-target.xml
```

## :clipboard: <a name="mock-plugin-task-ref-xml-mergetask">xml-merge/task</a>

_Updating `merge-target.xml` using <a href="#mock-plugin-strat-ref-xml-merge">xml-merge</a>._

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

