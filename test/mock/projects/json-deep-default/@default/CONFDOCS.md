## Plugin [mock-plugin](https://www.npmjs.com/package/mock-plugin)

- <a name="mock-plugin-task-idx-ref-json-deep-defaultdefault">:open_file_folder:</a> <a href="#mock-plugin-task-ref-json-deep-defaultdefault">`json-deep-default/@default`</a>
  - <a name="mock-plugin-task-idx-ref-json-deep-defaulttask">:clipboard:</a> <a href="#mock-plugin-task-ref-json-deep-defaulttask">`json-deep-default/task`</a>

### :open_file_folder: <a name="mock-plugin-task-ref-json-deep-defaultdefault">json-deep-default/@default</a> (<a href="#mock-plugin-task-idx-ref-json-deep-defaultdefault">`index`</a>)

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
<code>└─&nbsp;<a name="mock-plugin-target-ref-default-deep-targetjson">default-deep-target.json</a></code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### :clipboard: <a name="mock-plugin-task-ref-json-deep-defaulttask">json-deep-default/task</a> (<a href="#mock-plugin-task-idx-ref-json-deep-defaulttask">`index`</a>)

_Updating `default-deep-target.json` using <a href="#mock-plugin-strat-ref-default-deep">default-deep</a>._

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
<code>└─&nbsp;<a name="mock-plugin-target-ref-default-deep-targetjson">default-deep-target.json</a></code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

------

## Targets

### <a name="mock-plugin-target-ref-default-deep-targetjson">default-deep-target.json</a>  

*Short description for default-deep-target.json*

Long description for default-deep-target.json

------

## Strategies

### <a name="mock-plugin-strat-ref-default-deep">default-deep</a>  

:small_blue_diamond: `json`, `yml`

*Similar to `merge-deep`, but keeps existing values instead of overwriting.*

Useful to ensure specific keys of the target are present without overwriting existing content.

