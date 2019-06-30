# ImageDiscord-Bot
Get any image from the internet

# Installation
`npm install`

Change the token in settings.json

`node .` To run

# Adding commands

Open settings.json and add commands in the `commands` field, the index in the command itself
<strong>description</strong>
Description of the command
<strong>steps</strong>
Step to get the final image's URL
<table>
<thead>
<tr>
<th>Field</th>
<th>Value</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td>url</td>
  <td><strong>(Only on the first step)</strong> URL to get the first link</td>
  <td><strong>http://www.cutestpaw.com/random/</td>
</tr>
<tr>
<td>regex</td>
  <td><strong>(Only group1 count)</strong> regex to get the next link</td>
  <td><strong>content=\"0; url=(.*)\"</td>
</tr>
</tbody>
</table>

Default command prefix is `^^` (it can be changed in settings.json)
