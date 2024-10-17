describe('BugLogs Module', function() {
    var $;
    var api;
    var BugLogs;

    beforeEach(function() {
        $ = require('jquery');
        api = {
            get: jasmine.createSpy('get'),
            post: jasmine.createSpy('post')
        };
        BugLogs = require('admin/dashboard/bug-logs')($, api);
        spyOn($, 'on').and.callThrough();
        spyOn($, 'val').and.callThrough();
        spyOn($, 'empty').and.callThrough();
        spyOn($, 'append').and.callThrough();
    });

    describe('init', function() {
        it('should fetch bug logs and set up event handlers', function() {
            spyOn(BugLogs, 'fetchBugLogs');
            BugLogs.init();
            expect(BugLogs.fetchBugLogs).toHaveBeenCalled();
            expect($('#submit-bug-report').on).toHaveBeenCalledWith('click', jasmine.any(Function));
        });
    });

    describe('fetchBugLogs', function() {
        it('should handle successful API response', function(done) {
            var mockData = { bugLogs: [{ user: 'test', description: 'test desc', timestamp: 'now' }] };
            api.get.and.returnValue(Promise.resolve(mockData));
            BugLogs.fetchBugLogs().then(function() {
                expect($('#bug-logs-container').empty).toHaveBeenCalled();
                expect($('#bug-logs-container').append).toHaveBeenCalled();
                done();
            });
        });

        it('should handle failed API response', function(done) {
            api.get.and.returnValue(Promise.reject('error'));
            BugLogs.fetchBugLogs().catch(function() {
                expect($('#bug-logs-container').append).toHaveBeenCalledWith(jasmine.any(Object));
                done();
            });
        });
    });

    describe('submitBugReport', function() {
        it('should validate description', function() {
            $('#bug-report-description').val.and.returnValue('');
            BugLogs.submitBugReport();
            expect(alert).toHaveBeenCalledWith('Description is required');
        });

        it('should handle successful API response', function(done) {
            $('#bug-report-description').val.and.returnValue('test desc');
            api.post.and.returnValue(Promise.resolve());
            spyOn(BugLogs, 'fetchBugLogs');
            BugLogs.submitBugReport().then(function() {
                expect(alert).toHaveBeenCalledWith('Bug report submitted successfully');
                expect($('#bug-report-description').val).toHaveBeenCalledWith('');
                expect(BugLogs.fetchBugLogs).toHaveBeenCalled();
                done();
            });
        });

        it('should handle failed API response', function(done) {
            $('#bug-report-description').val.and.returnValue('test desc');
            api.post.and.returnValue(Promise.reject('error'));
            BugLogs.submitBugReport().catch(function() {
                expect(alert).toHaveBeenCalledWith('Error submitting bug report');
                done();
            });
        });
    });
});