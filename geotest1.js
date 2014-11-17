
CommentObject = Parse.Object.extend("CommentObject");

var htmlBuilder = "";


var myLocation;


$(document).ready(function() {
        
        var parseAPPID = "x2dKlDuijtZ8PTLOFrQusYC0b1yyq1IHxvrJOiDA";
        var parseJSID = "s2AB8R5SL7GIhbYujjaRNQh2A9ZeXLnXwl9hzSL8";
        
        Parse.initialize(parseAPPID, parseJSID);
        
	
	getList(CommentObject);
	
	
	var query = new Parse.Query(CommentObject);
		//Only within 10 miles
		query.withinMiles("location", myLocation, 10);
		query.descending("createdAt");
		query.find({
			success:function(results) { getList(CommentObject); },
			error: function(error) { alert("Error: " + error.code + " " + error.message); }
		});
 
	}, function(err) {
		//Since geolocation failed, we can't allow the user to submit
		alert("Sorry, but we couldn't find your location.");
	},{timeout:20000,enableHighAccuracy:true});



	
function onDeviceReady() {
	navigator.geolocation.getCurrentPosition(geoPointStored, errorPoint,{enableHighAccuracy: true, maximumAge: 5000, timeout: 5000 });
}

function geoPointStored(position) {
	lat=position.coords.latitude;
	long=position.coords.longitude;
	
	myLocation = new Parse.GeoPoint({latitude: lat, longitude: long});
	getList();
}

function errorPoint(error){
	   alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
	
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
	var point = new Parse.GeoPoint(lat, long);
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
