'use strict';

define('admin/dashboard/bug-logs', ['jquery', 'api'], ($, api) => {
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

                data.bugLogs.forEach((log) => {
                    const logElement = $('<div>').addClass('bug-log');
                    logElement.append($('<p>').text(Description: ${log.description}));
                    logElement.append($('<p>').text(Timestamp: ${log.timestamp}));
                    bugLogsContainer.append(logElement);
                });
            })
            .catch((err) => {
                console.error('Error fetching bug logs:', err);
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

    return BugLogs;
});