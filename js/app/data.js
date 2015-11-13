// SETUP CONFIG
requirejs.config({

        // Define paths; relative from js folder
        paths: {
                'jquery'            : '../lib/jquery-2.1.4',
                'amcharts'          : '../lib/amcharts_stocks/amcharts',
                'amcharts.serial'   : '../lib/amcharts_stocks/serial',
                'amcharts.amstock'  : '../lib/amcharts_stocks/amstock',
                'waypoints'         : '../lib/waypoints.min',
                'buildConfig'       : 'buildConfig',
                'eMonitor'          : 'emonitorMappings',
                'buildCharts'       : 'buildCharts',
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
            'amcharts.amstock'  : {
                deps: ['amcharts.serial'],
                exports: 'AmStockChart',
                init: function() {
                    AmCharts.isReady = true;
                }
            }
        } 
});

require(["../lib/jquery-2.1.4", "mainNav", "waypoints", "buildConfig", "eMonitor", "buildCharts"], 
function(jquery, mainNav, waypoints, buildConfig, eMonitor, buildCharts) {
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
    this.tempchart = buildCharts.tempChart();

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

    var errorMsg = "Oops, there was an error retrieving the following data: ";

    function get(url) {
        // Return a new promise.
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                success: function(response) {
                    resolve(response);
                },
                error: function(err) {
                    reject(Error(err));
                }
            });
        })
    }

    // conditionally define the server addresses based on if we are debugging or not
    var loginAddr = (buildConfig.debug) ? "http://localhost/php/getEmonitorLogin.php" : "php/getEmonitorLogin.php";
    var gasAddr = (buildConfig.debug) ? "http://localhost/php/getGasData.php" : "php/getGasData.php";
    var waterAddr = (buildConfig.debug) ? "http://localhost/php/getWaterData.php" : "php/getWaterData.php";
    var energyAddr = (buildConfig.debug) ? "http://localhost/php/getEnergyData.php" : "php/getEnergyData.php";
    var that = this;
    // use Promise.all to download data in parallel
    Promise.all([
        get(loginAddr).then(JSON.parse).then(function(creds) {
            return get("https://api.emonitor.us/customer/authenticate?login="+creds.login+"&password="+
                creds.password+"&json=1");
        }).catch(function(err) {
            alert("There was an error locating credentials to the eMonitor service.");
            console.debug(err);
        }).then(function(response) {
            eMonitor['key'] = response.securitykey;
            return get("https://api.emonitor.us/location/getHistoricalData?security_key="+eMonitor.key+
                "&period=days&startTime=2015-11-12T00:00&json=1");
        }).then(function(response) {
            eMonitor.energyData = response[eMonitor.locationId].data;
        }).catch(function(e) {
            alert(errorMsg+"ELECTRICITY");
            eMonitor.energyData = [];
        }),

        get(energyAddr).then(JSON.parse).then(function(response) {
            eMonitor.databaseData = response;
        }).catch(function(e) {
            alert(errorMsg+"ELECTRICITY");
            eMonitor.databaseData = [];
        }),

        get(gasAddr).then(JSON.parse).then(function(response) {
            eMonitor.gasData = response;
        }).catch(function (e) {
            alert(errorMsg+"GAS");
            eMonitor.gasData = [];
        }),

        get(waterAddr).then(JSON.parse).then(function(response) {
            buildCharts.waterChart(response);
            updateCisternChart(response[response.length-1].Cistern_Level);
        }).catch(function(e) {
            alert(errorMsg+"WATER");
        })
    ]).then(function(response) {
        processChartData(eMonitor);
        that.energyChart = buildCharts.energyChart(eMonitor.chartData);
        clearInterval(this.timer);
        $('#activityIndicator').css("-webkit-animation-play-state", "paused");
        $('#activityContainer').hide();
    });

    // the code below will query for the list of eMonitor channel IDs
    // Promise.all([
    //     get(loginAddr).then(JSON.parse).then(function(creds) {
    //         return get("https://api.emonitor.us/customer/authenticate?login="+creds.login+"&password="+
    //             creds.password+"&json=1");
    //     }).catch(function(err) {
    //         alert("There was an error locating credentials to the eMonitor service.");
    //         console.debug(err);
    //     }).then(function(response) {
    //         eMonitor['key'] = response.securitykey;
    //         return get("https://api.emonitor.us/location/getCurrentData?security_key="+eMonitor.key+
    //             "&period=days&startTime=2013-10-01T00:00&json=1");
    //     }).then(function(response) {
    //         console.debug(response);
    //     }).catch(function(e) {
    //         alert(errorMsg+"ELECTRICITY");
    //         eMonitor.energyData = [];
    //     })
    // ]);

    function processChartData(emonitorObj) {
        if (typeof emonitorObj.gasData != "undefined" && typeof emonitorObj.energyData != "undefined"
            && typeof emonitorObj.databaseData != "undefined") {
            emonitorObj['chartData'] = [];
            // var nov7Date = new Date(2015, 10, 7);       // date for comparison of which set of channelIds to use

            // FIRST -- add all of the historical data that is saved in the database. This data is no longer accurately sent form eMonitor's servers.
            for (var i=0; i<emonitorObj.databaseData.length; i++) {
                var dbRow = emonitorObj.databaseData[i];
                var date = dbRow[emonitorObj.databaseChannelIds.date];
                var push = false;
                // the dates are off by 1 day, so we need to translate them to an adjustedDate
                var adjustedDate = new Date(Date.parse(date.split(' ').join('T')));
                adjustedDate.setDate(adjustedDate.getDate() + 1);
                var dateString = adjustedDate.toISOString().split('T')[0];
                console.debug(dateString);

                var obj = {};
                obj['date'] = dateString;
                var mainsData = +dbRow[emonitorObj.databaseChannelIds.mains1] + +dbRow[emonitorObj.databaseChannelIds.mains2];
                var solarData = +dbRow[emonitorObj.databaseChannelIds.westSolar1] + +dbRow[emonitorObj.databaseChannelIds.westSolar2] +
                    +dbRow[emonitorObj.databaseChannelIds.southSolar1] + +dbRow[emonitorObj.databaseChannelIds.southSolar2];
                // solar data comes in negative, so flip the sign
                solarData = Math.max(0, solarData*-1);
                // need to add solar panel energy to the main energy because it is subtracted out when we get it
                obj['kwh'] = mainsData + solarData;
                obj['solar'] = solarData;

                // if there is gas data on this same day, add the converted kwh data to current val
                if (typeof emonitorObj.gasData[dateString] != "undefined") {
                    obj['gas'] = +emonitorObj.gasData[dateString];
                    // if there is energy already for that day, add this number to get the total
                    if (typeof obj['kwh'] == "undefined"){
                        obj['kwh'] = 0;
                    }
                    obj['kwh'] += +emonitorObj.gasData[dateString];
                }
                emonitorObj['chartData'].push(obj);
            }

            // SECOND -- add all of the data grabbed from the eMonitor servers (post change to circuit names on Nov 6, 2015)
            for (var date in emonitorObj.energyData) {
                var obj = {};
                var push = false;
                // the dates are off by 1 day, so we need to translate them to an adjustedDate
                var adjustedDate = new Date(Date.parse(date.split(' ').join('T')));
                adjustedDate.setDate(adjustedDate.getDate() + 1);
                var dateString = adjustedDate.toISOString().split('T')[0];
                if (emonitorObj.energyData.hasOwnProperty(date)) {
                    obj['date'] = dateString;
                    var mainsData = ((emonitorObj.eMonitorChannelIds.mains1 in emonitorObj.energyData[date]) ? +emonitorObj.energyData[date][emonitorObj.eMonitorChannelIds.mains1].kWh : 0) +
                        ((emonitorObj.eMonitorChannelIds.mains2 in emonitorObj.energyData[date]) ? +emonitorObj.energyData[date][emonitorObj.eMonitorChannelIds.mains2].kWh : 0);
                    var solarData = ((emonitorObj.eMonitorChannelIds.westSolar1 in emonitorObj.energyData[date]) ? +emonitorObj.energyData[date][emonitorObj.eMonitorChannelIds.westSolar1].kWh : 0) +
                        ((emonitorObj.eMonitorChannelIds.westSolar2 in emonitorObj.energyData[date]) ? +emonitorObj.energyData[date][emonitorObj.eMonitorChannelIds.westSolar2].kWh : 0) +
                        ((emonitorObj.eMonitorChannelIds.southSolar1 in emonitorObj.energyData[date]) ? +emonitorObj.energyData[date][emonitorObj.eMonitorChannelIds.southSolar1].kWh : 0) +
                        ((emonitorObj.eMonitorChannelIds.southSolar2 in emonitorObj.energyData[date]) ?+emonitorObj.energyData[date][emonitorObj.eMonitorChannelIds.southSolar2].kWh : 0);
                    solarData = Math.max(0, solarData*-1);
                    obj['kwh'] = mainsData + solarData;
                    obj['solar'] = solarData;
                    push = true;
                }
                if (push) {
                    emonitorObj['chartData'].push(obj);
                }
            }
        }
    }

    function updateCisternChart(volume) {
        var capacity = 2855.34;          // tank capacity
        // bounds check
        if (isNaN(volume) || volume < 0) {
            volume = 0;
        } else if (volume > capacity) {
            volume = capacity;
        }
        var percentage = Math.round((volume / capacity) * 100);
        // console.debug(percentage);

        $('#infoValue').html(percentage);
        var feetHeight = $('#cisternImg').height() / 14.3;
        var scaleFactor = $('#cisternImg').width() / 3.26797;           // height of the tank
        var height = (percentage/100)*scaleFactor + feetHeight;
        $('#waterfill').css('height', height);
    }
});