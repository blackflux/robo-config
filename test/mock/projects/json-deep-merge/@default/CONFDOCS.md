## Plugin [mock-plugin](https://www.npmjs.com/package/mock-plugin)

- <a name="mock-plugin-task-idx-ref-json-deep-mergedefault">:open_file_folder:</a> <a href="#mock-plugin-task-ref-json-deep-mergedefault">`json-deep-merge/@default`</a>
  - <a name="mock-plugin-task-idx-ref-json-deep-mergetask">:clipboard:</a> <a href="#mock-plugin-task-ref-json-deep-mergetask">`json-deep-merge/task`</a>

### :open_file_folder: <a name="mock-plugin-task-ref-json-deep-mergedefault">json-deep-merge/@default</a> (<a href="#mock-plugin-task-idx-ref-json-deep-mergedefault">`index`</a>)

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
<code>└─&nbsp;<a name="mock-plugin-target-ref-merge-deep-targetjson">merge-deep-target.json</a></code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### :clipboard: <a name="mock-plugin-task-ref-json-deep-mergetask">json-deep-merge/task</a> (<a href="#mock-plugin-task-idx-ref-json-deep-mergetask">`index`</a>)

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
<code>└─&nbsp;<a name="mock-plugin-target-ref-merge-deep-targetjson">merge-deep-target.json</a></code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

------

## Targets

### <a name="mock-plugin-target-ref-merge-deep-targetjson">merge-deep-target.json</a>  

*Short description for merge-deep-target.json*

Long description for merge-deep-target.json

------

## Strategies

### <a name="mock-plugin-strat-ref-merge-deep">merge-deep</a>  

:small_blue_diamond: `json`, `yml`

*Does a "smart" deep merge.*

This will not work as desired for all object deep merging, but should for many cases.

