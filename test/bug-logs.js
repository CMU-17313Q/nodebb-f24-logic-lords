'use strict';

const assert = require('assert');
const $ = require('jquery');
const api = {
    get: () => {},
    post: () => {}
};

// Mock the define function
global.define = function(deps, factory) {
    module.exports = factory($, api);
};

// Adjust the path to the correct location of the bug-logs module
require('../public/src/admin/dashboard/bug-logs');

const BugLogs = require('../public/src/admin/dashboard/bug-logs');

describe('BugLogs Module', function() {
    beforeEach(function() {
        spyOn($, 'on').and.callThrough();
        spyOn($, 'val').and.callThrough();
        spyOn($, 'empty').and.callThrough();
        spyOn($, 'append').and.callThrough();
        spyOn(api, 'get').and.callThrough();
        spyOn(api, 'post').and.callThrough();
    });

    describe('init', function() {
        it('should fetch bug logs and set up event handlers', function() {
            spyOn(BugLogs, 'fetchBugLogs');
            BugLogs.init();
            assert(BugLogs.fetchBugLogs.called);
            assert($('#submit-bug-report').on.calledWith('click', jasmine.any(Function)));
        });
    });

    describe('fetchBugLogs', function() {
        it('should handle successful API response', function(done) {
            const mockData = { bugLogs: [{ user: 'test', description: 'test desc', timestamp: 'now' }] };
            api.get.and.returnValue(Promise.resolve(mockData));
            BugLogs.fetchBugLogs().then(function() {
                assert($('#bug-logs-container').empty.called);
                assert($('#bug-logs-container').append.called);
                done();
            });
        });

        it('should handle failed API response', function(done) {
            api.get.and.returnValue(Promise.reject('error'));
            BugLogs.fetchBugLogs().catch(function() {
                assert($('#bug-logs-container').append.calledWith(jasmine.any(Object)));
                done();
            });
        });
    });

    describe('submitBugReport', function() {
        it('should validate description', function() {
            $('#bug-report-description').val.and.returnValue('');
            BugLogs.submitBugReport();
            assert(alert.calledWith('Description is required'));
        });

        it('should handle successful API response', function(done) {
            $('#bug-report-description').val.and.returnValue('test desc');
            api.post.and.returnValue(Promise.resolve());
            spyOn(BugLogs, 'fetchBugLogs');
            BugLogs.submitBugReport().then(function() {
                assert(alert.calledWith('Bug report submitted successfully'));
                assert($('#bug-report-description').val.calledWith(''));
                assert(BugLogs.fetchBugLogs.called);
                done();
            });
        });

        it('should handle failed API response', function(done) {
            $('#bug-report-description').val.and.returnValue('test desc');
            api.post.and.returnValue(Promise.reject('error'));
            BugLogs.submitBugReport().catch(function() {
                assert(alert.calledWith('Error submitting bug report'));
                done();
            });
        });
    });
});