'use strict';

define('admin/dashboard/bug-logs', ['jquery', 'api'], ($, api) => {
    const BugLogs = {};

    BugLogs.init = () => {
        // Handle bug report submission
        $('#submit-bug-report').on('click', submitBugReport);
    };

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
            })
            .catch((err) => {
                console.error('Error submitting bug report:', err);
                alert('Error submitting bug report');
            });
    }

    // Call init directly
    BugLogs.init();

    return BugLogs;
});
