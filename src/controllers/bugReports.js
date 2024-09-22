'use strict';

const controllers = {};

controllers.getBugReportForm = (req, res) => {
    res.render('bug-report-form', {
        title: 'Report a Bug',
    });
};

controllers.submitBugReport = (req, res) => {
    const { title, description } = req.body;

    // Validate input
    if (!title || !description) {
        return res.status(400).render('bug-report-form', {
            title: 'Report a Bug',
            error: 'All fields are required.',
        });
    }

    // Save the bug report (this is a placeholder, replace with actual saving logic)
    // For example, you might save it to a database
    console.log('Bug report submitted:', { title, description });

    // Redirect to a success page or render a success message
    res.render('bug-report-success', {
        title: 'Bug Report Submitted',
        message: 'Thank you for your report!',
    });
};

module.exports = controllers;