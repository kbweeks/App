
Parse.initialize("x2dKlDuijtZ8PTLOFrQusYC0b1yyq1IHxvrJOiDA", "s2AB8R5SL7GIhbYujjaRNQh2A9ZeXLnXwl9hzSL8");

var name;
var venue;
var city;
var state;
var day;
var time;
var cost;

function testResults(form) {
    //event.preventDefault();
    //console.log("submit button");
    var name = form.name.value;
    console.log(name);
    var venue = form.venue.value;
    console.log(venue);
    var city = form.city.value;
    console.log(city);
    var state = form.state.value;
    console.log(state);
    var day = form.day.value;
    console.log(day);
    var time = form.time.value;
    console.log(time);
    var cost = form.cost.value;
    console.log(cost);
    createEvent();
    
};


/*function onDeviceReady() {
    //needed only for mobile deployment
    console.log("onDeviceReady()");
    
    updateEvent();
}*/

$( document ).ready(function() {
    //for browser use only
    console.log( "document ready!" );
    //function to populate menu
   
  
    var ref = new Firebase("https://eventurous.firebaseio.com//events");
    

});


function createEvent(){
    //ref.push("USA");
    console.log("createEvent");
    ref.push({
        name: name,
        venue: venue,
        city: city,
        state: state,
        day: day,
        time: time,
        cost: cost,
    });
}


