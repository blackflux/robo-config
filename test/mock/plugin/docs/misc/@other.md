- <a name="mock-plugin-task-idx-ref-miscotherjson">:open_file_folder:</a> <a href="#mock-plugin-task-ref-miscotherjson">`misc/@other.json`</a>
  - <a name="mock-plugin-task-idx-ref-misctask">:clipboard:</a> <a href="#mock-plugin-task-ref-misctask">`misc/task`</a>

# :open_file_folder: <a name="mock-plugin-task-ref-miscotherjson">misc/@other.json</a> (<a href="#mock-plugin-task-idx-ref-miscotherjson">:link:`index`</a>)

Task collection description.

<table>
  <tbody>
    <tr>
      <th>Targets</th>
      <th>Requires</th>
      <th>Variables</th>
    </tr>
    <tr>
      <td align="left" valign="top">
        <ul>
<code>project</code><br/>
<code>└─ ${misc}.txt</code><br/>
        </ul>
      </td>
      <td align="left" valign="top">
        <ul>
          <li><a href="#mock-plugin-req-ref-dependency">dependency</a></li>
        </ul>
      </td>
      <td align="left" valign="top">
        <ul>
          <li><a href="#mock-plugin-var-ref-misc">misc</a></li>
          <li><a href="#mock-plugin-var-ref-variable">variable</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## :clipboard: <a name="mock-plugin-task-ref-misctask">misc/task</a> (<a href="#mock-plugin-task-idx-ref-misctask">:link:`index`</a>)

_Updating `${misc}.txt` using <a href="#mock-plugin-strat-ref-overwrite">overwrite</a>._

- Some purpose.

<table>
  <tbody>
    <tr>
      <th>Targets</th>
      <th>Requires</th>
      <th>Variables</th>
    </tr>
    <tr>
      <td align="left" valign="top">
        <ul>
<code>project</code><br/>
<code>└─ ${misc}.txt</code><br/>
        </ul>
      </td>
      <td align="left" valign="top">
        <ul>
          <li><a href="#mock-plugin-req-ref-dependency">dependency</a></li>
        </ul>
      </td>
      <td align="left" valign="top">
        <ul>
          <li><a href="#mock-plugin-var-ref-misc">misc</a></li>
          <li><a href="#mock-plugin-var-ref-variable">variable</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

------

## Requires

### <a name="mock-plugin-req-ref-dependency">dependency</a> ([`link`](https://www.some-tool-name.com)) 

*Short description about this dependency.*

Detailed description about this dependency and how it's used.

------

## Variables

### <a name="mock-plugin-var-ref-misc">misc</a>  : `string`

*Short description of what this variable does.*

Detailed description of what this variable does.

### <a name="mock-plugin-var-ref-variable">variable</a>  : `string`

*Short description of what this variable does.*

Detailed description of what this variable does.

------

## Strategies

### <a name="mock-plugin-strat-ref-overwrite">overwrite</a>  

:small_blue_diamond: `any`

*Simply replace the old with the new content.*

