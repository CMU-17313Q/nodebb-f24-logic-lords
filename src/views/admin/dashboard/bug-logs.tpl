<!-- views/admin/bug-logs.tpl -->
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
      <!-- Use Benchpress syntax for iteration -->
      <!-- BEGIN bugs -->
      <tr>
        <td><!-- IMPORT bugs.title --></td>
        <td><!-- IMPORT bugs.description --></td>
        <td><!-- IMPORT bugs.status --></td>
        <td><!-- IMPORT bugs.timestamp --></td>
      </tr>
      <!-- END bugs -->
    </tbody>
  </table>
</body>
</html>

