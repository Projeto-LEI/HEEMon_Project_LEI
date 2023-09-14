<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.108.0">
    <title>HEEMon - Home Electrical Energy Monitor</title>
    <link rel="icon" type="image/x-icon" href="../../static/img/favicon.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../static/css/dashboard.css" rel="stylesheet">
  </head>

  <body>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 justify-content-between" href="/dashboard">HEEMon</a>
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </header>
    <div class="container-fluid">
      <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="position-sticky pt-3 sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/dashboard">
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/voltage">
                  Tensão
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/current">
                  Corrente
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/apparent_energy">
                  Energia Aparente
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/real_energy">
                  Energia Ativa
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/reactive_energy">
                  Energia Reativa
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/power_factor">
                  Fator Potência
                </a>
              </li>
            </ul>
        </nav>

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">{{subtitle}}</h1>
          </div>
            {{!base}}
        </div>
        </main>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="https://code.highcharts.com/stock/highstock.js"></script>
    <script src="https://code.highcharts.com/stock/modules/data.js"></script>
    <script src="https://code.highcharts.com/stock/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="../../static/js/gauges.js"></script>
    <script src="../../static/js/charts.js"></script>
  </body>
</html>
