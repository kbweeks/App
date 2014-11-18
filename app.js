//Parse.initialize("x2dKlDuijtZ8PTLOFrQusYC0b1yyq1IHxvrJOiDA", "s2AB8R5SL7GIhbYujjaRNQh2A9ZeXLnXwl9hzSL8");
var htmlBuilder = "";
$(document).ready(function() {
        
        var parseAPPID = "x2dKlDuijtZ8PTLOFrQusYC0b1yyq1IHxvrJOiDA";
        var parseJSID = "s2AB8R5SL7GIhbYujjaRNQh2A9ZeXLnXwl9hzSL8";
        
        Parse.initialize(parseAPPID, parseJSID);
        var CommentObject = Parse.Object.extend("CommentObject");
        
	
        getList(CommentObject);
	
        
	$("#commentForm").on("submit", function(e) {
		e.preventDefault();
		
		console.log("Handling the submit");
		//add error handling here
		//gather the form data

		var data = {};
		data.name = $("#name").val();
		data.venue = $("#venue").val();
		data.town = $("#town").val();
		data.state = $("#state").val();
                data.day = $("#day").val();
		data.time = $("#time").val();
		data.cost = $("#cost").val();
                data.description=$("#description").val();
		//placeObject.set("location", point);
                
                var comment = new CommentObject();
                comment.save(data,{
                    success:function() {
                        console.log("Success");
                        alert("You've created an event, now invite your friends!");
                    },
                    error:function(e) {
                        console.dir(e);
                    }
                });
	
    });

});

$.ui.ready(function(){
	console.log("navbar");
      $("#bottom-bar").css("bottom", "auto");
      $("#bottom-bar").css("top",(85 + $("#content").offset().height) + "px"); //44px is the height of the header
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
    
function changeText(idElement) {
    var element = document.getElementById('element' + idElement);
    if (idElement === 1) {
        if (element.innerHTML === 'Not Going') element.innerHTML = 'Going';
        else {
            element.innerHTML = 'Not Going';
        }
    }
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    console.log("onDeviceReady()");
}


function capturePhoto() {
    navigator.camera.getPicture(uploadPhoto,null,{sourceType:2,quality:60,});
}


function uploadPhoto(data){
    //send file to server
   
   cameraPic.src = data;
        navigator.notification.alert(
                'Your photo has been uploaded', //message
                okay,                           //callback
            'Photo uploaded',               //title
            'OK'                            //buttonName
        );
}

function okay (){
        //Do Something
}



}

