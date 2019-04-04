- <a name="mock-plugin-task-idx-ref-open_file_folder">:open_file_folder:</a> <a href="#mock-plugin-task-ref-xml-mergedefaultjson">`xml-merge/@default.json`</a>
  - <a name="mock-plugin-task-idx-ref-clipboard">:clipboard:</a> <a href="#mock-plugin-task-ref-xml-mergetask">`xml-merge/task`</a>

# :open_file_folder: <a name="mock-plugin-task-ref-xml-mergedefaultjson">xml-merge/@default.json</a> (<a href="#mock-plugin-task-idx-ref-index">`index`</a>)

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
<code>└─ merge-target.xml</code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## :clipboard: <a name="mock-plugin-task-ref-xml-mergetask">xml-merge/task</a> (<a href="#mock-plugin-task-idx-ref-index">`index`</a>)

_Updating `merge-target.xml` using <a href="#mock-plugin-strat-ref-xml-merge">xml-merge</a>._

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
<code>└─ merge-target.xml</code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

------

## Strategies

### <a name="mock-plugin-strat-ref-xml-merge">xml-merge</a>  

:small_blue_diamond: `xml`

*Does a "smart" deep merge.*

This will not work as desired for all xml merging, but should for many cases.

