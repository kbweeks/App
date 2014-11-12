

var events = Parse.Object.extend("eventInfo");

function savePhoto(){
    var parseAPPID = "x2dKlDuijtZ8PTLOFrQusYC0b1yyq1IHxvrJOiDA";
    var parseJSID = "s2AB8R5SL7GIhbYujjaRNQh2A9ZeXLnXwl9hzSL8";
        
    Parse.initialize(parseAPPID, parseJSID);
    
    
    var base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
    var file = new Parse.File("mypic.png", { base64: base64 });
        file.save({
        success: function(file) {
        alert('File saved, now saving product with file reference...');

        var data = new eventInfo();
        // to fill the columns 
        data.set("name");
        data.set("venue");
        data.set("town");
        data.set("state");
        data.set("day");
        data.set("time");
        data.set("cost");
        data.set("description");
        //I guess it need some fixing here
        data.set("picture", file);

        data.save(null, {
            success: function(data) {
                // Execute any logic that should take place after the object is saved.

                alert('New object created with objectId: ' + data.id);
            },
            error: function(error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and description.
                alert('Failed to create new object, with error code: ' + error.description);
            }
        });
    },
    error: function(error) {
        alert('Failed to save file: ' + error.description);
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


