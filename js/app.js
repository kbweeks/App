

function capturePhoto() {
    navigator.camera.getPicture(uploadPhoto,null,{sourceType:1,quality:60,});
}


function uploadPhoto(data){
   
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



