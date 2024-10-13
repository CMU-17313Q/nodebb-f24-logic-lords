<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bug Report Form</title>
    <style>
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 700px;
            margin: 40px auto; 
            box-sizing: border-box;
        }
        h1 {
            text-align: center;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bug Report Form</h1>
        <form id="form-popup" onsubmit="handleSubmit(event)">
            <input type="hidden" id="csrf-token" value="{{csrfToken}}">
            <div>
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required>
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea id="description" name="description" required></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
    <script>
        function handleSubmit(event) {
            event.preventDefault();
            console.log("pressed the submit button");
            alert('Thank you! We received your feedback and will get back to you soon.');
            console.log("Submitted the form yay!");
            console.log("fetching...");

            const title = event.target.title.value;
            console.log(title);
            const description = event.target.description.value;
            console.log(description);
            const csrfToken = document.querySelector('#csrf-token').value;
            console.log(csrfToken);

            fetch('/api/admin/submit-bug-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-csrf-token': csrfToken // Include the CSRF token in the request headers
                },
                body: JSON.stringify({ title, description })
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