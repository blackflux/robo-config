## Plugin [mock-plugin](https://www.npmjs.com/package/mock-plugin)

- <a name="mock-plugin-task-idx-ref-txt-unique-topdefault">:open_file_folder:</a> <a href="#mock-plugin-task-ref-txt-unique-topdefault">`txt-unique-top/@default`</a>
  - <a name="mock-plugin-task-idx-ref-txt-unique-toptask">:clipboard:</a> <a href="#mock-plugin-task-ref-txt-unique-toptask">`txt-unique-top/task`</a>

### :open_file_folder: <a name="mock-plugin-task-ref-txt-unique-topdefault">txt-unique-top/@default</a> (<a href="#mock-plugin-task-idx-ref-txt-unique-topdefault">`index`</a>)

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
<code>└─&nbsp;<a href="#mock-plugin-target-ref-unique-toptxt">unique-top.txt</a></code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### :clipboard: <a name="mock-plugin-task-ref-txt-unique-toptask">txt-unique-top/task</a> (<a href="#mock-plugin-task-idx-ref-txt-unique-toptask">`index`</a>)

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
<code>└─&nbsp;<a href="#mock-plugin-target-ref-unique-toptxt">unique-top.txt</a></code><br/>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

------

## Targets

### <a name="mock-plugin-target-ref-unique-toptxt">unique-top.txt</a>  

*Short description for unique-top.txt*

Long description for unique-top.txt

------

## Strategies

### <a name="mock-plugin-strat-ref-unique-top">unique-top</a>  

:small_blue_diamond: `list`

*Merges content at the top of the file and removes existing, duplicate lines.*

Useful for managing e.g. `.gitignore` when the original content should be kept.

