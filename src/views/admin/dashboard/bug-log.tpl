<!-- views/admin/bug-log.tpl -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bug Log</title>
</head>
<body>
  <h1>Bug Log</h1>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
        <th>Timestamp</th>
      </tr>
    </thead>
    <tbody>
      {{#each bugs}}
      <tr>
        <td>{{this.title}}</td>
        <td>{{this.description}}</td>
        <td>{{this.status}}</td>
        <td>{{this.timestamp}}</td>
      </tr>
      {{/each}}
    </tbody>
  </table>
</body>
</html>
