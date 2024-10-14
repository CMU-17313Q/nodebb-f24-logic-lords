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
        <tbody>
          <!-- Use Benchpress syntax for iteration -->
          {{{ if !bugs.length }}}
          <tr>
            <td colspan="4" class="text-center"><em>No bug logs available</em></td>
          </tr>
          {{{ end }}}
          {{{ each bugs }}}
          <tr>
            <td><!-- IMPORT bugs.title --></td>
            <td><!-- IMPORT bugs.description --></td>
            <td><!-- IMPORT bugs.status --></td>
            <td><!-- IMPORT bugs.timestamp --></td>
          </tr>
          {{{ end }}}
        </tbody>
      </table>
    </div>
  </div>
</div>
