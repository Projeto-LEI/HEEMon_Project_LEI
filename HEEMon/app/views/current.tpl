<!-- Use of rebase to reutilize the frame of the base page -->
<!-- Pass as arguments, subtitle and html elements defined here, that will be used in the base template  -->
% rebase('./layouts/base.tpl', subtitle='Corrente')

<!-- Only passes the id of desired gauges -->
<div class="chart-container">
    <div class="chart" id="currentChart"></div>
</div>