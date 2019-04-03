## Plugin [mock-plugin](https://www.npmjs.com/package/mock-plugin)

### >> `xml-merge/@default`

Task collection description.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└─ merge-target.xml
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

#### >>> xml-merge/task

_Updating `merge-target.xml` using [xml-merge](#mock-plugin-strat-ref-xml-merge)._

- Some purpose.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ merge-target.xml
```

<!---1--></details>

------

<!---0--></details>

### >> `txt-unique-top/@default`

Task collection description.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└─ unique-top.txt
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

#### >>> txt-unique-top/task

_Updating `unique-top.txt` using [unique-top](#mock-plugin-strat-ref-unique-top)._

- Some purpose.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ unique-top.txt
```

<!---1--></details>

------

<!---0--></details>

### >> `txt-overwrite/@default`

Task collection description.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└─ overwrite-target.txt
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

#### >>> txt-overwrite/task

_Updating `overwrite-target.txt` using [overwrite](#mock-plugin-strat-ref-overwrite)._

- Some purpose.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ overwrite-target.txt
```

<!---1--></details>

------

<!---0--></details>

### >> `txt-merge-below-title/@default`

Task collection description.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└─ merge-below-title.txt
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

#### >>> txt-merge-below-title/task

_Updating `merge-below-title.txt` using [merge-below-title](#mock-plugin-strat-ref-merge-below-title)._

- Some purpose.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ merge-below-title.txt
```

<!---1--></details>

------

<!---0--></details>

### >> `misc/@other`

Task collection description.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└─ ${misc}.txt
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Requires</summary>

- [dependency](#mock-plugin-req-ref-dependency)

<!---0--></details>

<!---0--><details>
<!---0--><summary>Variables</summary>

- [misc](#mock-plugin-var-ref-misc)
- [variable](#mock-plugin-var-ref-variable)

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

#### >>> misc/task

_Updating `${misc}.txt` using [overwrite](#mock-plugin-strat-ref-overwrite)._

- Some purpose.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ ${misc}.txt
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- [dependency](#mock-plugin-req-ref-dependency)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Variables</summary>

- [misc](#mock-plugin-var-ref-misc)
- [variable](#mock-plugin-var-ref-variable)

<!---1--></details>

------

<!---0--></details>

### >> `misc/@default`

Task collection description.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└─ ${misc}.txt
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Requires</summary>

- [dependency](#mock-plugin-req-ref-dependency)

<!---0--></details>

<!---0--><details>
<!---0--><summary>Variables</summary>

- [misc](#mock-plugin-var-ref-misc)
- [variable](#mock-plugin-var-ref-variable)

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

#### >>> misc/task

_Updating `${misc}.txt` using [overwrite](#mock-plugin-strat-ref-overwrite)._

- Some purpose.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ ${misc}.txt
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- [dependency](#mock-plugin-req-ref-dependency)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Variables</summary>

- [misc](#mock-plugin-var-ref-misc)
- [variable](#mock-plugin-var-ref-variable)

<!---1--></details>

#### >>> `misc/@other`

Task collection description.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ ${misc}.txt
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- [dependency](#mock-plugin-req-ref-dependency)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Variables</summary>

- [misc](#mock-plugin-var-ref-misc)
- [variable](#mock-plugin-var-ref-variable)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Details</summary>

##### >>>> misc/task

_Updating `${misc}.txt` using [overwrite](#mock-plugin-strat-ref-overwrite)._

- Some purpose.

<!---2--><details>
<!---2--><summary>Targets</summary>

```
project
└─ ${misc}.txt
```

<!---2--></details>

<!---2--><details>
<!---2--><summary>Requires</summary>

- [dependency](#mock-plugin-req-ref-dependency)

<!---2--></details>

<!---2--><details>
<!---2--><summary>Variables</summary>

- [misc](#mock-plugin-var-ref-misc)
- [variable](#mock-plugin-var-ref-variable)

<!---2--></details>

------

<!---1--></details>

#### >>> misc/task

_Updating `${misc}.txt` using [overwrite](#mock-plugin-strat-ref-overwrite)._

- Some purpose.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ ${misc}.txt
```

<!---1--></details>

<!---1--><details>
<!---1--><summary>Requires</summary>

- [dependency](#mock-plugin-req-ref-dependency)

<!---1--></details>

<!---1--><details>
<!---1--><summary>Variables</summary>

- [misc](#mock-plugin-var-ref-misc)
- [variable](#mock-plugin-var-ref-variable)

<!---1--></details>

------

<!---0--></details>

### >> `json-variable-types/@default`

Task collection description.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└─ variables-target.json
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

#### >>> json-variable-types/task

_Updating `variables-target.json` using [overwrite](#mock-plugin-strat-ref-overwrite)._

- Some purpose.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ variables-target.json
```

<!---1--></details>

------

<!---0--></details>

### >> `json-shallow-merge/@default`

Task collection description.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└─ merge-shallow-target.json
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

#### >>> json-shallow-merge/task

_Updating `merge-shallow-target.json` using [merge-shallow](#mock-plugin-strat-ref-merge-shallow)._

- Some purpose.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ merge-shallow-target.json
```

<!---1--></details>

------

<!---0--></details>

### >> `json-deep-merge/@default`

Task collection description.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└─ merge-deep-target.json
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

#### >>> json-deep-merge/task

_Updating `merge-deep-target.json` using [merge-deep](#mock-plugin-strat-ref-merge-deep)._

- Some purpose.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ merge-deep-target.json
```

<!---1--></details>

------

<!---0--></details>

### >> `escaped-variable/@default`

Task collection description.

<!---0--><details>
<!---0--><summary>Targets</summary>

```
project
└─ escaped-variable.txt
```

<!---0--></details>

<!---0--><details>
<!---0--><summary>Details</summary>

#### >>> escaped-variable/task

_Updating `escaped-variable.txt` using [overwrite](#mock-plugin-strat-ref-overwrite)._

- Some purpose.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ escaped-variable.txt
```

<!---1--></details>

</details>

------
------

## Requires

### <a name="mock-plugin-req-ref-dependency">dependency</a>

[Website](https://www.some-tool-name.com)

Short description about this dependency.

<!---0--><details>
<!---0--><summary>Details</summary>

Detailed description about this dependency and how it's used.

<!---0--></details>

------
------

## Variables

### <a name="mock-plugin-var-ref-misc">misc</a>

Type: `string`

Short description of what this variable does.

<!---0--><details>
<!---0--><summary>Details</summary>

Detailed description of what this variable does.

<!---0--></details>

### <a name="mock-plugin-var-ref-variable">variable</a>

Type: `string`

Short description of what this variable does.

<!---0--><details>
<!---0--><summary>Details</summary>

Detailed description of what this variable does.

<!---0--></details>

------
------

## Strategies

### <a name="mock-plugin-strat-ref-xml-merge">xml-merge</a>

Valid for: `xml`

Does a "smart" deep merge.

<!---0--><details>
<!---0--><summary>Details</summary>

This will not work for all xml merging, but should for many.

<!---0--></details>

### <a name="mock-plugin-strat-ref-unique-top">unique-top</a>

Valid for: `list`

Merges content at the top of the file and removes existing, duplicate lines.

<!---0--><details>
<!---0--><summary>Details</summary>

Very useful for managing e.g. `.gitignore`.

<!---0--></details>

### <a name="mock-plugin-strat-ref-overwrite">overwrite</a>

Valid for: `any`

Simply replace the old with the new content.

### <a name="mock-plugin-strat-ref-merge-below-title">merge-below-title</a>

Valid for: `list`, `nostruct`

Merges content below title.

### <a name="mock-plugin-strat-ref-merge-shallow">merge-shallow</a>

Valid for: `json`, `yml`

Does a shallow merge aka `Object.assign()`.

<!---0--><details>
<!---0--><summary>Details</summary>

Useful when specific keys of the target need to be overwritten.

<!---0--></details>

### <a name="mock-plugin-strat-ref-merge-deep">merge-deep</a>

Valid for: `json`, `yml`

Does a "smart" deep merge.

<!---0--><details>
<!---0--><summary>Details</summary>

This will not work for all object deep merging, but should for many cases.

<!---0--></details>

