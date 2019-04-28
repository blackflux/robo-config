- <a name="mock-plugin-task-idx-ref-miscotherjson">:open_file_folder:</a> <a href="#mock-plugin-task-ref-miscotherjson">`misc/@other.json`</a>
  - <a name="mock-plugin-task-idx-ref-misctask">:clipboard:</a> <a href="#mock-plugin-task-ref-misctask">`misc/task`</a>

# :open_file_folder: <a name="mock-plugin-task-ref-miscotherjson">misc/@other.json</a> (<a href="#mock-plugin-task-idx-ref-miscotherjson">`index`</a>)

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
<code>└─&nbsp;<a href="#mock-plugin-target-ref-misctxt">${misc}.txt</a></code><br/>
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

## :clipboard: <a name="mock-plugin-task-ref-misctask">misc/task</a> (<a href="#mock-plugin-task-idx-ref-misctask">`index`</a>)

_Updating <a href="#mock-plugin-target-ref-misctxt">${misc}.txt</a> using <a href="#mock-plugin-strat-ref-overwrite">overwrite</a>._

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
<code>└─&nbsp;<a href="#mock-plugin-target-ref-misctxt">${misc}.txt</a></code><br/>
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

## Targets

### <a name="mock-plugin-target-ref-misctxt">${misc}.txt</a> ([`link`](https://some.url)) 

:small_red_triangle: <a href="#mock-plugin-req-ref-dependency">dependency</a>

:small_blue_diamond: `nostruct`

*Short description for ${misc}.txt*

Long description for ${misc}.txt

------

## Strategies

### <a name="mock-plugin-strat-ref-overwrite">overwrite</a>  

:small_blue_diamond: `any`

*Simply replace the old with the new content.*

