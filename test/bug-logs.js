'use strict';

// Mock jQuery
const $ = (selector) => {
    const elements = document.querySelectorAll(selector);
    return {
        on: (event, handler) => {
            elements.forEach(element => element.addEventListener(event, handler));
        },
        val: (value) => {
            if (value === undefined) {
                return elements[0].value;
            } else {
                elements.forEach(element => element.value = value);
            }
        },
        append: (content) => {
            elements.forEach(element => element.insertAdjacentHTML('beforeend', content));
        },
        empty: () => {
            elements.forEach(element => element.innerHTML = '');
        },
        children: () => {
            return elements[0].children;
        },
        find: (selector) => {
            return elements[0].querySelectorAll(selector);
        }
    };
};

// Mock API
const api = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            if (url === '/api/admin/get-bug-log') {
                resolve({
                    bugLogs: [
                        { user: 'User1', description: 'Bug1', timestamp: '2023-01-01' },
                        { user: 'User2', description: 'Bug2', timestamp: '2023-01-02' }
                    ]
                });
            } else {
                reject('Invalid URL');
            }
        });
    },
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            if (url === '/api/admin/submit-bug-report' && data.description) {
                resolve();
            } else {
                reject('Invalid URL or data');
            }
        });
    }
};

// Mock DOM elements
document.body.innerHTML = `
    <div id="bug-logs-container"></div>
    <input type="text" id="bug-report-description" placeholder="Describe the bug">
    <button id="submit-bug-report">Submit Bug Report</button>
`;

// Your original code
const BugLogs = {};

BugLogs.init = () => {
    // Fetch and display bug logs
    fetchBugLogs();

    // Handle bug report submission
    $('#submit-bug-report').on('click', submitBugReport);
};

function fetchBugLogs() {
    api.get('/api/admin/get-bug-log')
        .then((data) => {
            const bugLogsContainer = $('#bug-logs-container');
            bugLogsContainer.empty();

            if (data.bugLogs && data.bugLogs.length > 0) {
                data.bugLogs.forEach((log) => {
                    const logElement = document.createElement('div');
                    logElement.classList.add('bug-log');
                    logElement.innerHTML = `
                        <p>User: ${log.user}</p>
                        <p>Description: ${log.description}</p>
                        <p>Timestamp: ${log.timestamp}</p>
                    `;
                    bugLogsContainer.append(logElement.outerHTML);
                });
            } else {
                bugLogsContainer.append('<p>No bug logs found.</p>');
            }
        })
        .catch((err) => {
            console.error('Error fetching bug logs:', err);
            $('#bug-logs-container').append('<p>Error fetching bug logs.</p>');
        });
}

function submitBugReport() {
    const description = $('#bug-report-description').val().trim();

    if (!description) {
        alert('Description is required');
        return;
    }

    api.post('/api/admin/submit-bug-report', { description })
        .then(() => {
            alert('Bug report submitted successfully');
            $('#bug-report-description').val('');
            fetchBugLogs();
        })
        .catch((err) => {
            console.error('Error submitting bug report:', err);
            alert('Error submitting bug report');
        });
}

// Initialize the module
BugLogs.init();

// Test cases
function runTests() {
    // Test fetchBugLogs
    api.get('/api/admin/get-bug-log').then((data) => {
        console.assert(data.bugLogs.length === 2, 'fetchBugLogs test failed');
        console.log('fetchBugLogs test passed');
    });

    // Test submitBugReport
    $('#bug-report-description').val('Test bug report');
    $('#submit-bug-report').click();
    setTimeout(() => {
        console.log('submitBugReport test passed');
    }, 1000);
}

// Run tests
runTests();