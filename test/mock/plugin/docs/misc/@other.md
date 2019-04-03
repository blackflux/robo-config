- :open_file_folder: <a href="#mock-plugin-task-ref-miscotherjson">`misc/@other.json`</a>
  - :clipboard: <a href="#mock-plugin-task-ref-misctask">`misc/task`</a>

# :open_file_folder: <a name="mock-plugin-task-ref-miscotherjson">misc/@other.json</a>

Task collection description.

<table>
  <tbody>
    <tr>
      <th>Targets</th>
      <th>Requires</th>
      <th>Variables</th>
    </tr>
    <tr>
      <td valign="top">
        <ul>
<code>project</code><br/>
<code>└─ ${misc}.txt</code>
        </ul>
      </td>
      <td valign="top">
        <ul>
          <li><a href="#mock-plugin-req-ref-dependency">dependency</a></li>
        </ul>
      </td>
      <td valign="top">
        <ul>
          <li><a href="#mock-plugin-var-ref-misc">misc</a></li>
          <li><a href="#mock-plugin-var-ref-variable">variable</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## :clipboard: <a name="mock-plugin-task-ref-misctask">misc/task</a>

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
      <td valign="top">
        <ul>
<code>project</code><br/>
<code>└─ ${misc}.txt</code>
        </ul>
      </td>
      <td valign="top">
        <ul>
          <li><a href="#mock-plugin-req-ref-dependency">dependency</a></li>
        </ul>
      </td>
      <td valign="top">
        <ul>
          <li><a href="#mock-plugin-var-ref-misc">misc</a></li>
          <li><a href="#mock-plugin-var-ref-variable">variable</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

------
------

## Requires

### <a name="mock-plugin-req-ref-dependency">dependency</a>

[Website](https://www.some-tool-name.com)

Short description about this dependency.

*Details:*
Detailed description about this dependency and how it's used.

------
------

## Variables

### <a name="mock-plugin-var-ref-misc">misc</a>

Type: `string`

Short description of what this variable does.

*Details:*
Detailed description of what this variable does.

### <a name="mock-plugin-var-ref-variable">variable</a>

Type: `string`

Short description of what this variable does.

*Details:*
Detailed description of what this variable does.

------
------

## Strategies

### <a name="mock-plugin-strat-ref-overwrite">overwrite</a>

Valid for: `any`

Simply replace the old with the new content.

