
var analytics_transList;

$(document).ready(function() {

    $("#page_view_analytics").bind("pagebeforeshow", function(event) {
        //test();
        loadAnalytics();
    });
});

function store_redemption() {
  // always initialize all instance properties
  this.bar = bar;
  this.baz = 'baz'; // default value
}

function loadAnalytics() {
    $("#loading_analytics").empty();
    $("#loading_analytics").append("<div>Loading Analytics...</div>");
    $("#analytics_thead").empty();
    $("#analytics_tbody").empty();
    $("#view_charts_button").empty();

    function viewAnalyticsSuccessCB(transList) {  
    	$("#loading_analytics").empty();
       	var offerUUIDs = new Object;
       	analytics_transList = transList;
        transList.forEach ( function(trans){
            offerUUIDs[trans.offer_uuid] = true;
        });
        
        console.log(transList);
        var dict = [];
        var keysSet = new Set();
        transList.forEach(function(trans){
        	if (trans.status == "OK") {
	        	key = trans.store_name;
	        	if (!keysSet.has(key)) {
	        		var list = [];
	        		keysSet.add(key);
	        		list.push(trans.created);
	        		dict.push({
	        			store_name: key,
	        			create_date: list,
	        			amount: parseInt(trans.amount)
	        		});
	        	} else {
	        		for(var i = 0; i < dict.length; i++) {
	        			if (dict[i].store_name.valueOf() == key.valueOf()) {
	        				dict[i].create_date.push(trans.created);
	        				dict[i].amount += parseInt(trans.amount);
	        				break;
	        			}
	        		}
	        	}
        	}
        });

        dict.sort(function(a, b){
        	if ( a.store_name < b.store_name )
			  return 1;
			if ( a.store_name > b.store_name )
			  return -1;
			return 0;
        });
        //new Date(trans.created).toLocaleString()

        if (dict.length == 0) {
        	// $("#analytics_table").attr("type", "hidden");
        	$("#loading_analytics").append("<div>No Redemptions.</div>");
        } else {
        	//$("#analytics_table").attr("type", "hidden");
        	$("#analytics_table").removeClass("ui-table-reflow");
        	$("#analytics_thead").append(
        			"<tr>" + 
		            "<th>Store Name</th>" + 
		            "<th>Total Redemptions</th>" + 
		            "<th>Amount</th>" + 
		            "<th>More details</th>" +
		        	"</tr>"
        		);
        	var store_counter = 0;
        	dict.forEach(function(redemptions) {
        		$("#analytics_tbody").append(
        			"<tr>" + 
	                    "<td>" + redemptions.store_name + "</td>" +
	                    "<td>" + redemptions.create_date.length + "</td>" + 
	                    "<td>" + redemptions.amount + "</td>" +
	                    "<td><button onclick='viewRedepDetails();'>View Details...</button></td>"+
	                "</tr>"
        		);
        		store_counter ++;
        	});
        	
        	transList
        	$("#view_charts_button").append(
        		"<a href='#' data-role='button' class='ui-link ui-btn ui-shadow ui-corner-all' onclick=\x22viewCharts();\x22>View Summary Charts</a>"
        	);
        }
    }
    
    function viewAnalyticsErrorCB() {
        // TODO: Deal with this error.
    }
    
    readMultipleTransactions("partner_uuid", PARTNER_UUID, viewAnalyticsSuccessCB, viewAnalyticsErrorCB);
}

function viewCharts() {
	$("#summary_chart1").empty();
	$("#summary_chart2").empty();
	$("#summary_chart3").empty();
	$("#close_summary_button").empty();

	yearList = makeYearList();
	var curYear = new Date().getFullYear();
	var chartCounter = 0;

	for (var i = curYear; i >= curYear - 2; i--) {
		if (yearList.hasOwnProperty(i)) {
			var saleObject = yearList[i];
			chartCounter++;
			$(function(){
				var classicChart;
				var idName = "summary_chart" + chartCounter;
				var classicDiv = document.getElementById(idName);

				$(idName).css('style','width:500px; height:400px; margin: 0px;padding: 0px');

				var data = new google.visualization.DataTable();
				data.addColumn('date', 'Month');
				data.addColumn('number', "Redemptions");
				data.addColumn('number', "Amount");

				data.addRows([
				    [new Date(saleObject["year"], 0), saleObject["r0"], saleObject["a0"]],
				    [new Date(saleObject["year"], 1), saleObject["r1"], saleObject["a1"]],
				    [new Date(saleObject["year"], 2), saleObject["r2"], saleObject["a2"]],
				    [new Date(saleObject["year"], 3), saleObject["r3"], saleObject["a3"]],
				    [new Date(saleObject["year"], 4), saleObject["r4"], saleObject["a4"]],
				    [new Date(saleObject["year"], 5), saleObject["r5"], saleObject["a5"]],
				    [new Date(saleObject["year"], 6), saleObject["r6"], saleObject["a6"]],
				    [new Date(saleObject["year"], 7), saleObject["r7"], saleObject["a7"]],
				    [new Date(saleObject["year"], 8), saleObject["r8"], saleObject["a8"]],
				    [new Date(saleObject["year"], 9), saleObject["r9"], saleObject["a9"]],
				    [new Date(saleObject["year"], 10), saleObject["r10"], saleObject["a10"]],
				    [new Date(saleObject["year"], 11), saleObject["r11"], saleObject["a11"]]
				]);
			        
				var classicOptions = {
			        title: 'Analytics of redemptions and amount in ' + i,
			        width: 500,
			        height: 400,
			        // Gives each series an axis that matches the vAxes number below.
			        series: {
			          0: {targetAxisIndex: 0},
			          1: {targetAxisIndex: 1}
			        },
			        vAxes: {
			          // Adds titles to each axis.
			          0: {title: 'Redemptions'},
			          1: {title: 'Amount'}
			        },
			        hAxis: {
			          ticks: [new Date(saleObject["year"], 0), new Date(saleObject["year"], 1), new Date(saleObject["year"], 2), new Date(saleObject["year"], 3),
			                  new Date(saleObject["year"], 4),  new Date(saleObject["year"], 5), new Date(saleObject["year"], 6), new Date(saleObject["year"], 7),
			                  new Date(saleObject["year"], 8), new Date(saleObject["year"], 9), new Date(saleObject["year"], 10), new Date(saleObject["year"], 11)
			                 ]
			        },
			    };

				classicChart = new google.visualization.LineChart(classicDiv);

				classicChart.draw(data, classicOptions);
			});
		}
	}

	$("#close_summary_button").append(
        "<button type='button' style='background-color:#EEEEEE; border-style:solid; border-color:#CCCCCC'; "
        + "onclick=\x22$('#popup_summary').popup('close');\x22>Close</button>"
    );
	$("#popup_summary").popup('open');
}

function makeYearList() {
	var keysSet = new Set();
	var yearList = {};
	analytics_transList.forEach(function(tran) {
		var date = parseDate(tran.created);
		if(!keysSet.has(date.year)) {
			keysSet.add(date.year);
			yearList[date.year] = {
				'year': date.year,
				'r0': 0,
				'r1': 0,
				'r2': 0,
				'r3': 0,
				'r4': 0,
				'r5': 0,
				'r6': 0,
				'r7': 0,
				'r8': 0,
				'r9': 0,
				'r10': 0,
				'r11': 0,
				'a0': 0,
				'a1': 0,
				'a2': 0,
				'a3': 0,
				'a4': 0,
				'a5': 0,
				'a6': 0,
				'a7': 0,
				'a8': 0,
				'a9': 0,
				'a10': 0,
				'a11': 0,
			}
		} 
		redemptId = 'r' + date.month;
		amountId = 'a' + date.month;
		yearList[date.year][redemptId] ++;
		yearList[date.year][amountId] += parseInt(tran.amount);
	});
	return yearList;
}

function parseDate(create_date) {
	//dict depends on the abbr. of month of Date().toString();
	var dict = {
		'Jan': 0,
		'Feb': 1,
		'Mar': 2,
		'Apr': 3,
		'May': 4,
		'Jun': 5,
		'Jul': 6,
		'Aug': 7,
		'Sep': 8,
		'Oct': 9,
		'Nov': 10,
		'Dec': 11
	};
	var s = new Date(create_date).toString();
	var dateList = s.split(" ");
	var year = dateList[3];
	var month = dict[dateList[1]];
	date = {
		'year': year,
		'month': month
	}
	return date;
}