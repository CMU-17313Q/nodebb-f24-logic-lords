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
Content filtering functionality has been tested thoroughly, with test cases added to the test/post.js file from lines 448 to 478. These tests cover a variety of scenarios to ensure the system accurately detects inappropriate content: (1)The post's title contains inappropriate words, (2) The post's message contains inappropriate words, (3) Neither the title nor the message contains inappropriate words. Each test checks whether the system correctly identifies and handles these cases by displaying appropriate warning messages to users. Given that all possible scenarios are accounted for, the current set of test cases is comprehensive and sufficient to validate the content filtering mechanism.

### Bug Log
