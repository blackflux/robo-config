## Plugin [mock-plugin](https://www.npmjs.com/package/mock-plugin)

- [`xml-merge/@default`](#mock-plugin-task-ref-xml-mergedefault)
  - [`xml-merge/task`](#mock-plugin-task-ref-xml-mergetask)
- [`txt-unique-top/@default`](#mock-plugin-task-ref-txt-unique-topdefault)
  - [`txt-unique-top/task`](#mock-plugin-task-ref-txt-unique-toptask)
- [`txt-overwrite/@default`](#mock-plugin-task-ref-txt-overwritedefault)
  - [`txt-overwrite/task`](#mock-plugin-task-ref-txt-overwritetask)
- [`txt-merge-below-title/@default`](#mock-plugin-task-ref-txt-merge-below-titledefault)
  - [`txt-merge-below-title/task`](#mock-plugin-task-ref-txt-merge-below-titletask)
- [`misc/@other`](#mock-plugin-task-ref-miscother)
  - [`misc/task`](#mock-plugin-task-ref-misctask)
- [`misc/@default`](#mock-plugin-task-ref-miscdefault)
  - [`misc/task`](#mock-plugin-task-ref-misctask)
  - [`misc/@other`](#mock-plugin-task-ref-miscother)
    - [`misc/task`](#mock-plugin-task-ref-misctask)
  - [`misc/task`](#mock-plugin-task-ref-misctask)
- [`json-variable-types/@default`](#mock-plugin-task-ref-json-variable-typesdefault)
  - [`json-variable-types/task`](#mock-plugin-task-ref-json-variable-typestask)
- [`json-shallow-merge/@default`](#mock-plugin-task-ref-json-shallow-mergedefault)
  - [`json-shallow-merge/task`](#mock-plugin-task-ref-json-shallow-mergetask)
- [`json-deep-merge/@default`](#mock-plugin-task-ref-json-deep-mergedefault)
  - [`json-deep-merge/task`](#mock-plugin-task-ref-json-deep-mergetask)
- [`escaped-variable/@default`](#mock-plugin-task-ref-escaped-variabledefault)
  - [`escaped-variable/task`](#mock-plugin-task-ref-escaped-variabletask)

### <a name="mock-plugin-task-ref-xml-mergedefault">xml-merge/@default</a>

Task collection description.

*Targets:*
```
project
└─ merge-target.xml
```

*Details:*
#### <a name="mock-plugin-task-ref-xml-mergetask">xml-merge/task</a>

_Updating `merge-target.xml` using [xml-merge](#mock-plugin-strat-ref-xml-merge)._

- Some purpose.

*Targets:*
```
project
└─ merge-target.xml
```

------

### <a name="mock-plugin-task-ref-txt-unique-topdefault">txt-unique-top/@default</a>

Task collection description.

*Targets:*
```
project
└─ unique-top.txt
```

*Details:*
#### <a name="mock-plugin-task-ref-txt-unique-toptask">txt-unique-top/task</a>

_Updating `unique-top.txt` using [unique-top](#mock-plugin-strat-ref-unique-top)._

- Some purpose.

*Targets:*
```
project
└─ unique-top.txt
```

------

### <a name="mock-plugin-task-ref-txt-overwritedefault">txt-overwrite/@default</a>

Task collection description.

*Targets:*
```
project
└─ overwrite-target.txt
```

*Details:*
#### <a name="mock-plugin-task-ref-txt-overwritetask">txt-overwrite/task</a>

_Updating `overwrite-target.txt` using [overwrite](#mock-plugin-strat-ref-overwrite)._

- Some purpose.

*Targets:*
```
project
└─ overwrite-target.txt
```

------

### <a name="mock-plugin-task-ref-txt-merge-below-titledefault">txt-merge-below-title/@default</a>

Task collection description.

*Targets:*
```
project
└─ merge-below-title.txt
```

*Details:*
#### <a name="mock-plugin-task-ref-txt-merge-below-titletask">txt-merge-below-title/task</a>

_Updating `merge-below-title.txt` using [merge-below-title](#mock-plugin-strat-ref-merge-below-title)._

- Some purpose.

*Targets:*
```
project
└─ merge-below-title.txt
```

------

### <a name="mock-plugin-task-ref-miscother">misc/@other</a>

Task collection description.

*Targets:*
```
project
└─ ${misc}.txt
```

*Requires:*
- [dependency](#mock-plugin-req-ref-dependency)

*Variables:*
- [misc](#mock-plugin-var-ref-misc)
- [variable](#mock-plugin-var-ref-variable)

*Details:*
#### <a name="mock-plugin-task-ref-misctask">misc/task</a>

_Updating `${misc}.txt` using [overwrite](#mock-plugin-strat-ref-overwrite)._

- Some purpose.

*Targets:*
```
project
└─ ${misc}.txt
```

*Requires:*
- [dependency](#mock-plugin-req-ref-dependency)

*Variables:*
- [misc](#mock-plugin-var-ref-misc)
- [variable](#mock-plugin-var-ref-variable)

------

### <a name="mock-plugin-task-ref-miscdefault">misc/@default</a>

Task collection description.

*Targets:*
```
project
└─ ${misc}.txt
```

*Requires:*
- [dependency](#mock-plugin-req-ref-dependency)

*Variables:*
- [misc](#mock-plugin-var-ref-misc)
- [variable](#mock-plugin-var-ref-variable)

*Details:*
#### <a name="mock-plugin-task-ref-misctask">misc/task</a>

_Updating `${misc}.txt` using [overwrite](#mock-plugin-strat-ref-overwrite)._

- Some purpose.

*Targets:*
```
project
└─ ${misc}.txt
```

*Requires:*
- [dependency](#mock-plugin-req-ref-dependency)

*Variables:*
- [misc](#mock-plugin-var-ref-misc)
- [variable](#mock-plugin-var-ref-variable)

#### <a name="mock-plugin-task-ref-miscother">misc/@other</a>

Task collection description.

*Targets:*
```
project
└─ ${misc}.txt
```

*Requires:*
- [dependency](#mock-plugin-req-ref-dependency)

*Variables:*
- [misc](#mock-plugin-var-ref-misc)
- [variable](#mock-plugin-var-ref-variable)

*Details:*
##### <a name="mock-plugin-task-ref-misctask">misc/task</a>

_Updating `${misc}.txt` using [overwrite](#mock-plugin-strat-ref-overwrite)._

- Some purpose.

*Targets:*
```
project
└─ ${misc}.txt
```

*Requires:*
- [dependency](#mock-plugin-req-ref-dependency)

*Variables:*
- [misc](#mock-plugin-var-ref-misc)
- [variable](#mock-plugin-var-ref-variable)

------

#### <a name="mock-plugin-task-ref-misctask">misc/task</a>

_Updating `${misc}.txt` using [overwrite](#mock-plugin-strat-ref-overwrite)._

- Some purpose.

*Targets:*
```
project
└─ ${misc}.txt
```

*Requires:*
- [dependency](#mock-plugin-req-ref-dependency)

*Variables:*
- [misc](#mock-plugin-var-ref-misc)
- [variable](#mock-plugin-var-ref-variable)

------

### <a name="mock-plugin-task-ref-json-variable-typesdefault">json-variable-types/@default</a>

Task collection description.

*Targets:*
```
project
└─ variables-target.json
```

*Details:*
#### <a name="mock-plugin-task-ref-json-variable-typestask">json-variable-types/task</a>

_Updating `variables-target.json` using [overwrite](#mock-plugin-strat-ref-overwrite)._

- Some purpose.

*Targets:*
```
project
└─ variables-target.json
```

------

### <a name="mock-plugin-task-ref-json-shallow-mergedefault">json-shallow-merge/@default</a>

Task collection description.

*Targets:*
```
project
└─ merge-shallow-target.json
```

*Details:*
#### <a name="mock-plugin-task-ref-json-shallow-mergetask">json-shallow-merge/task</a>

_Updating `merge-shallow-target.json` using [merge-shallow](#mock-plugin-strat-ref-merge-shallow)._

- Some purpose.

*Targets:*
```
project
└─ merge-shallow-target.json
```

------

### <a name="mock-plugin-task-ref-json-deep-mergedefault">json-deep-merge/@default</a>

Task collection description.

*Targets:*
```
project
└─ merge-deep-target.json
```

*Details:*
#### <a name="mock-plugin-task-ref-json-deep-mergetask">json-deep-merge/task</a>

_Updating `merge-deep-target.json` using [merge-deep](#mock-plugin-strat-ref-merge-deep)._

- Some purpose.

*Targets:*
```
project
└─ merge-deep-target.json
```

------

### <a name="mock-plugin-task-ref-escaped-variabledefault">escaped-variable/@default</a>

Task collection description.

*Targets:*
```
project
└─ escaped-variable.txt
```

*Details:*
#### <a name="mock-plugin-task-ref-escaped-variabletask">escaped-variable/task</a>

_Updating `escaped-variable.txt` using [overwrite](#mock-plugin-strat-ref-overwrite)._

- Some purpose.

*Targets:*
```
project
└─ escaped-variable.txt
```

</details>

------
------

## Requires

### <a name="mock-plugin-req-ref-dependency">dependency</a>

[Website](https://www.some-tool-name.com)

Short description about this dependency.

*Details:*
Detailed description about this dependency and how it's used.

------
------

## Variables

### <a name="mock-plugin-var-ref-misc">misc</a>

Type: `string`

Short description of what this variable does.

*Details:*
Detailed description of what this variable does.

### <a name="mock-plugin-var-ref-variable">variable</a>

Type: `string`

Short description of what this variable does.

*Details:*
Detailed description of what this variable does.

------
------

## Strategies

### <a name="mock-plugin-strat-ref-xml-merge">xml-merge</a>

Valid for: `xml`

Does a "smart" deep merge.

*Details:*
This will not work as desired for all xml merging, but should for many cases.

### <a name="mock-plugin-strat-ref-unique-top">unique-top</a>

Valid for: `list`

Merges content at the top of the file and removes existing, duplicate lines.

*Details:*
Useful for managing e.g. `.gitignore` when the original content should be kept.

### <a name="mock-plugin-strat-ref-overwrite">overwrite</a>

Valid for: `any`

Simply replace the old with the new content.

### <a name="mock-plugin-strat-ref-merge-below-title">merge-below-title</a>

Valid for: `list`, `nostruct`

Merges content below title.

### <a name="mock-plugin-strat-ref-merge-shallow">merge-shallow</a>

Valid for: `json`, `yml`

Does a shallow merge aka `Object.assign()`.

*Details:*
Useful when specific keys of the target need to be overwritten.

### <a name="mock-plugin-strat-ref-merge-deep">merge-deep</a>

Valid for: `json`, `yml`

Does a "smart" deep merge.

*Details:*
This will not work as desired for all object deep merging, but should for many cases.

