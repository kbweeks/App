
var htmlBuilder = "";

var currentLocation;

CommentObject = Parse.Object.extend("CommentObject");

$(document).ready(function() {
        
        var parseAPPID = "x2dKlDuijtZ8PTLOFrQusYC0b1yyq1IHxvrJOiDA";
        var parseJSID = "s2AB8R5SL7GIhbYujjaRNQh2A9ZeXLnXwl9hzSL8";
        
        Parse.initialize(parseAPPID, parseJSID);
        
	
	getList(CommentObject);
	
	
	 if($("#submitEventBtn").length === 1) {
		currentLocation=null;
		navigator.geolocation.getCurrentPosition(function(pos) {
			//store the long/lat
			currentLocation = {longitude:pos.coords.longitude, latitude:pos.coords.latitude};
			$("#sumbitEventBtn").removeAttr("disabled");
		}, function(err) {
			//Since geolocation failed, we can't allow the user to submit
			alert("Sorry, we couldn't find your location. Try connecting to Wi-Fi or try again later.");
		});

	}
	
	
	$("#commentForm").on("submit", function(e) {
	e.preventDefault();
 
	//get values
	var name = $("#name").val();
	var venue = $("#venue").val();
	var town = $("#town").val();
	var state = $("#state").val();
        var day = $("#day").val();
	var time = $("#time").val();
	var cost = $("#cost").val();
        var description=$("#description").val();
 
	var comment = new CommentObject();
	var point = new Parse.GeoPoint({latitude: currentLocation.latitude, longitude: currentLocation.longitude});
	comment.save(
			{
				name:name,
				venue:venue,
				town:town,
				state:state,
				day:day,
				time:time,
				cost:cost,
				description:description,
				location:point
			},{
				success:function(object) {
					console.log("Saved object");
					alert("You've created an event");
				},
				error:function(model, error) {
					console.log("Please try again later.");
				}
			});
 
	});



if($("#event").length === 1) {
 
	//Update status 
	$("#event").html("Checking your location for nearby events.");
 
	navigator.geolocation.getCurrentPosition(function(pos) {
		var myLocation = new Parse.GeoPoint({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
 
		//Begin query
		var query = new Parse.Query(TipObject);
		//Only within 10 miles
		query.withinMiles("location", myLocation, 10);
		query.find({
			success:function(results) { getList(CommentObject,myLocation); },
			error: function(error) { alert("Error: " + error.code + " " + error.message); }
		});
 
	}, function(err) {
		//Since geolocation failed, we can't allow the user to submit
		alert("Sorry, but we couldn't find your location.");
	},{timeout:20000,enableHighAccuracy:false});
}

});

function getList(CommentObject){
    console.log("getList" + CommentObject);
    var query = new Parse.Query(CommentObject);
    query.find({
        success: function(results) {
            console.log(results);
            $.each(results, function( index, value ) {
            console.log(results[index].attributes.cost);
            htmlBuilder +=  '<div class="box">' + '<div class="row">' + '<div class="small-10 columns">' + '<ul>' + results[index].attributes.name + '</br>' + results[index].attributes.venue + " : " + results[index].attributes.town + ", " + results[index].attributes.state +  '</br>' + results[index].attributes.day + " | " + results[index].attributes.time + '</br>'
            + results[index].attributes.cost + '</ul>' + '</div>' + '<button id="element1" onclick="javascript:changeText(1)">Not Going</button>'+ '<div class="small-2 columns">' + '</br></br>' + '<div class="friend-box">' + '<i class="fi-torso">' + " 3" + '</i>' + '</div>' + '</div>' + '</div>' + '</div>' + '</a>';
});
            $("#event").html(htmlBuilder);
        },
        
        error: function(error) {
        }
	
	
        
    });
	
}	
