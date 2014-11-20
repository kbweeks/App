



Parse.initialize("x2dKlDuijtZ8PTLOFrQusYC0b1yyq1IHxvrJOiDA", "s2AB8R5SL7GIhbYujjaRNQh2A9ZeXLnXwl9hzSL8");
CommentObject = Parse.Object.extend("CommentObject");

var htmlBuilder = "";

var currentLocation;
var currentGoing;

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

//trying to make nav not popup
/*function noFocus() {
	
$('input, textarea')
.on('focus', function (e) {
    $('bottom-bar').css('position', 'absolute');
})
.on('blur', function (e) {
    $('bottom-bar').css('position', 'fixed');
    //force page redraw to fix incorrectly positioned fixed elements
    setTimeout( function() {
        window.scrollTo( $.mobile.window.scrollLeft(), $.mobile.window.scrollTop() );
    }, 20 );
});



function stopFocus() {
	$("#bottom-bar").css({"top":"0"});
}

}*/

$(document).ready(function() {
        
	
	getList(CommentObject);
	
	$("#hide").click(function(){
		console.log("running-hide");
		var which = $(this).index();
		$(".box").find('.box').hide().eq(which);
	});
	
	
	
	if($("#submitEventBtn").length === 1) {
		currentLocation=null;
		navigator.geolocation.getCurrentPosition(function(position) {
			//store the long/lat
			currentLocation = {longitude:position.coords.longitude, latitude:position.coords.latitude};
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
    console.log(query);
    query.descending("currentGoing");
    query.find({
        success: function(results) {
            //console.log(results);
            $.each(results, function( index, value ) {
            console.log(results[index].attributes.cost);
	    console.log(results[index].id);
	    var currentGoing = results[index].attributes.currentGoing;
	    if (currentGoing == undefined) {
		currentGoing = 0;
	    }
	    
            htmlBuilder +=  '<div class="box">' + '<div class="row">' + '<div class="small-10 columns">' + '<ul>' + '</br>' + results[index].attributes.name + '</br>' + results[index].attributes.venue + " : " + results[index].attributes.town + ", "
	    + results[index].attributes.state +  '</br>' + results[index].attributes.day + " | " + results[index].attributes.time + '</br>'
            + results[index].attributes.cost + '</ul>' + '</div>' + '<div class="small-1 columns">'+ '<div id="place-x">' +'<button id="hide">X</button>' + '</div>'+'<input id="' + results[index].id + '" class="text-swap" value="Not Going" type="button" />' + '</br>' +
	    '<div class="friend-box">' + '<i class="fi-torso"></i> ' + '<span class="counter">' + currentGoing +'</span>' + '' + '</div>' + '</div>' +'</div>' + '</div>';
});
            $("#event").html(htmlBuilder);
	    buttonClick();
        },
	
        
        error: function(error) {
        }
	
	
        
    });
	
}


function buttonClick(){
	//console.log("button");
//var button = document.querySelectorAll("button")[0];

$(".text-swap").on( "click", function() {
	console.log("clicked");
	var button = $(this);
	//console.log(button.attr('value'));
  if (button.attr('value') == "Not Going") {
	button.attr('value', 'Going');
	//add plus 1
	var clickedObjectId = this.id;
	
	
	updateGoing(1, clickedObjectId);
  } else {
	button.attr('value', 'Not Going');
	//subtract 1
	updateGoing(-1);

  }
  
});
	//updateGoing(value);
}

function updateGoing(value, id){
	//var currentGoing = results[index].attributes.currentGoing;
	
	
	var query = new Parse.Query(CommentObject);
	
	query.get(id, {
		success: function(id) {
			currentGoing = results[index].attributes.currentGoing + value;
			
			id.save(
				{
				currentGoing:currentGoing,
  },
  {
				success:function(object) {
					console.log("updated value");
				},
				error:function(model, error) {
					console.log("not saved");
				}
				
				 //htmlBuilder += currentGoing
		});
	},
  
  error: function(object, error) {
    // The object was not retrieved successfully.
    // warn the user
    console.log("single id not found");
  }
		
	
	})
	
	

}

//update function in parse - which item they clicked on (query.find one result by objectId), do a save only changing that one field
	//then after that, write to html
//event listener, take id of focus, $ has a css property - change it to top 0
//
