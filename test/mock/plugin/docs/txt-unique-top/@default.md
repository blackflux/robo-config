- <a name="mock-plugin-task-idx-ref-txt-unique-topdefaultjson">:open_file_folder:</a> <a href="#mock-plugin-task-ref-txt-unique-topdefaultjson">`txt-unique-top/@default.json`</a>
  - <a name="mock-plugin-task-idx-ref-txt-unique-toptask">:clipboard:</a> <a href="#mock-plugin-task-ref-txt-unique-toptask">`txt-unique-top/task`</a>

# :open_file_folder: <a name="mock-plugin-task-ref-txt-unique-topdefaultjson">txt-unique-top/@default.json</a> (<a href="#mock-plugin-task-idx-ref-txt-unique-topdefaultjson">`index`</a>)

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
<code>└─&nbsp;unique-top.txt</code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## :clipboard: <a name="mock-plugin-task-ref-txt-unique-toptask">txt-unique-top/task</a> (<a href="#mock-plugin-task-idx-ref-txt-unique-toptask">`index`</a>)

_Updating `unique-top.txt` using <a href="#mock-plugin-strat-ref-unique-top">unique-top</a>._

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
<code>└─&nbsp;unique-top.txt</code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

------

## Strategies

### <a name="mock-plugin-strat-ref-unique-top">unique-top</a>  

:small_blue_diamond: `list`

*Merges content at the top of the file and removes existing, duplicate lines.*

Useful for managing e.g. `.gitignore` when the original content should be kept.

