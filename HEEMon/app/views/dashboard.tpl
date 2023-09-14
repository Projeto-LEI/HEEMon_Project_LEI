<!-- Use of rebase to reutilize the frame of the base page -->
<!-- Pass as arguments, subtitle and html elements defined here, that will be used in the base template  -->
% rebase('./layouts/base.tpl', subtitle='Dashboard') 

<!-- Only passes the id of desired gauges -->
<div class="gauge-container">
    <div id="voltageGauge" class="gauge"></div>
    <div id="currentGauge" class="gauge"></div>
    <div id="realPowerGauge" class="gauge"></div>
    <div id="apparentPowerGauge" class="gauge"></div>
    <div id="reactivePowerGauge" class="gauge"></div>
    <div id="powerFactorGauge" class="gauge"></div>
</div>