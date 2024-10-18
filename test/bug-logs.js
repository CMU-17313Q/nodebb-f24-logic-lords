'use strict';

const assert = require('assert');
const $ = require('jquery'); // Assuming jQuery is available in your test environment
const api = require('../src/routes/admin'); // Adjusted path to your API
const BugLogsModule = require('../public/src/admin/dashboard/bug-logs'); // Corrected path

describe('BugLogs', () => {
    let originalGet;
    let originalPost;
    let BugLogs;

    before(() => {
        // Save the original methods
        originalGet = api.get;
        originalPost = api.post;

        // Mock the API methods
        api.get = async (url) => {
            if (url === '/api/admin/get-bug-log') {
                return { bugLogs: [] }; // Default mock response
            }
        };

        api.post = async (url, data) => {
            if (url === '/api/admin/submit-bug-report') {
                return; // Default mock response
            }
        };

        BugLogs = BugLogsModule();
    });

    afterEach(() => {
        // Reset the mock responses
        api.get = async (url) => {
            if (url === '/api/admin/get-bug-log') {
                return { bugLogs: [] };
            }
        };

        api.post = async (url, data) => {
            if (url === '/api/admin/submit-bug-report') {
                return;
            }
        };
    });

    after(() => {
        // Restore the original methods
        api.get = originalGet;
        api.post = originalPost;
    });

    it('should fetch and display bug logs', async () => {
        const mockData = {
            bugLogs: [
                { user: 'user1', description: 'Bug description 1', timestamp: '2023-10-01T10:00:00Z' },
                { user: 'user2', description: 'Bug description 2', timestamp: '2023-10-02T10:00:00Z' },
            ]
        };

        api.get = async (url) => {
            if (url === '/api/admin/get-bug-log') {
                return mockData;
            }
        };

        // Simulate the initialization of BugLogs
        BugLogs.init();

        // Wait for the fetch to complete
        await new Promise(setImmediate);

        const bugLogsContainer = $('#bug-logs-container');
        assert.equal(bugLogsContainer.children().length, 2);
        assert(bugLogsContainer.html().includes('User: user1'));
        assert(bugLogsContainer.html().includes('Description: Bug description 1'));
        assert(bugLogsContainer.html().includes('Timestamp: 2023-10-01T10:00:00Z'));
    });

    it('should display a message when no bug logs are found', async () => {
        api.get = async (url) => {
            if (url === '/api/admin/get-bug-log') {
                return { bugLogs: [] };
            }
        };

        BugLogs.init();
        await new Promise(setImmediate);

        const bugLogsContainer = $('#bug-logs-container');
        assert.equal(bugLogsContainer.children().length, 1);
        assert(bugLogsContainer.html().includes('No bug logs found.'));
    });

    it('should handle error when fetching bug logs', async () => {
        api.get = async (url) => {
            if (url === '/api/admin/get-bug-log') {
                throw new Error('Fetch error');
            }
        };

        BugLogs.init();
        await new Promise(setImmediate);

        const bugLogsContainer = $('#bug-logs-container');
        assert.equal(bugLogsContainer.children().length, 1);
        assert(bugLogsContainer.html().includes('Error fetching bug logs.'));
    });

    it('should submit a bug report successfully', async () => {
        api.post = async (url, data) => {
            if (url === '/api/admin/submit-bug-report') {
                return;
            }
        };

        // Simulate user input
        $('#bug-report-description').val('A new bug report');

        await BugLogs.submitBugReport();

        assert.equal($('#bug-report-description').val(), '');
    });

    it('should show an alert if description is empty on submission', async () => {
        const originalAlert = window.alert;
        let alertCalled = false;
        window.alert = (message) => {
            alertCalled = true;
            assert.equal(message, 'Description is required');
        };

        $('#bug-report-description').val(''); // Empty description
        await BugLogs.submitBugReport();

        assert(alertCalled);

        window.alert = originalAlert;
    });

    it('should handle error when submitting a bug report', async () => {
        const originalAlert = window.alert;
        let alertCalled = false;
        window.alert = (message) => {
            alertCalled = true;
            assert.equal(message, 'Error submitting bug report');
        };

        api.post = async (url, data) => {
            if (url === '/api/admin/submit-bug-report') {
                throw new Error('Submit error');
            }
        };

        $('#bug-report-description').val('A new bug report');
        await BugLogs.submitBugReport();

        assert(alertCalled);

        window.alert = originalAlert;
    });
});