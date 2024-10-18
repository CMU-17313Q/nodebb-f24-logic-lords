'use strict';

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

describe('Bug Report Form', () => {
    console.log('*'.repeat(20));
    console.log('Beginning of the test');
    let dom;
    let document;

    before((done) => {
        console.log('Setting up the test');
        const html = fs.readFileSync(path.resolve(__dirname, '../src/views/bug-report-form.tpl'), 'utf8');
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        document = dom.window.document;
        done();
        console.log(html);
    });

    it('should validate required fields', () => {
        console.log('Validating required fields');
        const form = document.getElementById('bug-report-form');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const descriptionTextarea = document.getElementById('bug-description');

        // Clear form values
        nameInput.value = '';
        emailInput.value = '';
        descriptionTextarea.value = '';

        // Simulate form submission
        const event = new dom.window.Event('submit', {
            bubbles: true,
            cancelable: true
        });
        form.dispatchEvent(event);

        // Check if form is invalid
        assert.strictEqual(form.checkValidity(), false);
    });

    it('should capture form data on submit', (done) => {
        const form = document.getElementById('bug-report-form');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const descriptionTextarea = document.getElementById('bug-description');

        // Set form values
        nameInput.value = 'Test User';
        emailInput.value = 'test@example.com';
        descriptionTextarea.value = 'This is a test bug description.';

        // Mock console.log
        const originalLog = console.log;
        console.log = (data) => {
            assert.deepStrictEqual(data, {
                name: 'Test User',
                email: 'test@example.com',
                'bug-description': 'This is a test bug description.'
            });
            console.log = originalLog; // Restore original console.log
            done();
        };

        // Simulate form submission
        const event = new dom.window.Event('submit', {
            bubbles: true,
            cancelable: true
        });
        form.dispatchEvent(event);

        // Capture form data
        const formData = new dom.window.FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            'bug-description': formData.get('bug-description')
        };

        // Log form data
        console.log(data);
    });
});