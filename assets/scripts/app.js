// Initialize Firebase
var config = {
    apiKey: "AIzaSyCSBr2yybodwLnBW7IX36_f0Ol3hvUsaeQ",
    authDomain: "smart-clock-1c80a.firebaseapp.com",
    databaseURL: "https://smart-clock-1c80a.firebaseio.com",
    projectId: "smart-clock-1c80a",
    storageBucket: "smart-clock-1c80a.appspot.com",
    messagingSenderId: "827951085237",
  };
  firebase.initializeApp(config);

// App
window.addEventListener("load", getData(genFunction));
var cdata_temp = [];
var cdata_humid = [];

function getData(callbackIN) {
    var ref = firebase.database().ref("my_classroom/air_quality");
    ref.once('value').then(function (snapshot) {
    callbackIN(snapshot.val())
    });
}


function genFunction(data) {
    cdata_temp = [];
    cdata_humid = [];
    //console.log(data);
    var keys = Object.keys(data);
    //console.log(keys);

    for(var i=0; i<keys.length; i++) {
        var k = keys[i];
        var date = data[k].date;
        var time = data[k].time;
        var temperature = data[k].temperature;
        var humidity = data[k].humidity;
        
        cdata_temp.push({
            label: time,
            value: temperature
        });
        cdata_humid.push({
            label: time,
            value: humidity
        });
    }
}

function render() {
    getData(genFunction)
    //console.log(cdata_temp);

    var tempChart = new FusionCharts({
        //id: "tempChart",
        type: 'area2d',
        renderAt: 'chart-container-temp',
        width: '1000',
        height: '400',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Temperature",
                "subCaption": "Unit: Celcius",
                "subCaptionFontBold": "0",
                "captionFontSize": "20",
                "subCaptionFontSize": "17",
                "captionPadding": "15",
                "captionFontColor": "#8C8C8C",
                "baseFontSize": "14",
                "baseFont": "Barlow",
                "canvasBgAlpha": "0",
                "bgColor": "#FFFFFF",
                "bgAlpha": "100",
                "showBorder": "0",
                "showCanvasBorder": "0",
                "showPlotBorder": "0",
                "showAlternateHGridColor": "0",
                "usePlotGradientColor": "0",
                "paletteColors": "#F00699",
                "showValues": "0",
                "divLineAlpha": "5",
                "showAxisLines": "1",
                "drawAnchors": "0",
                "xAxisLineColor": "#8C8C8C",
                "xAxisLineThickness": "0.7",
                "xAxisLineAlpha": "50",
                "yAxisLineColor": "#8C8C8C",
                "yAxisLineThickness": "0.7",
                "yAxisLineAlpha": "50",
                "baseFontColor": "#8C8C8C",
                "toolTipBgColor": "#FA8D67",
                "toolTipPadding": "10",
                "toolTipColor": "#FFFFFF",
                "toolTipBorderRadius": "3",
                "toolTipBorderAlpha": "0",
                "drawCrossLine": "1",
                "crossLineColor": "#8C8C8C",
                "crossLineAlpha": "60",
                "crossLineThickness": "0.7",
                "alignCaptionWithCanvas": "1"
            },
            "data": cdata_temp
        }
    });
    tempChart.render();

    var humidChart = new FusionCharts({
        //id: "tempChart",
        type: 'area2d',
        renderAt: 'chart-container-humid',
        width: '1000',
        height: '400',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Humidity",
                "subCaption": "Unit: Percentage",
                "subCaptionFontBold": "0",
                "captionFontSize": "20",
                "subCaptionFontSize": "17",
                "captionPadding": "15",
                "captionFontColor": "#8C8C8C",
                "baseFontSize": "14",
                "baseFont": "Barlow",
                "canvasBgAlpha": "0",
                "bgColor": "#FFFFFF",
                "bgAlpha": "100",
                "showBorder": "0",
                "showCanvasBorder": "0",
                "showPlotBorder": "0",
                "showAlternateHGridColor": "0",
                "usePlotGradientColor": "0",
                "paletteColors": "#454E9E",
                "showValues": "0",
                "divLineAlpha": "5",
                "showAxisLines": "1",
                "drawAnchors": "0",
                "xAxisLineColor": "#8C8C8C",
                "xAxisLineThickness": "0.7",
                "xAxisLineAlpha": "50",
                "yAxisLineColor": "#8C8C8C",
                "yAxisLineThickness": "0.7",
                "yAxisLineAlpha": "50",
                "baseFontColor": "#8C8C8C",
                "toolTipBgColor": "#FA8D67",
                "toolTipPadding": "10",
                "toolTipColor": "#FFFFFF",
                "toolTipBorderRadius": "3",
                "toolTipBorderAlpha": "0",
                "drawCrossLine": "1",
                "crossLineColor": "#8C8C8C",
                "crossLineAlpha": "60",
                "crossLineThickness": "0.7",
                "alignCaptionWithCanvas": "1"
            },
            "data": cdata_humid
        }
    });
    humidChart.render();
}


setInterval(render, 5000);

