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
  <td><strong>(Only on the first step)</strong> URL to get the first link <strong>(See: URL Functions)</strong></td>
  <td>http://www.cutestpaw.com/random/</td>
</tr>
<tr>
<td>regex</td>
  <td><strong>(Only group1 count)</strong> regex to get the next link</td>
  <td>content=\"0; url=(.*)\"</td>
</tr>
  <tr>
<td>retry</td>
  <td><strong>(Not regex)</strong> If the body of the page contain this string, it will retry</td>
  <td>0_173a7b_211be8ff <strong>(part of the "screenshot removed" file name for prnt.sc)</strong></td>
</tr>
</tbody>
</table>
Default command prefix is `^^` (it can be changed in settings.json)

# URL Functions
<table>
<thead>
<tr>
<th>Function</th>
<th>Description</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
  <td>RI{min,max}</td>
  <td><strong>Random int between min and max included</td>
  <td>RI{1,10} : 5</td>
</tr>
<tr>
  <td>RL{min,max}</td>
  <td><strong>Random lowercase between min and max included</td>
  <td>RL{1,10} : dajrdz</td>
</tr>
<tr>
  <td>RU{min,max}</td>
  <td><strong>Random uppercase between min and max included</td>
  <td>RU{1,10} : HFJEZL</td>
</tr>
<tr>
  <td>RX{min,max}</td>
  <td><strong>Random mixt (no int) between min and max included</td>
  <td>RX{1,10} : FLhHeGrE</td>
</tr>
</tbody>
</table>

<strong>URL Functions only work in URLs not regexs</strong>

# Credit
This is my first real discord bot using promises and it can be a little slow

Packages: discord.js / request-promise
