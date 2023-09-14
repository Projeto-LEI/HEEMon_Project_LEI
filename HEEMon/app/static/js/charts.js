//Build the the voltage chart based on data collected on xml file
$(document).ready(function() {
    var options = {                                 //literal object to setting chart properties
        chart: {
            renderTo: 'voltageChart',
            zoomBySingleTouch: true,
            zoomType: 'x',
            type: 'line'
        },
        legend:{ 
            enabled:false 
        },
        xAxis: {
            type:'datetime'
        },
        yAxis: {
            min:0,
            title: {
                text: 'Volts'
            }
        },
        rangeSelector: {
            verticalAlign: 'top',
            x: 0,
            y: 0,
            buttons: [ 
                {
                    type: 'day',
                    count: 1,
                    text: 'hour',
                    dataGrouping: {
                        approximation: 'Average',
                        forced: true,
                        units: [['hour',[1]]]
                    }
                }, {
                    type: 'week',
                    count: 1,
                    text: 'day',
                    dataGrouping: {
                        approximation: 'Average',
                        forced: true,
                        units: [['day',[1]]]
                    }
                }, {
                    type: 'month',
                    count: 1,
                    text: 'week',
                    dataGrouping: {
                        approximation: 'Average',
                        forced: true,
                        units: [['week',[1]]]
                    }
                }, {
                    type: 'all',
                    text: 'year',
                    dataGrouping: {
                        approximation: 'Average',
                        forced: true,
                        units: [['month',[1]]]
                    }
                }, {
                    type: 'all',
                    text: 'All'
                }],
                selected: 0
        },
        exporting:{
            buttons: {
                contextButton: {
                    // Include only the desired options in the context menu to be showed
                    menuItems: [
                        'viewFullscreen',
                        'separator',
                        'downloadPNG',
                        'separator',
                        'downloadPDF',
                        'downloadCSV',
                        'downloadXLS',
                        'separator',
                        'printChart',
                    ]
                }
            }
        },
        series: []
    };
    //Parse and extract data from xml file and load on data array
    $.get('static/tmp/heemonDB_all.xml', function(xml) {
        // Split the lines
        var $xml = $(xml);
        //define series
        var seriesOptions = {
            name: "Tensão",
            tooltip: {
                valueSuffix: ' V'
              },
            data: []
        };
        options.series.push(seriesOptions);
        //populate with data
        $(xml).find("row").each(function() {
            var t = parseInt($(this).find("t").text()) * 1000
            $(this).find("v").eq(0).each(function(index) {
                var v = parseFloat(parseFloat($(this).text()).toFixed(2))
                v = v || null
                if (v != null) {
                    options.series[index].data.push([t, v])
                };
            });
        });
        var chart = new Highcharts.stockChart(options);
    });
    
});

//Build the the current chart based on data collected on xml file
$(document).ready(function() {
    var options = {
        chart: {
            renderTo: 'currentChart',
            zoomBySingleTouch: true,
            zoomType: 'x',
            type: 'line'
        },
        legend:{ 
            enabled:false 
        },
        xAxis: {
            type:'datetime'
        },
        yAxis: {
            min:0,
            title: {
                text: 'Amperes'
            }
        },
        rangeSelector: {
            verticalAlign: 'top',
            x: 0,
            y: 0,
            buttons: [ 
                {
                    type: 'day',
                    count: 1,
                    text: 'hour',
                    dataGrouping: {
                        approximation: 'Average',
                        forced: true,
                        units: [['hour',[1]]]
                    }
                }, {
                    type: 'week',
                    count: 1,
                    text: 'day',
                    dataGrouping: {
                        approximation: 'Average',
                        forced: true,
                        units: [['day',[1]]]
                    }
                }, {
                    type: 'month',
                    count: 1,
                    text: 'week',
                    dataGrouping: {
                        approximation: 'Average',
                        forced: true,
                        units: [['week',[1]]]
                    }
                }, {
                    type: 'all',
                    text: 'year',
                    dataGrouping: {
                        approximation: 'Average',
                        forced: true,
                        units: [['month',[1]]]
                    }
                }, {
                    type: 'all',
                    text: 'All'
                }],
                selected: 0
        },
        exporting:{
            buttons: {
                contextButton: {
                    // Include only the desired options in the context menu to be showed
                    menuItems: [
                        'viewFullscreen',
                        'separator',
                        'downloadPNG',
                        'separator',
                        'downloadPDF',
                        'downloadCSV',
                        'downloadXLS',
                        'separator',
                        'printChart',
                    ]
                }
            }
        },
        series: []
    };
    //Parse and extract data from xml file and load on data array
    $.get('../static/tmp/heemonDB_all.xml', function(xml) {
        // Split the lines
        var $xml = $(xml);
        //define series
        var seriesOptions = {
            name: 'Corrente',
            tooltip: {
                valueSuffix: ' A'
              },
            data: []
        };
        options.series.push(seriesOptions);
        //populate with data
        $(xml).find("row").each(function() {
            var t = parseInt($(this).find("t").text()) * 1000
            $(this).find("v").eq(1).each(function(index) {
                var v = parseFloat(parseFloat($(this).text()).toFixed(2))
                v = v || null
                if (v != null) {
                    options.series[index].data.push([t, v])
                };
            });
        });
        var chart = new Highcharts.stockChart(options);
    });
});

//Build the the active power chart based on data collected on xml file
$(document).ready(function() {
    var options = {
        chart: {
            renderTo: 'realPowerChart',
            zoomBySingleTouch: true,
            zoomType: 'x',
            type: 'column'
        },
        legend:{ 
            enabled:false 
        },
        xAxis: {
            type:'datetime'
        },
        yAxis: {
            min:0,
            title: {
                text: 'kWh'
            }
        },
        rangeSelector: {
            verticalAlign: 'top',
            x: 0,
            y: 0,
            buttons: [ 
                {
                    type: 'day',
                    count: 1,
                    text: 'hour',
                    dataGrouping: {
                        approximation: 'sum',
                        forced: true,
                        units: [['hour',[1]]]
                    }
                }, {
                    type: 'week',
                    count: 1,
                    text: 'day',
                    dataGrouping: {
                        approximation: 'sum',
                        forced: true,
                        units: [['day',[1]]]
                    }
                }, {
                    type: 'month',
                    count: 1,
                    text: 'week',
                    dataGrouping: {
                        approximation: 'sum',
                        forced: true,
                        units: [['week',[1]]]
                    }
                }, {
                    type: 'all',
                    text: 'year',
                    dataGrouping: {
                        approximation: 'sum',
                        forced: true,
                        units: [['month',[1]]]
                    }
                }, {
                    type: 'all',
                    text: 'All'
                }],
                selected: 0
        },
        exporting:{
            buttons: {
                contextButton: {
                    // Include only the desired options in the context menu to be showed
                    menuItems: [
                        'viewFullscreen',
                        'separator',
                        'downloadPNG',
                        'separator',
                        'downloadPDF',
                        'downloadCSV',
                        'downloadXLS',
                        'separator',
                        'printChart',
                    ]
                }
            }
        },
        series: []
    };
    //Parse and extract data from xml file and load on data array
    $.get('../static/tmp/heemonDB_all.xml', function(xml) {
        // Split the lines
        var $xml = $(xml);
        //define series
        var seriesOptions = {
            name: "Potência Ativa",
            tooltip: {
                valueSuffix: ' kWh'
              },
            data: []
        };
        options.series.push(seriesOptions);
        //populate with data
        $(xml).find("row").each(function() {
            var t = parseInt($(this).find("t").text()) * 1000
            $(this).find("v").eq(2).each(function(index) {
                var v = parseFloat(parseFloat($(this).text()).toFixed(2))
                v = v || null
                if (v != null) {
                    options.series[index].data.push([t, v])
                };
            });
        });
        var chart = new Highcharts.stockChart(options);
    }); 
});

//Build the the apparent power chart based on data collected on xml file
$(document).ready(function() {
    var options = {
        chart: {
            renderTo: 'apparentPowerChart',
            zoomBySingleTouch: true,
            zoomType: 'x',
            type: 'column'
        },
        legend:{ 
            enabled:false 
        },
        xAxis: {
            type:'datetime'
        },
        yAxis: {
            min:0,
            title: {
                text: 'kVAh'
            }
        },
        rangeSelector: {
            verticalAlign: 'top',
            x: 0,
            y: 0,
            buttons: [ 
                {
                    type: 'day',
                    count: 1,
                    text: 'hour',
                    dataGrouping: {
                        approximation: 'sum',
                        forced: true,
                        units: [['hour',[1]]]
                    }
                }, {
                    type: 'week',
                    count: 1,
                    text: 'day',
                    dataGrouping: {
                        approximation: 'sum',
                        forced: true,
                        units: [['day',[1]]]
                    }
                }, {
                    type: 'month',
                    count: 1,
                    text: 'week',
                    dataGrouping: {
                        approximation: 'sum',
                        forced: true,
                        units: [['week',[1]]]
                    }
                }, {
                    type: 'all',
                    text: 'year',
                    dataGrouping: {
                        approximation: 'sum',
                        forced: true,
                        units: [['month',[1]]]
                    }
                }, {
                    type: 'all',
                    text: 'All'
                }],
                selected: 0
        },
        exporting:{
            buttons: {
                contextButton: {
                    // Include only the desired options in the context menu to be showed
                    menuItems: [
                        'viewFullscreen',
                        'separator',
                        'downloadPNG',
                        'separator',
                        'downloadPDF',
                        'downloadCSV',
                        'downloadXLS',
                        'separator',
                        'printChart',
                    ]
                }
            }
        },
        series: []
    };
    //Parse and extract data from xml file and load on data array
    $.get('../static/tmp/heemonDB_all.xml', function(xml) {
        // Split the lines
        var $xml = $(xml);
        //define series
        var seriesOptions = {
            name: "Potência Aparente",
            tooltip: {
                valueSuffix: ' kVAh'
              },
            data: []
        };
        options.series.push(seriesOptions);
        //populate with data
        $(xml).find("row").each(function() {
            var t = parseInt($(this).find("t").text()) * 1000
            $(this).find("v").eq(3).each(function(index) {
                var v = parseFloat(parseFloat($(this).text()).toFixed(2))
                v = v || null
                if (v != null) {
                    options.series[index].data.push([t, v])
                };
            });
        });
        var chart = new Highcharts.stockChart(options);
    });
    
});

//Build the the reactive power chart based on data collected on xml file
$(document).ready(function() {
    var options = {
        chart: {
            renderTo: 'reactivePowerChart',
            zoomBySingleTouch: true,
            zoomType: 'x',
            type: 'column'
        },
        legend:{ 
            enabled:false 
        },
        xAxis: {
            type:'datetime'
        },
        yAxis: {
            min:0,
            title: {
                text: 'kVArh'
            }
        },
        rangeSelector: {
            verticalAlign: 'top',
            x: 0,
            y: 0,
            buttons: [ 
                {
                    type: 'day',
                    count: 1,
                    text: 'hour',
                    dataGrouping: {
                        approximation: 'sum',
                        forced: true,
                        units: [['hour',[1]]]
                    }
                }, {
                    type: 'week',
                    count: 1,
                    text: 'day',
                    dataGrouping: {
                        approximation: 'sum',
                        forced: true,
                        units: [['day',[1]]]
                    }
                }, {
                    type: 'month',
                    count: 1,
                    text: 'week',
                    dataGrouping: {
                        approximation: 'sum',
                        forced: true,
                        units: [['week',[1]]]
                    }
                }, {
                    type: 'all',
                    text: 'year',
                    dataGrouping: {
                        approximation: 'sum',
                        forced: true,
                        units: [['month',[1]]]
                    }
                }, {
                    type: 'all',
                    text: 'All'
                }],
                selected: 0
        },
        exporting:{
            buttons: {
                contextButton: {
                    // Include only the desired options in the context menu to be showed
                    menuItems: [
                        'viewFullscreen',
                        'separator',
                        'downloadPNG',
                        'separator',
                        'downloadPDF',
                        'downloadCSV',
                        'downloadXLS',
                        'separator',
                        'printChart',
                    ]
                }
            }
        },
        series: []
    };
    //Parse and extract data from xml file and load on data array
    $.get('../static/tmp/heemonDB_all.xml', function(xml) {
        // Split the lines
        var $xml = $(xml);
        //define series
        var seriesOptions = {
            name: "Potência Reativa",
            tooltip: {
                valueSuffix: ' kVArh'
              },
            data: []
        };
        options.series.push(seriesOptions);
        //populate with data
        $(xml).find("row").each(function() {
            var t = parseInt($(this).find("t").text()) * 1000
            var active
            var aparent
            $(this).find("v").eq(2).each(function() {
                active = parseFloat($(this).text())
                active = active || null
            });
            $(this).find("v").eq(3).each(function(index) {
                aparent = parseFloat($(this).text())
                aparent = aparent || null
                var reactive = parseFloat(parseFloat(Math.sqrt(Math.pow(aparent, 2) - Math.pow(active, 2))).toFixed(2)) || null
                if (reactive != null) {
                    options.series[index].data.push([t, reactive])
                };
            });
        });
        var chart = new Highcharts.stockChart(options);
    });
});

//Build the the power factor chart based on data collected on xml file
$(document).ready(function() {
    var options = {
        chart: {
            renderTo: 'powerFactorChart',
            zoomBySingleTouch: true,
            zoomType: 'x',
            type: 'line'
        },
        legend:{ 
            enabled:false 
        },
        xAxis: {
            type:'datetime'
        },
        yAxis: {
            min:0,
            title: {
                text: ''
            }
        },
        rangeSelector: {
            verticalAlign: 'top',
            x: 0,
            y: 0,
            buttons: [ 
                {
                    type: 'day',
                    count: 1,
                    text: 'hour',
                    dataGrouping: {
                        approximation: 'Average',
                        forced: true,
                        units: [['hour',[1]]]
                    }
                }, {
                    type: 'week',
                    count: 1,
                    text: 'day',
                    dataGrouping: {
                        approximation: 'Average',
                        forced: true,
                        units: [['day',[1]]]
                    }
                }, {
                    type: 'month',
                    count: 1,
                    text: 'week',
                    dataGrouping: {
                        approximation: 'Average',
                        forced: true,
                        units: [['week',[1]]]
                    }
                }, {
                    type: 'all',
                    text: 'year',
                    dataGrouping: {
                        approximation: 'Average',
                        forced: true,
                        units: [['month',[1]]]
                    }
                }, {
                    type: 'all',
                    text: 'All'
                }],
                selected: 0
        },
        exporting:{
            buttons: {
                contextButton: {
                    // Include only the desired options in the context menu to be showed
                    menuItems: [
                        'viewFullscreen',
                        'separator',
                        'downloadPNG',
                        'separator',
                        'downloadPDF',
                        'downloadCSV',
                        'downloadXLS',
                        'separator',
                        'printChart',
                    ]
                }
            }
        },
        series: []
    };
    //Parse and extract data from xml file and load on data array 
    $.get('../static/tmp/heemonDB_all.xml', function(xml) {
        // Split the lines
        var $xml = $(xml);
        //define series
        var seriesOptions = {
            name: "Fator Potência",
            data: []
        };
        options.series.push(seriesOptions);
        //populate with data
        $(xml).find("row").each(function() {
            var t = parseInt($(this).find("t").text()) * 1000
            $(this).find("v").eq(4).each(function(index) {
                var v = parseFloat(parseFloat($(this).text()).toFixed(2))
                v = v || null
                if (v != null) {
                   options.series[index].data.push([t, v])
                };
            });
        });
        var chart = new Highcharts.stockChart(options);
    }); 
});