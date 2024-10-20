<div class="row dashboard px-lg-4">
  <div class="col-12">
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
        <tbody id="bug-logs-container">
          <!-- Use Benchpress syntax for iteration -->
          {{{ if !bugs.length }}}
          <tr>
            <td colspan="4" class="text-center"><em>No bug logs available</em></td>
          </tr>
          {{{ end }}}
          {{{ each bugs }}}
          <tr>
            <td>{{title}}</td>
            <td>{{description}}</td>
            <td>{{status}}</td>
            <td>{{timestamp}}</td>
          </tr>
          {{{ end }}}
        </tbody>
      </table>
    </div>
  </div>
</div>