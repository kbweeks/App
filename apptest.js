



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
	fixBar()
;		
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

$( ".box" ).hide();
$( "#hide" ).click(function( event ) {
  event.preventDefault();
  $( this ).hide();
});

//trying to make nav not popup
function fixBar() {
	/* we need this only on touch devices */
if (Modernizr.touch) {
    /* cache dom references */ 
    var $body = jQuery('body'); 

    /* bind events */
    $(document)
    .on('focus', 'input', function(e) {
        $body.addClass('fixfixed');
    })
    .on('blur', 'input', function(e) {
        $body.removeClass('fixfixed');
    });
} 

}

document.write( '<style>#footer{visibility:hidden}@media(min-height:' + ($( window ).height() - 10) + 'px){#footer{visibility:visible}}</style>' );

$(document).ready(function() {
        
	
	getList(CommentObject);
	
	
	
	
	
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
            + results[index].attributes.cost + '</ul>' + '</div>' + '<div class="small-1 columns">'+ '<div id="place-x">' + '</div>'+'<input id="' + results[index].id + '" class="text-swap" value="Not Going" type="button" />' + '</br>' +
	    '<div class="friend-box">' + '<i class="fi-torso"></i> ' + '<span class="counter">' + currentGoing +'</span>' + '' + '</div>' + '</div>' +'</div>' + '</div>' + '<button id="hide">X</button>';
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
	console.log("inside if not going");
	
	getUpdateGoing(1, clickedObjectId);
  } else {
	console.log("inside going");
	button.attr('value', 'Not Going');
	var clickedObjectId = this.id;
	//subtract 1
	getUpdateGoing(-1, clickedObjectId);

  }
  
});
	//getUpdateGoing(value, id);
}

function getUpdateGoing(value, id){
	console.log("**********");
	
	var query = new Parse.Query(CommentObject);
	console.log(query);
	console.log(id);
	query.get(id, {
	success: function(object) {
	// object is an instance of Parse.Object.
	currentGoing = object.attributes.currentGoing;
	console.log(currentGoing);
	if (currentGoing == null || currentGoing == undefined) {
		currentGoing = 0;
	    }
    
    
    updateUpdateGoing(currentGoing, id, value);
  },

  error: function(object, error) {
    // error is an instance of Parse.Error.
  }
});
}

function updateUpdateGoing(currentGoing, id, value){
	
	
	
	//var currentGoing = results[index].attributes.currentGoing;

	//var query = new Parse.Query(CommentObject);
	
	// Create a pointer to an object of class Point with id dlkj83d
	var Point = Parse.Object.extend("CommentObject");
	var point = new Point();
	point.id =  id;
	
	
	console.log(currentGoing);
	var newVal = currentGoing + value;
	console.log(newVal);
	// Set a new value on quantity
	point.set("currentGoing", newVal);
	
	// Save
	point.save(null, {
	success: function(point) {
	  // Saved successfully.
	  console.log("success");
	},
	error: function(point, error) {
	  // The save failed.
	  // error is a Parse.Error with an error code and description.
	  console.log("fail");
	}
	});
	      
	
	
	

}

//update function in parse - which item they clicked on (query.find one result by objectId), do a save only changing that one field
	//then after that, write to html
//event listener, take id of focus, $ has a css property - change it to top 0
//
