// get assignments on page
function getAssignments(){
		// get current url
		var currentURL = window.location.origin;
		// make api call
		$.get(currentURL + "/api/studentoverview/assignments", function(data){
			// for each part of the data
			for(var i = 0 ; i < data.length ; i++){
				// make an assignment div
				var assignment = $('<div>');
				// append a linked h4 to it
				assignment.append("<h4><a href='/comments/" + data[i].id + "'>" + data[i].title  + "</a><h4>")
				// append it to assignments
				$("#assignments").append(assignment);
			}
		})
}

// call it
$(document).on('ready', function(){
	getAssignments()
});