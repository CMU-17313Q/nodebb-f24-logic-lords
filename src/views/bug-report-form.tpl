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
            font-weight: bold;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: bold;
        }
        input[type="text"],
        input[type="email"],
        textarea,
        select {
            width: 100%;
            max-width: 600px; 
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            margin-left: auto;
            margin-right: auto;
            display: block;
        }
        input[type="submit"] {
            width: 100%;
            max-width: 600px; 
            padding: 10px;
            background-color: #28a745;
            border: none;
            border-radius: 4px;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            box-sizing: border-box;
            margin-left: auto;
            margin-right: auto;
            display: block;
            font-weight: bold;
        }
        input[type="submit"]:hover {
            background-color: #218838;
        }
        .banner {
            text-align: center;
            color: #fff;
            background-color: rgba(40, 167, 69, 0.9); /* Slightly transparent */
            padding: 10px;
            position: fixed;
            bottom: -50px; /* Start off-screen */
            left: 0;
            right: 0;
            display: none;
            z-index: 1000;
            transition: bottom 0.5s ease-in-out; /* Smooth transition */
        }
        .banner.show {
            bottom: 0; /* Slide in */
        }
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

</body>
</html>