// SETUP CONFIG
requirejs.config({

    // Define paths; relative from js folder
    paths: {
        'amcharts'          : '../lib/amcharts_stocks/amcharts',
        'amcharts.serial'   : '../lib/amcharts_stocks/serial',
        'amcharts.amstock'  : '../lib/amcharts_stocks/amstock',
        'jquery'            : '../lib/jquery-2.1.4',
        'waypoints'         : '../lib/waypoints.min'
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

require(["../lib/jquery-2.1.4", "mainNav", "amcharts.amstock", "waypoints"], function() {
  
  // ---------------------------------------------------------------------------
  // Build AMCHART given a data set --------------------------------------------
  // ---------------------------------------------------------------------------
  function buildChart(data){
    // create chart
    var chart = new AmCharts.AmStockChart();
    chart.pathToImages = "js/lib/amcharts_stocks/images/";

    // create data set
    var dataSet = new AmCharts.DataSet();
    dataSet.dataProvider = data;
    dataSet.fieldMappings = [{fromField:"kwh", toField:"value"},{fromField:"solar", 
        toField:"value2"},{fromField:"gas", toField:"gas_value"}];
    dataSet.categoryField = "date";
    dataSet.title = "Energy Consumed";

    chart.dataSets = [dataSet];
    var stockPanel = new AmCharts.StockPanel();
    chart.panels = [stockPanel];

    // change settings
    var panelsSettings = new AmCharts.PanelsSettings();
    panelsSettings.startDuration = 1;
    panelsSettings.panEventsEnabled = false;
    chart.panelsSettings = panelsSettings;

    // create graph
    var energy_graph = new AmCharts.StockGraph();
    energy_graph.valueField = "value";
    energy_graph.type = "column";
    energy_graph.newStack = true;
    energy_graph.fillAlphas = 0.8;
    energy_graph.title = "Total Energy Usage (kWh)";
    energy_graph.periodValue = "Sum";
    energy_graph.precision = 2;
    stockPanel.addStockGraph(energy_graph);

    var gas_graph = new AmCharts.StockGraph();
    gas_graph.valueField = "gas_value";
    gas_graph.type = "column";
    gas_graph.newStack = true;
    gas_graph.lineColor = "#ffcc00";
    gas_graph.useDataSetColors = false;
    gas_graph.fillAlphas = 1;
    gas_graph.title = "Gas Usage (kWh)";
    gas_graph.periodValue = "Sum";
    gas_graph.precision = 2;
    stockPanel.addStockGraph(gas_graph);

    var solar_graph = new AmCharts.StockGraph();
    solar_graph.valueField = "value2";
    solar_graph.type = "line";
    // solar_graph.newStack = true;
    solar_graph.fillAlphas = 0.5;
    solar_graph.title = "Energy Harvested (kWh)";
    solar_graph.lineThickness = 3;
    solar_graph.lineColor = "#fff";
    solar_graph.useDataSetColors = false;
    solar_graph.periodValue = "Sum";
    solar_graph.precision = 2;
    stockPanel.addStockGraph(solar_graph);

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
    chartScrollbarSettings.graph = energy_graph;
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
    periodSelector.dateFormat = "MM-DD-YYYY";
    chart.periodSelector = periodSelector;

    // draw chart
    chart.write("stockChart");
    this.energychart = chart;
  };

  // ---------------------------------------------------------------------------
  // Setup Page behaviors ------------------------------------------------------
  // ---------------------------------------------------------------------------

  // register resize
  window.onresize = function(evt) {
    if (this.energychart) {
      if ($(window).width() > 950) {
        this.energychart.categoryAxesSettings.maxSeries = 100;
      } else {
        this.energychart.categoryAxesSettings.maxSeries = 50;
      }
      this.energychart.validateNow();
    }

    // reposition temperatures
    var imgHeight = $('.explodedView').height();
    var topTop = 0;
    var middleTop = imgHeight/2;
    var bottomTop = imgHeight + 50;
    $('#top').css('top', middleTop);
    $('#middle').css('top', middleTop);
    $('#bottom').css('top', middleTop);
    var sectionHeight = imgHeight*2 + 100;
    // set the height of the exploded container explicitly since its contents are 'absolute'
    $('#explodedContainer').css('height', sectionHeight);
    // if items are stacked, add to the height
    if ($('#rightHalf').css('clear') == 'both') {
      sectionHeight += 450;
    }

    // don't center the icon for mobile (check clear attr)
    if ($('#temperatureSection .icon').css('clear') == 'both') {
      sectionHeight += $('#temperatureSection .icon').height() + 
          parseInt($('#temperatureSection .icon').css('margin-top').split('px')[0],10);
      $('#temperatureSection .icon').css('margin-top', 40);
    }
    $('#temperatureSection').css('height', sectionHeight);

    $('#atticTemp').css('top',imgHeight*.04);
    $('#secondBathTemp').css('top',imgHeight*.30);
    $('#eastBedroomTemp').css('top',imgHeight*.29);
    $('#northBedroomTemp').css('top',imgHeight*.22);
    $('#southBedroomTemp').css('top',imgHeight*.09);

    $('#firstBathTemp').css('top',imgHeight/2 + imgHeight*.30);
    $('#livingTemp').css('top',imgHeight/2 + imgHeight*.50);
    $('#diningTemp').css('top',imgHeight/2 + imgHeight*.42);
    $('#kitchenTemp').css('top',imgHeight/2 + imgHeight*.32);
    $('#officeTemp').css('top',imgHeight/2 + imgHeight*.20);
    $('#basementTemp').css('top',imgHeight + 50 + imgHeight*.42);

    // redraw the temperature chart based on new size
    if (this.tempchart)
      this.tempchart.validateNow();

    this.explodeHouse = function() {
      $('#top').animate({
        top:topTop
      },400, function() {
        // animation complete
        $('#tempWrapper').fadeIn(250);
      });
      $('#bottom').animate({
        top:bottomTop
      },400, function() {
        // animation complete
      });
    }
    this.implodeHouse = function() {
      $('#tempWrapper').fadeOut(250);
      $('#top').animate({
        top:middleTop
      },400, function() {
        // animation complete
        $('#tempWrapper').fadeOut(0);
      });
      $('#bottom').animate({
        top:middleTop
      },400, function() {
        // animation complete
      });
    }
  }.bind(this);

  $(window).load(window.onresize());

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


  // temp chart
  this.tempchart = AmCharts.makeChart("tempChart", {
    "type": "serial",
    "theme": "none",
    "dataProvider": [{
        "timeframe": "Before Retrofit",
        "energy": 77.18
    }, {
        "timeframe": "After Retrofit",
        "energy": 12.59
    }],
    "valueAxes": [{
        "gridColor":"#FFFFFF",
    "gridAlpha": 0.2,
    "dashLength": 0
    }],
    "gridAboveGraphs": true,
    "startDuration": 1,
    "graphs": [{
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "energy"
    }],
    "fontFamily": "Oswald Light",
    "fontSize":16,
    "titles": [
    {
      "size": 20,
      // "color": "white",
      "bold": true,
      "text": "HVAC Energy Consumption (kWh)"
    }
  ],
    "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
    },
    "categoryField": "timeframe",
    "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
         "tickPosition":"start",
         "tickLength":20
    },
    "exportConfig":{
      "menuTop": 0,
      "menuItems": [{
        "icon": '/lib/3/images/export.png',
        "format": 'png'   
        }]  
    },
    "panEventsEnabled":false
  });

  // Add Waypoints
  $('#middle').waypoint(function(direction) {
    if (direction == "down") {
      this.implodeHouse();
    } else {
      this.explodeHouse();
    }
  }.bind(this),{
    offset:'0%'
  });
  $('#middle').waypoint(function(direction) {
    if (direction == "down") {
      this.explodeHouse();
    } else {
      this.implodeHouse();
    }
  }.bind(this),{
    offset:'50%'
  });

  // ---------------------------------------------------------------------------
  // GET THE DATA FROM EMONITOR SERVER -----------------------------------------
  // ---------------------------------------------------------------------------
  var eMonitor = {
    locationId:'2744',
    channelIds: {
      mains: 194882,
      flashWaterHeater: 194884,
      geothermal: 194885,
      kitchenOutletRight: 194886,
      kitchenOutletLeft: 194887,
      bathroomOutlets: 194888,
      firstFloorLights: 194889,
      kitchenLights: 194890,
      dishwasher: 194891,
      washingMachine: 194892,
      erv: 194893,
      forcedAirFan: 194894,
      waterHeater: 194895,
      eastBasementLights: 194896,
      westBasementLights: 194897,
      utilitySinkOutlets: 194898,
      bufferTank: 194899,
      dryer: 194900,
      bedroomSpaceConditioners: 194902,
      refrigerator: 194903,
      secondFloorLights: 194904,
      eastBasementOutlets: 194905,
      southNorthBedroomOutlets: 194906,
      livingRoomOutletsClosetLights: 194907,
      hallwayDiningKitchenOutlets: 194908,
      westBasementOutlets: 194909,
      oven: 194910,
      lightNewUtilityCloset: 194912,
      officeOutlet: 194913,
      smokeDetector: 194914,
      oven7: 194915,
      solar1: 194916,
      solar2: 194917,
      oven2: 194918
    }
  };

  // get security key
 $.ajax({
    url:"https://api.emonitor.us/customer/authenticate?login=Whirlpool&password=ReNEWWHouse&json=1",
    crossDomain: true,
    // dataType: 'jsonp',    // TO BE REMOVED
   success: function(responseObj) {
    eMonitor['key'] = responseObj.securitykey;
    getHistoricalData();
   },
   error: function(e) {
     alert(errorMsg+"SECURITY KEY");
   }
 });

  var errorMsg = "Oops, there was an error retrieving the following data: ";

  // get historical energy data
  function getHistoricalData() {
    $.ajax({
      url:"https://api.emonitor.us/location/getHistoricalData?security_key="+eMonitor.key+
        "&period=days&startTime=2013-10-01T00:00&json=1",
      crossDomain: true,
      // dataType: 'jsonp',    // TO BE REMOVED
      success: function(responseObj) {
        eMonitor.energyData = responseObj[eMonitor.locationId].data;
        tryToBuildChart();
      },
      error: function(e) {
        alert(errorMsg+"ELECTRICITY");
        eMonitor.energyData = [];
      }
    });
  }

  // get historical temperature data
  // $.ajax({
  //   url:"https://api.emonitor.us/location/getThermostatData?security_key=" + eMonitor.key +
  //       "&period=days&startTime=2013-10-01T00:00&json=1",
  //   crossDomain: true,
  //   dataType: 'jsonp',    // TO BE REMOVED
  //   success: function(responseText) {
  //     eMonitor.energyData = JSON.parse(responseText)[eMonitor.locationId].data;
  //     tryToBuildChart();
  //   },
  //   error: function(e) {
  //     alert(errorMsg);
  //   }
  // });

  // ---------------------------------------------------------------------------
  // Fetch the gas data from local db ------------------------------------------
  // ---------------------------------------------------------------------------
   $.ajax({
    url:"php/getGasData.php",  // live site
    // url:"http://localhost/php/getGasData.php",     // local testing
    success: function(responseText) {
      // console.debug(responseText);
      try {
        eMonitor.gasData = JSON.parse(responseText);
      } catch (e) {
        alert(errorMsg+"GAS");
        eMonitor.gasData = [];
      } finally {
        // check if we are ready to build the amchart
        tryToBuildChart();
      }
    }.bind(this),
    error: function() {
      alert(errorMsg+"GAS");
      eMonitor.gasData = [];
    }
  });

  function tryToBuildChart() {
    if (typeof eMonitor.gasData != "undefined" && typeof eMonitor.energyData != "undefined") {
      eMonitor['chartData'] = [];

      for (var date in eMonitor.energyData) {
        var obj = {};
        var push = false;
        var adjustedDate = new Date(Date.parse(date.split(' ').join('T')));
        adjustedDate.setDate(adjustedDate.getDate() + 1);
        var dateString = adjustedDate.toISOString().split('T')[0];
        if (eMonitor.energyData.hasOwnProperty(date)) {
          obj['date'] = dateString;
          obj['kwh'] = +eMonitor.energyData[date][eMonitor.channelIds.mains].kWh - 
              +eMonitor.energyData[date][eMonitor.channelIds.solar1].kWh - 
              +eMonitor.energyData[date][eMonitor.channelIds.solar2].kWh;
          obj['solar'] = (+eMonitor.energyData[date][eMonitor.channelIds.solar1].kWh +
              +eMonitor.energyData[date][eMonitor.channelIds.solar2].kWh) * -1;
          push = true;
        }
        if (typeof eMonitor.gasData[dateString] != "undefined") {
          obj['gas'] = +eMonitor.gasData[dateString];
          // if there is energy already for that day, add this number to get the total
          if (typeof obj['kwh'] == "undefined"){
            obj['kwh'] = 0;
          }
          obj['kwh'] += +eMonitor.gasData[dateString];
        }
        if (push) {
          eMonitor['chartData'].push(obj);
        }
      }

      buildChart(eMonitor.chartData);

      clearInterval(this.timer);
      $('#activityIndicator').css("-webkit-animation-play-state", "paused");
      $('#activityContainer').hide();
    }
  }
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