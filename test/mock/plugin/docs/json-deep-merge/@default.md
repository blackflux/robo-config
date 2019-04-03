- :open_file_folder: <a href="#mock-plugin-task-ref-json-deep-mergedefaultjson">`json-deep-merge/@default.json`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-json-deep-mergetask">`json-deep-merge/task`</a>

# :open_file_folder: <a name="mock-plugin-task-ref-json-deep-mergedefaultjson">json-deep-merge/@default.json</a>

Task collection description.

<table>
  <tbody>
    <tr>
    </tr>
    <tr>
      <td valign="top">
        <ul>
          <code>project</code><br/>
          <code>└─ merge-deep-target.json</code><br/>
        </ul>
      </td>
  </tbody>
</table>

## :clipboard: <a name="mock-plugin-task-ref-json-deep-mergetask">json-deep-merge/task</a>

_Updating `merge-deep-target.json` using <a href="#mock-plugin-strat-ref-merge-deep">merge-deep</a>._

- Some purpose.

<table>
  <tbody>
    <tr>
    </tr>
    <tr>
      <td valign="top">
        <ul>
          <code>project</code><br/>
          <code>└─ merge-deep-target.json</code><br/>
        </ul>
      </td>
  </tbody>
</table>

------
------

## Strategies

### <a name="mock-plugin-strat-ref-merge-deep">merge-deep</a>

Valid for: `json`, `yml`

Does a "smart" deep merge.

*Details:*
This will not work as desired for all object deep merging, but should for many cases.

