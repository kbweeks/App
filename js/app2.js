
//Parse.initialize("x2dKlDuijtZ8PTLOFrQusYC0b1yyq1IHxvrJOiDA", "s2AB8R5SL7GIhbYujjaRNQh2A9ZeXLnXwl9hzSL8");
var htmlBuilder = "";
$(document).ready(function() {
    
        var parseAPPID = "x2dKlDuijtZ8PTLOFrQusYC0b1yyq1IHxvrJOiDA";
        var parseJSID = "s2AB8R5SL7GIhbYujjaRNQh2A9ZeXLnXwl9hzSL8";
        
        Parse.initialize(parseAPPID, parseJSID);
       
       var CommentObject = Parse.Object.extend("CommentObject");
       
       $("#save-event").click(function() {
            console.log("btn clicked");
            saveEvent();
            return false;
        });
       
       
        
      getList(CommentObject);
});




function getList(CommentObject){
    console.log("getList" + CommentObject);
    var query = new Parse.Query(CommentObject);
    query.find({
        success: function(results) {
            console.log(results);
            $.each(results, function( index, value ) {
            console.log(results[index].attributes.cost);
            htmlBuilder += '<a href="exampleevent.html">' + '<div class="box">' + '<div class="row">' + '<div class="small-10 columns">' + '<ul>' + results[index].attributes.name + '</br>' + results[index].attributes.venue + " : " + results[index].attributes.town + ", " + results[index].attributes.state +  '</br>' + results[index].attributes.day + " | " + results[index].attributes.time + '</br>'
            + results[index].attributes.cost + '</ul>' + '</div>' + '<div class="small-2 columns">' + '</br>' + '<div class="friend-box">' + '<i class="fi-torso">' + " 3" + '</i>' + '</div>' + '</div>' + '</div>' + '</div>' + '</a>';
});
            $("#event").html(htmlBuilder);
        },
        
        error: function(error) {
        }
        
    });
}



    

function saveEvent(){
    console.log("saveEvent()");
    
      
        
        
        //getList(CommentObject);
        
	$("#commentForm").on("submit", function(e) {
		e.preventDefault();

		console.log("Handling the submit");
		//add error handling here
		//gather the form data
                
                var eventName = $("#name").val();
                var eventVenue = $("#venue").val();
                var eventTown = $("#town").val();
                var eventState = $("#state").val();
                var eventDay = $("#day").val();
                var eventTime = $("#time").val();
                var eventCost = $("#cost").val();
                var eventDesc = $("#description").val();
    
    if(imagedata !=""){
        var parseFile = new Parse.File("pic.jpg", {base64:imagedata});
            parseFile.save().then(function() {
                console.log("getting data");
                CommentObject.set("name",eventName);
		CommentObject.set = ("venue", eventVenue);
		CommentObject.set = ("town", eventTown);
		CommentObject.set = ("state", eventState);
                CommentObject.set = ("day", eventDay);
		CommentObject.set = ("time", eventTime);
		CommentObject.set = ("cost", eventCost);
                CommentObject.set = ("description", eventDesc);
                CommentObject.set = ("file", parseFile);
                
                var comment = new CommentObject();
                comment.save(data,{
                    success:function() {
                        console.log("Success");
                        alert("You've created an event");
                    },
                    error:function(e) {
                        console.dir(e);
                    }
                });
	
            });

        }else{
            console.log("error");
            
        }

        });
}
        


function capturePhoto() {
    console.log("capturePhoto()");
    navigator.camera.getPicture(uploadPhoto,null,{sourceType:2,quality:60,});
}


function uploadPhoto(data){
    //send file to server
    console.log("uploadPhoto()");
   
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





