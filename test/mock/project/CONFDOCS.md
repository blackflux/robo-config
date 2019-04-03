## Plugin [mock-plugin](https://www.npmjs.com/package/mock-plugin)

- :open_file_folder: <a href="#mock-plugin-task-ref-xml-mergedefault">`xml-merge/@default`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-xml-mergetask">`xml-merge/task`</a>
- :open_file_folder: <a href="#mock-plugin-task-ref-txt-unique-topdefault">`txt-unique-top/@default`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-txt-unique-toptask">`txt-unique-top/task`</a>
- :open_file_folder: <a href="#mock-plugin-task-ref-txt-overwritedefault">`txt-overwrite/@default`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-txt-overwritetask">`txt-overwrite/task`</a>
- :open_file_folder: <a href="#mock-plugin-task-ref-txt-merge-below-titledefault">`txt-merge-below-title/@default`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-txt-merge-below-titletask">`txt-merge-below-title/task`</a>
- :open_file_folder: <a href="#mock-plugin-task-ref-miscother">`misc/@other`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-misctask">`misc/task`</a>
- :open_file_folder: <a href="#mock-plugin-task-ref-miscdefault">`misc/@default`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-misctask">`misc/task`</a>
  - :open_file_folder: <a href="#mock-plugin-task-ref-miscother">`misc/@other`</a>
    - :clipboard: <a href="#mock-plugin-task-ref-misctask">`misc/task`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-misctask">`misc/task`</a>
- :open_file_folder: <a href="#mock-plugin-task-ref-json-variable-typesdefault">`json-variable-types/@default`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-json-variable-typestask">`json-variable-types/task`</a>
- :open_file_folder: <a href="#mock-plugin-task-ref-json-shallow-mergedefault">`json-shallow-merge/@default`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-json-shallow-mergetask">`json-shallow-merge/task`</a>
- :open_file_folder: <a href="#mock-plugin-task-ref-json-deep-mergedefault">`json-deep-merge/@default`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-json-deep-mergetask">`json-deep-merge/task`</a>
- :open_file_folder: <a href="#mock-plugin-task-ref-escaped-variabledefault">`escaped-variable/@default`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-escaped-variabletask">`escaped-variable/task`</a>

### :open_file_folder: <a name="mock-plugin-task-ref-xml-mergedefault">xml-merge/@default</a>

Task collection description.

*Targets:*
```
project
└─ merge-target.xml
```

#### :clipboard: <a name="mock-plugin-task-ref-xml-mergetask">xml-merge/task</a>

_Updating `merge-target.xml` using <a href="#mock-plugin-strat-ref-xml-merge">xml-merge</a>._

- Some purpose.

*Targets:*
```
project
└─ merge-target.xml
```

### :open_file_folder: <a name="mock-plugin-task-ref-txt-unique-topdefault">txt-unique-top/@default</a>

Task collection description.

*Targets:*
```
project
└─ unique-top.txt
```

#### :clipboard: <a name="mock-plugin-task-ref-txt-unique-toptask">txt-unique-top/task</a>

_Updating `unique-top.txt` using <a href="#mock-plugin-strat-ref-unique-top">unique-top</a>._

- Some purpose.

*Targets:*
```
project
└─ unique-top.txt
```

### :open_file_folder: <a name="mock-plugin-task-ref-txt-overwritedefault">txt-overwrite/@default</a>

Task collection description.

*Targets:*
```
project
└─ overwrite-target.txt
```

#### :clipboard: <a name="mock-plugin-task-ref-txt-overwritetask">txt-overwrite/task</a>

_Updating `overwrite-target.txt` using <a href="#mock-plugin-strat-ref-overwrite">overwrite</a>._

- Some purpose.

*Targets:*
```
project
└─ overwrite-target.txt
```

### :open_file_folder: <a name="mock-plugin-task-ref-txt-merge-below-titledefault">txt-merge-below-title/@default</a>

Task collection description.

*Targets:*
```
project
└─ merge-below-title.txt
```

#### :clipboard: <a name="mock-plugin-task-ref-txt-merge-below-titletask">txt-merge-below-title/task</a>

_Updating `merge-below-title.txt` using <a href="#mock-plugin-strat-ref-merge-below-title">merge-below-title</a>._

- Some purpose.

*Targets:*
```
project
└─ merge-below-title.txt
```

### :open_file_folder: <a name="mock-plugin-task-ref-miscother">misc/@other</a>

Task collection description.

*Targets:*
```
project
└─ ${misc}.txt
```

<table>
  <tbody>
    <tr>
      <th>Requires</th>
      <th>Variables</th>
    </tr>
    <tr>
      <td>
        <ul>
          <li><a href="#mock-plugin-req-ref-dependency">dependency</a></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><a href="#mock-plugin-var-ref-misc">misc</a></li>
          <li><a href="#mock-plugin-var-ref-variable">variable</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### :clipboard: <a name="mock-plugin-task-ref-misctask">misc/task</a>

_Updating `${misc}.txt` using <a href="#mock-plugin-strat-ref-overwrite">overwrite</a>._

- Some purpose.

*Targets:*
```
project
└─ ${misc}.txt
```

<table>
  <tbody>
    <tr>
      <th>Requires</th>
      <th>Variables</th>
    </tr>
    <tr>
      <td>
        <ul>
          <li><a href="#mock-plugin-req-ref-dependency">dependency</a></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><a href="#mock-plugin-var-ref-misc">misc</a></li>
          <li><a href="#mock-plugin-var-ref-variable">variable</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### :open_file_folder: <a name="mock-plugin-task-ref-miscdefault">misc/@default</a>

Task collection description.

*Targets:*
```
project
└─ ${misc}.txt
```

<table>
  <tbody>
    <tr>
      <th>Requires</th>
      <th>Variables</th>
    </tr>
    <tr>
      <td>
        <ul>
          <li><a href="#mock-plugin-req-ref-dependency">dependency</a></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><a href="#mock-plugin-var-ref-misc">misc</a></li>
          <li><a href="#mock-plugin-var-ref-variable">variable</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### :clipboard: <a name="mock-plugin-task-ref-misctask">misc/task</a>

_Updating `${misc}.txt` using <a href="#mock-plugin-strat-ref-overwrite">overwrite</a>._

- Some purpose.

*Targets:*
```
project
└─ ${misc}.txt
```

<table>
  <tbody>
    <tr>
      <th>Requires</th>
      <th>Variables</th>
    </tr>
    <tr>
      <td>
        <ul>
          <li><a href="#mock-plugin-req-ref-dependency">dependency</a></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><a href="#mock-plugin-var-ref-misc">misc</a></li>
          <li><a href="#mock-plugin-var-ref-variable">variable</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### :open_file_folder: <a name="mock-plugin-task-ref-miscother">misc/@other</a>

Task collection description.

*Targets:*
```
project
└─ ${misc}.txt
```

<table>
  <tbody>
    <tr>
      <th>Requires</th>
      <th>Variables</th>
    </tr>
    <tr>
      <td>
        <ul>
          <li><a href="#mock-plugin-req-ref-dependency">dependency</a></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><a href="#mock-plugin-var-ref-misc">misc</a></li>
          <li><a href="#mock-plugin-var-ref-variable">variable</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

##### :clipboard: <a name="mock-plugin-task-ref-misctask">misc/task</a>

_Updating `${misc}.txt` using <a href="#mock-plugin-strat-ref-overwrite">overwrite</a>._

- Some purpose.

*Targets:*
```
project
└─ ${misc}.txt
```

<table>
  <tbody>
    <tr>
      <th>Requires</th>
      <th>Variables</th>
    </tr>
    <tr>
      <td>
        <ul>
          <li><a href="#mock-plugin-req-ref-dependency">dependency</a></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><a href="#mock-plugin-var-ref-misc">misc</a></li>
          <li><a href="#mock-plugin-var-ref-variable">variable</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### :clipboard: <a name="mock-plugin-task-ref-misctask">misc/task</a>

_Updating `${misc}.txt` using <a href="#mock-plugin-strat-ref-overwrite">overwrite</a>._

- Some purpose.

*Targets:*
```
project
└─ ${misc}.txt
```

<table>
  <tbody>
    <tr>
      <th>Requires</th>
      <th>Variables</th>
    </tr>
    <tr>
      <td>
        <ul>
          <li><a href="#mock-plugin-req-ref-dependency">dependency</a></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><a href="#mock-plugin-var-ref-misc">misc</a></li>
          <li><a href="#mock-plugin-var-ref-variable">variable</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### :open_file_folder: <a name="mock-plugin-task-ref-json-variable-typesdefault">json-variable-types/@default</a>

Task collection description.

*Targets:*
```
project
└─ variables-target.json
```

#### :clipboard: <a name="mock-plugin-task-ref-json-variable-typestask">json-variable-types/task</a>

_Updating `variables-target.json` using <a href="#mock-plugin-strat-ref-overwrite">overwrite</a>._

- Some purpose.

*Targets:*
```
project
└─ variables-target.json
```

### :open_file_folder: <a name="mock-plugin-task-ref-json-shallow-mergedefault">json-shallow-merge/@default</a>

Task collection description.

*Targets:*
```
project
└─ merge-shallow-target.json
```

#### :clipboard: <a name="mock-plugin-task-ref-json-shallow-mergetask">json-shallow-merge/task</a>

_Updating `merge-shallow-target.json` using <a href="#mock-plugin-strat-ref-merge-shallow">merge-shallow</a>._

- Some purpose.

*Targets:*
```
project
└─ merge-shallow-target.json
```

### :open_file_folder: <a name="mock-plugin-task-ref-json-deep-mergedefault">json-deep-merge/@default</a>

Task collection description.

*Targets:*
```
project
└─ merge-deep-target.json
```

#### :clipboard: <a name="mock-plugin-task-ref-json-deep-mergetask">json-deep-merge/task</a>

_Updating `merge-deep-target.json` using <a href="#mock-plugin-strat-ref-merge-deep">merge-deep</a>._

- Some purpose.

*Targets:*
```
project
└─ merge-deep-target.json
```

### :open_file_folder: <a name="mock-plugin-task-ref-escaped-variabledefault">escaped-variable/@default</a>

Task collection description.

*Targets:*
```
project
└─ escaped-variable.txt
```

#### :clipboard: <a name="mock-plugin-task-ref-escaped-variabletask">escaped-variable/task</a>

_Updating `escaped-variable.txt` using <a href="#mock-plugin-strat-ref-overwrite">overwrite</a>._

- Some purpose.

*Targets:*
```
project
└─ escaped-variable.txt
```

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

