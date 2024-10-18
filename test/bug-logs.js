'use strict';

// Mock document and window objects
global.document = {
    querySelectorAll: (selector) => {
        const elements = [];
        if (selector === '#bug-logs-container') {
            elements.push({
                innerHTML: '',
                insertAdjacentHTML: (position, content) => {
                    this.innerHTML += content;
                },
                children: [],
                querySelectorAll: (subSelector) => {
                    return [];
                }
            });
        } else if (selector === '#bug-report-description') {
            elements.push({
                value: '',
                addEventListener: (event, handler) => {
                    this.handler = handler;
                }
            });
        } else if (selector === '#submit-bug-report') {
            elements.push({
                addEventListener: (event, handler) => {
                    this.handler = handler;
                }
            });
        }
        return elements;
    }
};

global.window = {
    alert: (message) => {
        console.log('Alert:', message);
    }
};

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
        window.alert('Description is required');
        return;
    }

    api.post('/api/admin/submit-bug-report', { description })
        .then(() => {
            window.alert('Bug report submitted successfully');
            $('#bug-report-description').val('');
            fetchBugLogs();
        })
        .catch((err) => {
            console.error('Error submitting bug report:', err);
            window.alert('Error submitting bug report');
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