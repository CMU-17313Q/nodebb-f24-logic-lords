# User Guide

## Introduction
This guide provides an outline of how to use and user test the new features added to NodeBB by the Logic Lords team. It also includes a description of the added automated tests for these features and where to find them.

---

## NodeBB Installation
To be able to use and user test the added features, you need a working installation of this version of NodeBB.


---

## How to Use The New Features

### Posting Anonymously

### Content Filtering

### Bug Log

---

## Automated Tests

### Posting Anonymously

### Content Filtering
These are tests for checking if it filters inappropriate words and provide warning messages to users. The tests have been included to the test/post.js file from line 448 to 478. The testcases covers the different cases possible: (1) the title of the post contains an inappropriate word, (2) the message itself contains an inappropriate word, (3) both the title and the message does not contain any inappropriate word. And it checks for all these conditions. Because all the cases are taken into account in the testcases, the tests are sufficient.

### Bug Log
