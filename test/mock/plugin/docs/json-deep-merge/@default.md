- <a name="mock-plugin-task-idx-ref-json-deep-mergedefaultjson">:open_file_folder:</a> <a href="#mock-plugin-task-ref-json-deep-mergedefaultjson">`json-deep-merge/@default.json`</a>
  - <a name="mock-plugin-task-idx-ref-json-deep-mergetask">:clipboard:</a> <a href="#mock-plugin-task-ref-json-deep-mergetask">`json-deep-merge/task`</a>

# :open_file_folder: <a name="mock-plugin-task-ref-json-deep-mergedefaultjson">json-deep-merge/@default.json</a> (<a href="#mock-plugin-task-idx-ref-json-deep-mergedefaultjson">:arrow_heading_up:</a>)

Task collection description.

<table>
  <tbody>
    <tr>
      <th>Targets</th>
    </tr>
    <tr>
      <td align="left" valign="top">
        <ul>
<code>project</code><br/>
<code>└─ merge-deep-target.json</code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## :clipboard: <a name="mock-plugin-task-ref-json-deep-mergetask">json-deep-merge/task</a> (<a href="#mock-plugin-task-idx-ref-json-deep-mergetask">:arrow_heading_up:</a>)

_Updating `merge-deep-target.json` using <a href="#mock-plugin-strat-ref-merge-deep">merge-deep</a>._

- Some purpose.

<table>
  <tbody>
    <tr>
      <th>Targets</th>
    </tr>
    <tr>
      <td align="left" valign="top">
        <ul>
<code>project</code><br/>
<code>└─ merge-deep-target.json</code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

------

## Strategies

### <a name="mock-plugin-strat-ref-merge-deep">merge-deep</a>  

:small_blue_diamond: `json`, `yml`

*Does a "smart" deep merge.*

This will not work as desired for all object deep merging, but should for many cases.

