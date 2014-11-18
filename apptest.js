
Parse.initialize("x2dKlDuijtZ8PTLOFrQusYC0b1yyq1IHxvrJOiDA", "s2AB8R5SL7GIhbYujjaRNQh2A9ZeXLnXwl9hzSL8");
CommentObject = Parse.Object.extend("CommentObject");

var htmlBuilder = "";

var currentLocation;


document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
	console.log("onDeviceReady()");
	navigator.geolocation.getCurrentPosition(getPoint, onError);
	console.log(pos);
		
	};



function getPoint(position) {
	lat=position.coords.latitude;
	long=position.coords.longitude;
	
	
	currentLocation = new Parse.GeoPoint({latitude: lat, longitude: long});
}


function onError(error) {
        console.log("onError()");
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }




$(document).ready(function() {
        
	
	getList(CommentObject);
	
	
	
	if($("#submitEventBtn").length === 1) {
		currentLocation=null;
		navigator.geolocation.getCurrentPosition(function(pos) {
			//store the long/lat
			currentLocation = {longitude:pos.coords.longitude, latitude:pos.coords.latitude};
			console.log(pos);
			$("#sumbitEventBtn");
		}, function(err) {
			//Since geolocation failed, we can't allow the user to submit
			alert("Sorry, but we couldn't find your location.");
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
				geoPoint:point
			},{
				success:function(object) {
					console.log("Saved object");
					alert("You've created an event");
				},
				error:function(model, error) {
					console.log(":(");
				}
		});
 
	
	
	
	if($("#event").length === 1) {

		//Update status 
		$("#event").html("Loading Content...");

		navigator.geolocation.getCurrentPosition(getPoint, onError);
			

			//Begin our query
			var query = new Parse.Query(CommentObject);
			//Only within 10 miles
			query.withinMiles("geoPoint", currentLocation, 10);
			query.find({
				success:function(results) { getList(results,currentLocation); },
				error: function(error) { alert("Error: " + error.code + " " + error.message); }
			});

		
		
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
            htmlBuilder +=  '<div class="box">' + '<div class="row">' + '<div class="small-9 columns">' + '<ul>' + results[index].attributes.name + '</br>' + results[index].attributes.venue + " : " + results[index].attributes.town + ", " + results[index].attributes.state +  '</br>' + results[index].attributes.day + " | " + results[index].attributes.time + '</br>'
            + results[index].attributes.cost + '</ul>' + '</div>' +'<div class="small-2 columns">'+'<button data-text-swap="Going">Not Going</button>' + '</br>' + '<div class="friend-box">' + '<i class="fi-torso">' + " 3" + '</i>' + '</div>' + '</div>' + '</div>' + '</div>' + '</a>';
});
            $("#event").html(htmlBuilder);
        },
        
        error: function(error) {
        }
	
	
        
    });
	
}


var button = document.querySelectorAll("button")[0];
button.addEventListener('click', function() {
  if (button.getAttribute("data-text-swap") == button.innerHTML) {
    button.innerHTML = button.getAttribute("data-text-original");
  } else {
    button.setAttribute("data-text-original", button.innerHTML);
    button.innerHTML = button.getAttribute("data-text-swap");
  }
}, false);
