<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bug Report Form</title>
</head>
<body>
    <div class="container">
        <h1>Bug Report Form</h1>
        <form id="form-popup" onsubmit="handleSubmit(event)">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="bug-description">Bug Description:</label>
            <textarea id="bug-description" name="bug-description" rows="4" required></textarea>

            <input type="submit" value="Submit">
        </form>
    </div>

    <script>
        function handleSubmit(event) {
            event.preventDefault();
            console.log("pressed the submit button");
            alert('Thank you! We received your feedback and will get back to you soon.');
            console.log("Submitted the form yay!");
            console.log("fetching...");

            const name = event.target.name.value;
            console.log(name);
            const email = event.target.email.value;
            console.log(email);
            const description = event.target['bug-description'].value;
            console.log(description);
            const csrfToken = document.querySelector('#csrf-token').value;
            console.log(csrfToken);

            fetch('/api/admin/submit-bug-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-csrf-token': csrfToken // Include the CSRF token in the request headers
                },
                body: JSON.stringify({ name, email, description })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Optionally, you can refresh the bug logs or redirect the user
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    </script>
</body>
</html>