- [`txt-unique-top/@default.json`](#mock-plugin-task-ref-txt-unique-topdefaultjson)
  - [`txt-unique-top/task`](#mock-plugin-task-ref-txt-unique-toptask)

#  `txt-unique-top/@default.json`

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

## <a name="mock-plugin-task-ref-txt-unique-toptask">txt-unique-top/task</a>

_Updating `unique-top.txt` using [unique-top](#mock-plugin-strat-ref-unique-top)._

- Some purpose.

<!---1--><details>
<!---1--><summary>Targets</summary>

```
project
└─ unique-top.txt
```

<!---1--></details>

</details>

------
------

## Strategies

### <a name="mock-plugin-strat-ref-unique-top">unique-top</a>

Valid for: `list`

Merges content at the top of the file and removes existing, duplicate lines.

<!---0--><details>
<!---0--><summary>Details</summary>

Useful for managing e.g. `.gitignore` when the original content should be kept.

<!---0--></details>

