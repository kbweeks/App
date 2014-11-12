
//Parse.initialize("x2dKlDuijtZ8PTLOFrQusYC0b1yyq1IHxvrJOiDA", "s2AB8R5SL7GIhbYujjaRNQh2A9ZeXLnXwl9hzSL8");
var htmlBuilder = "";
var photoName = null;
function savePhoto() {
      
        
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
                    var base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
                    
		var data = {};
		data.name = $("#name").val();
		data.venue = $("#venue").val();
		data.town = $("#town").val();
		data.state = $("#state").val();
                data.day = $("#day").val();
		data.time = $("#time").val();
		data.cost = $("#cost").val();
                data.descrip = $("#descrip").val();
                //data.photo=$("#photo").val();
                //data.file=new Parse.File("mypic.png", { base64: base64 });
                
                
                 
                
                var comment = new CommentObject();
                comment.save(data,{
                    success:function() {
                        console.log("Success");
                        alert("You've created an event!");
                        console.log(photoName);
                        var base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
                        var file = new Parse.File(photoName, { base64: base64 });
                            file.save({
                            success: function(file) {
                            alert('File saved, now saving product with file reference...');
                }
            });
                        
                        
                    },
                    error:function(e) {
                        console.dir(e);
                    }
                });
	
    });

};



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
    
    


function capturePhoto() {
    navigator.camera.getPicture(uploadPhoto,null,{sourceType:2,quality:60,});
}


function uploadPhoto(data){
    //send file to server
    console.log(data);
   photoName = data;
   cameraPic.src = data;
        navigator.notification.alert(
                'Your photo has been saved for now', //message
                okay,                           //callback
            'Photo uploaded',               //title
            'OK'                            //buttonName
        );
}

function okay (){
        //Do Something
}





