<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bug Report Form</title>
</head>
<body>
    <h1>Bug Report Form</h1>
    <form action="/submit-bug-report" method="post">
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name" required><br><br>

        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br><br>

        <label for="bug-description">Bug Description:</label><br>
        <textarea id="bug-description" name="bug-description" rows="4" cols="50" required></textarea><br><br>

        <label for="steps-to-reproduce">Steps to Reproduce:</label><br>
        <textarea id="steps-to-reproduce" name="steps-to-reproduce" rows="4" cols="50" required></textarea><br><br>

        <label for="severity">Severity:</label><br>
        <select id="severity" name="severity" required>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select><br><br>

        <input type="submit" value="Submit">
    </form>
</body>
</html>