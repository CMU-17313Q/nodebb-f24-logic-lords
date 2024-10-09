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
          {{#unless bugs.length}}
          <tr>
            <td colspan="4" class="text-center"><em>No bug logs available</em></td>
          </tr>
          {{/unless}}
          {{#each bugs}}
          <tr>
            <td>{{this.title}}</td>
            <td>{{this.description}}</td>
            <td>{{this.status}}</td>
            <td>{{this.timestamp}}</td>
          </tr>
          {{/each}}
        </tbody>
      </table>
    </div>
  </div>
</div>