$(document).ready(function() {
  // Function to update the gauges with new data
  function updateGauges() {
    $.get('static/tmp/heemonDB_minute.xml', function(xml) {
      // Split the lines
      var $xml = $(xml);

      // Find the latest <row> element
      //var latestRow = $xml.find("row").last();
      // Find the second-latest <row> element
      var rows = $xml.find("row");
      var latestRow = rows.eq(rows.length - 2);

      // Retrieve the values from the latest <row>
      var voltage = parseFloat(latestRow.find("v").eq(0).text()) || 0;
      var current = parseFloat(latestRow.find("v").eq(1).text()) || 0;
      var realPower = parseFloat(latestRow.find("v").eq(2).text()) || 0;
      var apparentPower = parseFloat(latestRow.find("v").eq(3).text()) || 0;
      var powerFactor = parseFloat(latestRow.find("v").eq(4).text()) || 0;
      var reactivePower = Math.sqrt(Math.pow(apparentPower, 2) - Math.pow(realPower, 2)) || 0;

      // If the  value is zero some error occured so dont update
      if(voltage === 0) {
        return;
      }

      // Update the tensao gauge
      voltageGauge.series[0].points[0].update(parseFloat(voltage.toFixed(2)));

      // Update the corrente gauge
      currentGauge.series[0].points[0].update(parseFloat(current.toFixed(2)));

      // Update the potenciaAtiva gauge
      realPowerGauge.series[0].points[0].update(parseFloat(realPower.toFixed(2)));

      // Update the potenciaAparente gauge
      apparentPowerGauge.series[0].points[0].update(parseFloat(apparentPower.toFixed(2)));

      // Update the fatorPotencia gauge
      powerFactorGauge.series[0].points[0].update(parseFloat(powerFactor.toFixed(2)));

      // Update the potenciaReativa gauge
      reactivePowerGauge.series[0].points[0].update(parseFloat(reactivePower.toFixed(2)));
    });
  }

  // Create the gauges
  var voltageGauge = Highcharts.chart('voltageGauge', {
    chart: {
      type: 'gauge',
      animation: false
    },
    title: {
      text: 'Tensão',
      style: {
        fontSize: '14px'
      }
    },
    yAxis: {
      min: 0,
      max: 250,
      title: {
        text: 'Volts'
      }
    },
    rangeSelector: {
        verticalAlign: 'top',
        x: 0,
        y: 0
    },
    series: [{
      name: 'Tensão',
      data: [0],
      tooltip: {
        valueSuffix: ' V'
      }
    }]
  });

  var currentGauge = Highcharts.chart('currentGauge', {
    chart: {
      type: 'gauge',
      animation: false
    },
    title: {
      text: 'Corrente',
      style: {
        fontSize: '14px'
      }
    },
    yAxis: {
      min: 0,
      max: 50,
      title: {
        text: 'Amperes'
      }
    },
    series: [{
      name: 'Corrente',
      data: [0],
      tooltip: {
        valueSuffix: ' A'
      }
    }]
  });

  var realPowerGauge = Highcharts.chart('realPowerGauge', {
    chart: {
      type: 'gauge',
      animation: false
    },
    title: {
      text: 'Potência Ativa',
      style: {
        fontSize: '14px'
      }
    },
    yAxis: {
      min: 0,
      max: 20,
      title: {
        text: 'kW'
      }
    },
    series: [{
      name: 'Potência Ativa',
      data: [0],
      tooltip: {
        valueSuffix: ' kW'
      }
    }]
  });

  var apparentPowerGauge = Highcharts.chart('apparentPowerGauge', {
    chart: {
      type: 'gauge',
      animation: false
    },
    title: {
      text: 'Potência Aparente',
      style: {
        fontSize: '14px'
      }
    },
    yAxis: {
      min: 0,
      max: 20,
      title: {
        text: 'kVA'
      }
    },
    series: [{
      name: 'Potência Aparente',
      data: [0],
      tooltip: {
        valueSuffix: ' kVA'
      }
    }]
  });

  var powerFactorGauge = Highcharts.chart('powerFactorGauge', {
    chart: {
      type: 'gauge',
      animation: false
    },
    title: {
      text: 'Fator Potência',
      style: {
        fontSize: '14px'
      }
    },
    yAxis: {
      min: 0,
      max: 1,
      title: {
        text: ''
      }
    },
    series: [{
      name: 'Fator Potência',
      data: [0],
      tooltip: {
        valueSuffix: ''
      }
    }]
  });

  var reactivePowerGauge = Highcharts.chart('reactivePowerGauge', {
    chart: {
      type: 'gauge',
      animation: false
    },
    title: {
      text: 'Potência Reativa',
      style: {
        fontSize: '14px'
      }
    },
    yAxis: {
      min: 0,
      max: 20,
      title: {
        text: 'kVAr'
      }
    },
    series: [{
      name: 'Potência Reativa',
      data: [0],
      tooltip: {
        valueSuffix: ' kVAr'
      }
    }]
  });

  // Update the gauges every 10 second
  updateGauges();
  setInterval(updateGauges, 10000);
});