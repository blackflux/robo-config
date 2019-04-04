- :open_file_folder: <a href="#mock-plugin-task-ref-xml-mergedefaultjson">`xml-merge/@default.json`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-xml-mergetask">`xml-merge/task`</a>

# :open_file_folder: <a name="mock-plugin-task-ref-xml-mergedefaultjson">xml-merge/@default.json</a>

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

## :clipboard: <a name="mock-plugin-task-ref-xml-mergetask">xml-merge/task</a>

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

:page_with_curl: `xml`

*Does a "smart" deep merge.*

This will not work as desired for all xml merging, but should for many cases.

