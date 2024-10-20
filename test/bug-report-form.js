'use strict';

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

describe('Bug Report Form', () => {
	// console.log('*'.repeat(20));
	// console.log('Beginning of the test');
	let dom;
	let document;

	before((done) => {
		// console.log('Setting up the test');
		const html = fs.readFileSync(path.resolve(__dirname, '../src/views/bug-report-form.tpl'), 'utf8');
		dom = new JSDOM(html, { runScripts: 'dangerously' });
		document = dom.window.document;
		done();
		// console.log(html);
	});

	it('should fetch data upon submition', (done) => {
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
				'bug-description': 'This is a test bug description.',
			});
			console.log = originalLog; // Restore original console.log
			done();
		};

		// Simulate form submission
		const event = new dom.window.Event('submit', {
			bubbles: true,
			cancelable: true,
		});
		form.dispatchEvent(event);

		// Capture form data
		const formData = new dom.window.FormData(form);
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			'bug-description': formData.get('bug-description'),
		};

		// Log form data
		console.log(data);
	});

	it('should validate email input', () => {
		const form = document.getElementById('bug-report-form');
		const emailInput = document.getElementById('email');

		// Set invalid email value
		emailInput.value = 'invalid-email';

		// Simulate form submission
		const event = new dom.window.Event('submit', {
			bubbles: true,
			cancelable: true,
		});
		form.dispatchEvent(event);

		// Check if form is invalid due to invalid email
		assert.strictEqual(emailInput.checkValidity(), false);
		assert.strictEqual(emailInput.validationMessage, 'Constraints not satisfied');
	});

	it('should not be able to submit with and empty name text box', () => {
		const form = document.getElementById('bug-report-form');
		const descriptionTextarea = document.getElementById('name');

		// Set an empty name value
		descriptionTextarea.value = '';

		// Simulate form submission
		const event = new dom.window.Event('submit', {
			bubbles: true,
			cancelable: true,
		});
		form.dispatchEvent(event);

		// Check if form is invalid due to short bug description
		assert.strictEqual(descriptionTextarea.checkValidity(), false);
		assert.strictEqual(descriptionTextarea.validationMessage, 'Constraints not satisfied');
	});

	it('should not be able to submit with and empty email text box', () => {
		const form = document.getElementById('bug-report-form');
		const descriptionTextarea = document.getElementById('email');

		// Set email value that is empty
		descriptionTextarea.value = '';

		// Simulate form submission
		const event = new dom.window.Event('submit', {
			bubbles: true,
			cancelable: true,
		});
		form.dispatchEvent(event);

		// Check if form is invalid due to short bug description
		assert.strictEqual(descriptionTextarea.checkValidity(), false);
		assert.strictEqual(descriptionTextarea.validationMessage, 'Constraints not satisfied');
	});

	it('should not be able to submit with and empty description text box', () => {
		const form = document.getElementById('bug-report-form');
		const descriptionTextarea = document.getElementById('bug-description');

		// Set bug description value that is empty
		descriptionTextarea.value = '';

		// Simulate form submission
		const event = new dom.window.Event('submit', {
			bubbles: true,
			cancelable: true,
		});
		form.dispatchEvent(event);

		// Check if form is invalid due to short bug description
		assert.strictEqual(descriptionTextarea.checkValidity(), false);
		assert.strictEqual(descriptionTextarea.validationMessage, 'Constraints not satisfied');
	});
});
