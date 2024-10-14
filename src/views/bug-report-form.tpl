<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bug Report Form</title>
    <style>
        /* Your existing CSS styles */
    </style>
</head>
<body>
    <div class="banner" id="form-banner">Form Submitted</div>
    <div class="container">
        <h1>Bug Report Form</h1>
        <form id="bug-report-form">
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
        document.addEventListener("DOMContentLoaded", function() {
            const form = document.querySelector("#bug-report-form");
            form.onsubmit = function(event) {
                event.preventDefault();
                console.log("Pressed the submit button");
                alert('Thank you! We received your feedback and will get back to you soon.');
                console.log("Submitted the form, yay!");

                const name = event.target.name.value;
                console.log(name);
                const email = event.target.email.value;
                console.log(email);
                const description = event.target["bug-description"].value;
                console.log(description);

                // Assuming you have a CSRF token input field with id "csrf-token"
                const csrfToken = document.querySelector('#csrf-token').value;
                console.log(csrfToken);

                fetch(`/api/${name}/submit-bug-report`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-csrf-token': csrfToken
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        description: description
                    })
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
            };
        });
    </script>
</body>
</html>