const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

describe('Bug Report Form', () => {
    let dom;
    let document;

    before((done) => {
        const html = fs.readFileSync(path.resolve(__dirname, '../src/views/bug-report-form.tpl'), 'utf8');
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        document = dom.window.document;
        done();
    });

    it('should validate required fields', () => {
        const form = document.getElementById('bug-report-form');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const descriptionTextarea = document.getElementById('bug-description');

        // Clear form values
        nameInput.value = '';
        emailInput.value = '';
        descriptionTextarea.value = '';

        // Simulate form submission
        const event = new dom.window.Event('submit');
        form.dispatchEvent(event);

        // Check if form is invalid
        assert.strictEqual(form.checkValidity(), false);
    });
});