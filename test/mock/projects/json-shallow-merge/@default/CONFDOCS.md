## Plugin [mock-plugin](https://www.npmjs.com/package/mock-plugin)

- <a name="mock-plugin-task-idx-ref-json-shallow-mergedefault">:open_file_folder:</a> <a href="#mock-plugin-task-ref-json-shallow-mergedefault">`json-shallow-merge/@default`</a>
  - <a name="mock-plugin-task-idx-ref-json-shallow-mergetask">:clipboard:</a> <a href="#mock-plugin-task-ref-json-shallow-mergetask">`json-shallow-merge/task`</a>

### :open_file_folder: <a name="mock-plugin-task-ref-json-shallow-mergedefault">json-shallow-merge/@default</a> (<a href="#mock-plugin-task-idx-ref-json-shallow-mergedefault">`index`</a>)

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
<code>└─&nbsp;<a href="#mock-plugin-target-ref-merge-shallow-targetjson">merge-shallow-target.json</a></code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### :clipboard: <a name="mock-plugin-task-ref-json-shallow-mergetask">json-shallow-merge/task</a> (<a href="#mock-plugin-task-idx-ref-json-shallow-mergetask">`index`</a>)

_Updating <a href="#mock-plugin-target-ref-merge-shallow-targetjson">merge-shallow-target.json</a> using <a href="#mock-plugin-strat-ref-merge-shallow">merge-shallow</a>._

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
<code>└─&nbsp;<a href="#mock-plugin-target-ref-merge-shallow-targetjson">merge-shallow-target.json</a></code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

------

## Targets

### <a name="mock-plugin-target-ref-merge-shallow-targetjson">merge-shallow-target.json</a>  

:small_blue_diamond: `json`

*Short description for merge-shallow-target.json*

Long description for merge-shallow-target.json

------

## Strategies

### <a name="mock-plugin-strat-ref-merge-shallow">merge-shallow</a>  

:small_blue_diamond: `json`, `yml`

*Does a shallow merge aka `Object.assign()`.*

Useful when specific keys of the target need to be overwritten.

