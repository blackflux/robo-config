- :open_file_folder: [`misc/@other.json`](#mock-plugin-task-ref-miscotherjson)
  - :clipboard: [`misc/task`](#mock-plugin-task-ref-misctask)

# :open_file_folder: <a name="mock-plugin-task-ref-miscotherjson">misc/@other.json</a>

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

## :clipboard: <a name="mock-plugin-task-ref-misctask">misc/task</a>

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

### <a name="mock-plugin-strat-ref-overwrite">overwrite</a>

Valid for: `any`

Simply replace the old with the new content.

