'use strict';

define('forum/report-bug', [], function () {
	const BugReport = {};

	BugReport.init = function () {
		app.render('bug-report-form', {
			title: 'Report a Bug',
		});
	};

	return BugReport;
});
