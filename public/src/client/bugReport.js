'use strict';

define('forum/bugReport', [], function () {
    const BugReport = {};

    BugReport.init = function () {
        // Render the bug report form template
        app.render('bug-report-form', {
            title: 'Report a Bug',
        });
    };

    return BugReport;
});