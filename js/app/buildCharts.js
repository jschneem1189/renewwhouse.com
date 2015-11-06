define(["../lib/jquery-2.1.4", "amcharts.amstock"], 
function(jquery, amcharts) {
    return {
        energyChart: function (data) {
            if (typeof data == "undefined") return;

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
            legend.periodValueText = "[[value.sum]]";
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
            chart.write("energyChart");
            return chart;
        },
        waterChart: function(data) {
            var chart = AmCharts.makeChart( "waterChart", {
                type: "stock",
                // "theme": "light",
                "pathToImages": "js/lib/amcharts_stocks/images/",

                dataSets: [ {
                    fieldMappings: [ {
                        fromField: "PGW_Supply_vol",
                        toField: "graywater"
                    }, {
                        fromField: "Rainwater_Main_vol",
                        toField: "rainwater"
                    }, {
                        fromField: "City_Main_vol",
                        toField: "citywater"
                    }],

                    color: "#7f8da9",
                    dataProvider: data,
                    title: "West Stock",
                    categoryField: "TS"
                }],

              panels: [ {
                  title: "Water Usage (gal)",
                  percentHeight: 70,
                  valueAxes: [ {
                    id: "v1",
                    dashLength: 5,
                    stackType: "regular"
                  } ],

                  categoryAxis: {
                    dashLength: 5
                  },

                  stockGraphs: [ {
                    type: "line",
                    id: "g1",
                    valueField: "graywater",
                    lineThickness: 2,
                    fillAlphas: 0.5,
                    useDataSetColors: false,
                    title: "Greywater",
                    lineColor: "#c0c0c0",
                    precision: 2,
                  }, {
                    type: "line",
                    id: "g2",
                    valueField: "rainwater",
                    lineThickness: 2,
                    fillAlphas: 0.3,
                    useDataSetColors: false,
                    title: "Rainwater",
                    lineColor: "#73be44",
                    precision: 2,
                  }, {
                    type: "line",
                    id: "g3",
                    valueField: "citywater",
                    fillAlphas: 0.3,
                    lineThickness: 2,
                    useDataSetColors: false,
                    title: "City water",
                    lineColor: "#4ba1bf",
                    precision: 2,
                  } ],

                  stockLegend: {
                    valueTextRegular: undefined,
                    periodValueTextComparing: "[[percents.value.close]]%",
                    periodValueText: "[[value.sum]]",
                  }
                },
              ],

              chartScrollbarSettings: {
                graph: "g1",
                graphType: "line",
                usePeriod: "WW"
              },

              chartCursorSettings: {
                valueLineBalloonEnabled: true,
                valueBalloonsEnabled: true,
              },

              periodSelector: {
                position: "bottom",
                periods: [ {
                  period: "DD",
                  count: 10,
                  label: "10 days"
                }, {
                  period: "MM",
                  selected: true,
                  count: 1,
                  label: "1 month"
                }, {
                  period: "YYYY",
                  count: 1,
                  label: "1 year"
                }, {
                  period: "YTD",
                  label: "YTD"
                }, {
                  period: "MAX",
                  label: "MAX"
                } ]
              },
              "export": {
                "enabled": true
              }
            } );
        },
        tempChart: function() {
            return AmCharts.makeChart("tempChart", {
                "type": "serial",
                "theme": "none",
                "dataProvider": [
                    {
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
        }
    }
});