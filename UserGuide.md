# User Guide

## Introduction
This guide provides an outline of how to use and user test the new features added to NodeBB by the Logic Lords team. It also includes a description of the added automated tests for these features and where to find them.

---

## NodeBB Installation
NodeBB requires the following software to be installed:
- A version of Node.js at least 16 or greater (installation/upgrade instructions)
- MongoDB, version 3.6 or greater or Redis, version 2.8.9 or greater
- If you are using clustering you need Redis installed and configured.
- nginx, version 1.3.13 or greater (only if intending to use nginx to proxy requests to a NodeBB

Then, you can install NodeBB by following the below installation instructions based on your computer's operating system, but instead of cloning the class repository you should clone [this](https://github.com/CMU-17313Q/nodebb-f24-logic-lords) one:
- [Mac](https://cmu-17313q.github.io/projects/P1/installation/mac/)
- [Windows](https://cmu-17313q.github.io/projects/P1/installation/windows/)
- [Ubuntu (Linux)](https://cmu-17313q.github.io/projects/P1/installation/ubuntu/)


---

## How to Use The New Features

### Posting Anonymously

### Content Filtering
To use content filtering, go to any of the four interaction pages in NodeBB: Announcements, General Discussion, Comments & Feedback, or Blogs. When creating a new topic, if your title or message contains any inappropriate words from our predefined list (e.g., 'stupid' or 'dammit'), a warning message will appear, stating: "Your title/message contains inappropriate words, please update it accordingly." You will not be able to submit your message until the inappropriate words are removed. Similarly, if you reply to a post with inappropriate words in your message, a warning message will appear, and you will be unable to send your reply until it is corrected.

### Bug Reporting and Bug Log
To use the bug reporting feature, users should navigate to the bug report form by clicking on the "Report Bug" button, which can be found on the left side bar and is visible on all pages (excluding the Admin page). After clicking on this button, users will be directed to a form which they will need to fill out with their name, email address, and a description of the bug they encountered. After filling out the form, users should click the "Submit" button to send their report. The form will validate the inputs to ensure all required fields are filled correctly, including a valid email address. 

---

## Automated Tests

### Posting Anonymously

### Content Filtering
Content filtering functionality has been tested thoroughly, with test cases added to the test/post.js file from lines 448 to 478. These tests cover a variety of scenarios to ensure the system accurately detects inappropriate content: (1)The post's title contains inappropriate words, (2) The post's message contains inappropriate words, (3) Neither the title nor the message contains inappropriate words. Each test checks whether the system correctly identifies and handles these cases by displaying appropriate warning messages to users. Given that all possible scenarios are accounted for, the current set of test cases is comprehensive and sufficient to validate the content filtering mechanism.

### Bug Reporting and Bug Log

As for the bug report form, it has been tested carfully to ensure its functionality is sucessfully implement by covering essential scenarios which can be found in the test/bug-report-form.js file. Test cases include: (1) The form fetches and logs data correctly upon submission, (2) The email field is validated for proper format, (3) The name field cannot be submitted if left empty, (4) The email field must not be empty, and (5) The bug description cannot be empty as well. Each test validates the form’s ability to handle these cases by checking that submission is prevented when necessary and appropriate error messages are displayed. The tests provide comprehensive coverage to validate the form’s functionality.

The functionality of the Bug-Log button in the admin dashboard navigation has been tested by extending the existing test of 'should load admin dashboard'. The test checks for the loading of the route '/admin/dashboard/bug-logs', guranteeing that the button is in the navigation of the admin dashboard and loads the appropriate view file of a table that would record all reported bugs from the user bug report form (bug-logs.tpl). This contributes to ensure that the admin dashboard comprehensively loads all the correct pre-existing navigation features with the newly added functionality of showing bug-logs. 

The bug log page has been tested thoroughly in the file test/bug-logs.js. Test cases include: (1) The fetchBugLogs function correctly fetches and displays bug logs from the API, (2) The submitBugReport function successfully submits a bug report when the description is provided, (3) The bug report description field is validated to ensure it is not empty before submission, (4) The bug logs container is properly emptied and updated with new logs upon fetching, and (5) Error handling is tested to ensure appropriate messages are displayed when fetching or submitting fails. Each test validates the module's ability to handle these cases by checking that the DOM is updated correctly and appropriate console messages are logged. The tests provide comprehensive coverage to validate the module's functionality.

in the case of this user story due to its incompletion this has resulted in manual testing to ensure seperate functionalities are working. We focused on validating key API operations:

1. **GET Requests**: We manually tested the API's ability to fetch data using the browser's Console tab. By executing `fetch` commands, we verified that responses included the expected information such as user IDs, usernames, and login statuses, confirming that data retrieval worked correctly.
   
2. **Form Submission**: We also monitored the Network tab to ensure that when we submitted forms, the correct data was sent to the API and appropriate responses were received. This step was crucial in validating the data submission flow.

3. **Error Handling**: Tests included checking how the system reacted to failure scenarios, ensuring that appropriate error messages were displayed when fetching or submitting data failed.

These tests helped us ensure the controller was handling data effectively.

