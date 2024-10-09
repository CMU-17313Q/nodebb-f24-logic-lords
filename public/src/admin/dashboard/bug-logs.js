define('admin/dashboard/bug-logs', ['jquery', 'api'], ($, api) => {
    const BugLogs = {};
  
    BugLogs.init = () => {
      // Fetch bug logs on page load
      api.get('/api/admin/get-bug-log')
        .then((response) => {
          const bugLogs = response.bugLogs;
          // Render the bug logs table
          renderBugLogsTable(bugLogs);
        })
        .catch((err) => {
          console.error('Error fetching bug logs:', err);
          alert('Error fetching bug logs');
        });
  
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
  
    function renderBugLogsTable(bugLogs) {
        let tableBody = ''; // Change const to let
        bugLogs.forEach((log) => {
          tableBody += `
            <tr>
              <td>${log.description}</td>
              <td>${log.description}</td>
              <td>${log.status}</td>
              <td>${log.timestamp}</td>
            </tr>
          `;
        });
        $('#bug-logs-table tbody').html(tableBody);
    }
  
    // Call init directly
    BugLogs.init();
  
    return BugLogs;
  });
