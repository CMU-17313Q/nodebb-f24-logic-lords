'use strict';

const controllers = {};

controllers.getBugReportForm = (req, res) => {
	res.render('bug-report-form', {
		title: 'Report a Bug',
	});
};

module.exports = controllers;
