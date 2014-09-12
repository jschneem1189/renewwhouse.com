// SETUP CONFIG
requirejs.config({

    // Define paths; relative from js folder
    paths: {
        'amcharts'          : '../lib/amcharts_stocks/amcharts',
        'amcharts.serial'   : '../lib/amcharts_stocks/serial',
        'amcharts.amstock'       : '../lib/amcharts_stocks/amstock'
    },

    // Define dependencies
    shim: {
        'amcharts.serial'   : {
            deps: ['amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts.amstock'       : {
            deps: ['amcharts.serial'],
            exports: 'AmStockChart',
            init: function() {
                AmCharts.isReady = true;
            }
        }
    } 
});

require(["../lib/jquery", "header", "amcharts.amstock"], 
          function() {
  //AMCHARTS
  this.buildChart = function(data){
    // create chart
    var chart = new AmCharts.AmStockChart();
    chart.pathToImages = "js/lib/amcharts_stocks/images/";

    // create data set
    var dataSet = new AmCharts.DataSet();
    dataSet.dataProvider = data;
    dataSet.fieldMappings = [{fromField:"val", toField:"value"},{fromField:"val2", toField:"value2"},{fromField:"gas_val", toField:"gas_value"}];
    dataSet.categoryField = "date";
    dataSet.title = "Energy Consumed";

    chart.dataSets = [dataSet];
    var stockPanel = new AmCharts.StockPanel();
    chart.panels = [stockPanel];

    // change settings
    var panelsSettings = new AmCharts.PanelsSettings();
    panelsSettings.startDuration = 1;
    // panelsSettings.panEventsEnabled = false;
    chart.panelsSettings = panelsSettings;

    // create graph
    var graph = new AmCharts.StockGraph();
    graph.valueField = "value";
    graph.type = "column";
    graph.newStack = true;
    graph.fillAlphas = 1;
    graph.title = "Total Energy Usage (kWh)";
    graph.periodValue = "Sum";
    stockPanel.addStockGraph(graph);

    var gas_graph = new AmCharts.StockGraph();
    gas_graph.valueField = "gas_value";
    gas_graph.type = "column";
    gas_graph.newStack = true;
    gas_graph.lineColor = "#ffcc00";
    gas_graph.useDataSetColors = false;
    gas_graph.fillAlphas = 1;
    gas_graph.title = "Gas Usage (kWh)";
    gas_graph.periodValue = "Sum";
    stockPanel.addStockGraph(gas_graph);

    var graph2 = new AmCharts.StockGraph();
    graph2.valueField = "value2";
    graph2.type = "line";
    // graph2.newStack = true;
    graph2.fillAlphas = 0.5;
    graph2.title = "Energy Harvested (kWh)";
    graph2.lineThickness = 3;
    graph2.lineColor = "#fff";
    graph2.useDataSetColors = false;
    graph2.periodValue = "Sum";
    stockPanel.addStockGraph(graph2);

    // category axis settings
    var categoryAxesSettings = new AmCharts.CategoryAxesSettings();
    categoryAxesSettings.minPeriod = "DD";
    // categoryAxesSettings.equalSpacing = true;
    if ($(window).width() > 950) {
      categoryAxesSettings.maxSeries = 100;
    } else {
      categoryAxesSettings.maxSeries = 50;
    }
    categoryAxesSettings.dashLength = 5;
    categoryAxesSettings.groupToPeriods = ["DD", "WW", "MM", "YYYY"];
    chart.categoryAxesSettings = categoryAxesSettings;

    var valueAxesSettings = new AmCharts.ValueAxesSettings();
    valueAxesSettings.dashLength = 5;
    chart.valueAxesSettings  = valueAxesSettings;

    // add graph to the scrollbar
    var chartScrollbarSettings = new AmCharts.ChartScrollbarSettings();
    chartScrollbarSettings.graph = graph;
    chartScrollbarSettings.graphType = "line";
    chartScrollbarSettings.dragIconWidth = 40;
    chart.chartScrollbarSettings = chartScrollbarSettings;

    // add legend
    var legend = new AmCharts.StockLegend();
    stockPanel.stockLegend = legend;

    // add tooltips
    var chartCursorSettings = new AmCharts.ChartCursorSettings();
    chartCursorSettings.valueBalloonsEnabled = true;
    chart.chartCursorSettings = chartCursorSettings;

    // add period selector
    var periodSelector = new AmCharts.PeriodSelector();
    // periodSelector.position = "bottom";
    periodSelector.periods = [
       {period:"WW", count:1, label:"1 week"},
       {period:"MM", selected:true, count:1, label:"1 month"},
       {period:"YYYY", count:1, label:"1 year"},
       {period:"YTD", label:"YTD"},
       {period:"MAX", label:"MAX"}
    ];
    chart.periodSelector = periodSelector;

    // draw chart
    chart.write("stockChart");
    this.chart = chart;
  };

  // register resize
  window.onresize = function(evt) {
    if ($(window).width() > 950) {
      this.chart.categoryAxesSettings.maxSeries = 100;
    } else {
      this.chart.categoryAxesSettings.maxSeries = 50;
    }
    this.chart.validateNow();
  }.bind(this);

  // get data
  $.ajax({
    url:"data/getEnergyData_stock.php",  // live site
    // url:"http://localhost/data/getEnergyData_stock.php",     // local testing
    success: function(responseText) {
      // console.debug(responseText);
      var chartData = JSON.parse(responseText);

      //hide activity indicator
      clearInterval(this.timer);
      $('#activityIndicator').css("-webkit-animation-play-state", "paused");
      $('#activityContainer').hide();

      // build the amchart
      this.buildChart(chartData);
    }.bind(this),
    error: function() {
      // alert("error fetching php script");
    }
  });

  var count = 0;
  var animateDots = function() {
    if (count == 0) {
      $('#dot1').css('visibility','hidden');
      $('#dot2').css('visibility','hidden');
      $('#dot3').css('visibility','hidden');
    } else {
      $('#dot'+count).css('visibility','visible');
    }

    count = (count < 3) ? count+1 : 0;
  }
  animateDots();
  this.timer = setInterval(animateDots,750);
});


// require([], function() {
//   var pieData = [
//     {
//         value: 300,
//         color:"#F7464A",
//         highlight: "#FF5A5E",
//         label: "Kitchen"
//     },
//     {
//         value: 50,
//         color: "#46BFBD",
//         highlight: "#5AD3D1",
//         label: "Laundry"
//     },
//     {
//         value: 100,
//         color: "#FDB45C",
//         highlight: "#FFC870",
//         label: "Bedroom"
//     }
//   ]
//   var pieOptions = {
//       //Boolean - Whether we should show a stroke on each segment
//       segmentShowStroke : true,

//       //String - The colour of each segment stroke
//       segmentStrokeColor : "#fff",

//       //Number - The width of each segment stroke
//       segmentStrokeWidth : 2,

//       //Number - The percentage of the chart that we cut out of the middle
//       percentageInnerCutout : 0, // This is 0 for Pie charts

//       //Number - Amount of animation steps
//       animationSteps : 100,

//       //String - Animation easing effect
//       animationEasing : "easeOutBounce",

//       //Boolean - Whether we animate the rotation of the Doughnut
//       animateRotate : true,

//       //Boolean - Whether we animate scaling the Doughnut from the centre
//       animateScale : false,

//       //String - A legend template
//       legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

//   }
//   var pie1 = document.getElementById("energyUsedPieChart").getContext("2d");
//   var myPieChart1 = new Chart(pie1).Pie(pieData,pieOptions);

//   var pie2 = document.getElementById("energyGainedPieChart").getContext("2d");
//   var myPieChart2 = new Chart(pie2).Pie(pieData,pieOptions);
// });