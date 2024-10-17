'use strict';

const assert = require('assert');
const sinon = require('sinon');
const $ = require('jquery'); // Assuming jQuery is available in your test environment
const api = require('../src/routes/admin'); // Adjusted path to your API
const BugLogs = require('../src/admin/dashboard/bug-logs'); // Adjust the path as necessary

describe('BugLogs', () => {
    let fetchStub;
    let postStub;

    before(() => {
        // Stub the API methods
        fetchStub = sinon.stub(api, 'get');
        postStub = sinon.stub(api, 'post');
    });

    afterEach(() => {
        // Restore the original methods after each test
        fetchStub.resetHistory();
        postStub.resetHistory();
    });

    after(() => {
        // Restore the original methods after all tests
        fetchStub.restore();
        postStub.restore();
    });

    it('should fetch and display bug logs', async () => {
        const mockData = {
            bugLogs: [
                { user: 'user1', description: 'Bug description 1', timestamp: '2023-10-01T10:00:00Z' },
                { user: 'user2', description: 'Bug description 2', timestamp: '2023-10-02T10:00:00Z' },
            ]
        };

        fetchStub.resolves(mockData);

        // Simulate the initialization of BugLogs
        BugLogs.init();

        // Wait for the fetch to complete
        await new Promise(setImmediate);

        const bugLogsContainer = $('#bug-logs-container');
        assert.equal(bugLogsContainer.children().length, 2);
        assert(bugLogsContainer.html().includes(':User  user1'));
        assert(bugLogsContainer.html().includes('Description: Bug description 1'));
        assert(bugLogsContainer.html().includes('Timestamp: 2023-10-01T10:00:00Z'));
    });

    it('should display a message when no bug logs are found', async () => {
        fetchStub.resolves({ bugLogs: [] });

        BugLogs.init();
        await new Promise(setImmediate);

        const bugLogsContainer = $('#bug-logs-container');
        assert.equal(bugLogsContainer.children().length, 1);
        assert(bugLogsContainer.html().includes('No bug logs found.'));
    });

    it('should handle error when fetching bug logs', async () => {
        fetchStub.rejects(new Error('Fetch error'));

        BugLogs.init();
        await new Promise(setImmediate);

        const bugLogsContainer = $('#bug-logs-container');
        assert.equal(bugLogsContainer.children().length, 1);
        assert(bugLogsContainer.html().includes('Error fetching bug logs.'));
    });

    it('should submit a bug report successfully', async () => {
        postStub.resolves();

        // Simulate user input
        $('#bug-report-description').val('A new bug report');

        await BugLogs.submitBugReport();

        assert(postStub.calledOnce);
        assert(postStub.calledWith('/api/admin/submit-bug-report', { description: 'A new bug report' }));

        // Check if the input is cleared
        assert.equal($('#bug-report-description').val(), '');
    });

    it('should show an alert if description is empty on submission', async () => {
        const alertStub = sinon.stub(window, 'alert');
        
        $('#bug-report-description').val(''); // Empty description
        await BugLogs.submitBugReport();

        assert(alertStub.calledOnce);
        assert(alertStub.calledWith('Description is required'));

        alertStub.restore();
    });

    it('should handle error when submitting a bug report', async () => {
        const alertStub = sinon.stub(window, 'alert');
        postStub.rejects(new Error('Submit error'));

        $('#bug-report-description').val('A new bug report');
        await BugLogs.submitBugReport();

        assert(alertStub.calledOnce);
        assert(alertStub.calledWith('Error submitting bug report'));

        alertStub.restore();
    });
});