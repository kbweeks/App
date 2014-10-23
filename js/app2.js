
//Parse.initialize("x2dKlDuijtZ8PTLOFrQusYC0b1yyq1IHxvrJOiDA", "s2AB8R5SL7GIhbYujjaRNQh2A9ZeXLnXwl9hzSL8");
var htmlBuilder;
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

function getList(CommentObject){
    console.log("getList" + CommentObject);
    var query = new Parse.Query(CommentObject);
    query.find({
        success: function(results) {
            console.log(results);
            $.each(results, function( index, value ) {
            console.log(results[index].attributes.cost);
            htmlBuilder += '<a href="exampleevent.html">' + '<div class="box">' + '<img src="hiking.png" />' + '<div class="row">' + '<div class="small-10 columns">' + '<ul>' + results[index].attributes.name + '</br>' + results[index].attributes.venue + " : " + results[index].attributes.town + ", " + results[index].attributes.state +  '</br>' + results[index].attributes.day + " | " + results[index].attributes.time + '</br>'
            + results[index].attributes.cost + '</ul>' + '</div>' + '<div class="small-2 columns">' + '</br></br>' + '<div class="friend-box">' + '<i class="fi-torso">' + "3" + '</i>' + '</div>' + '</div>' + '</div>' + '</div>' + '</a>';
});
            $("#event").html(htmlBuilder);
        },
        
        error: function(error) {
        }
        
    });
    
    
}