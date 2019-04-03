- :open_file_folder: <a href="#mock-plugin-task-ref-txt-unique-topdefaultjson">`txt-unique-top/@default.json`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-txt-unique-toptask">`txt-unique-top/task`</a>

# :open_file_folder: <a name="mock-plugin-task-ref-txt-unique-topdefaultjson">txt-unique-top/@default.json</a>

Task collection description.

<table>
  <tbody>
    <tr>
    </tr>
    <tr>
      <td valign="top">
        <ul>
          <code>project</code><br/>
          <code>└─ unique-top.txt</code><br/>
        </ul>
      </td>
  </tbody>
</table>

## :clipboard: <a name="mock-plugin-task-ref-txt-unique-toptask">txt-unique-top/task</a>

_Updating `unique-top.txt` using <a href="#mock-plugin-strat-ref-unique-top">unique-top</a>._

- Some purpose.

<table>
  <tbody>
    <tr>
    </tr>
    <tr>
      <td valign="top">
        <ul>
          <code>project</code><br/>
          <code>└─ unique-top.txt</code><br/>
        </ul>
      </td>
  </tbody>
</table>

------
------

## Strategies

### <a name="mock-plugin-strat-ref-unique-top">unique-top</a>

Valid for: `list`

Merges content at the top of the file and removes existing, duplicate lines.

*Details:*
Useful for managing e.g. `.gitignore` when the original content should be kept.

