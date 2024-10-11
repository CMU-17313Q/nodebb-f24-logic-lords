<div class="row dashboard px-lg-4">
  <div class="col-12">
    <!-- Bug Report Form -->
    <div id="bug-report-form" class="mb-4">
      <textarea id="bug-report-description" class="form-control" placeholder="Enter bug description"></textarea>
      <button id="submit-bug-report" class="btn btn-primary mt-2">Submit Bug Report</button>
    </div>

    <div class="table-responsive">
      <table class="table bug-logs-list text-sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {{{ if !bugs.length }}}
          <tr>
            <td colspan="4" class="text-center"><em>No bug logs available</em></td>
          </tr>
          {{{ end }}}
          {{{ each bugs }}}
          <tr>
            <td>{{{ this.title }}}</td>
            <td>{{{ this.description }}}</td>
            <td>{{{ this.status }}}</td>
            <td>{{{ this.timestamp }}}</td>
          </tr>
          {{{ end }}}
        </tbody>
      </table>
    </div>
  </div>
</div>