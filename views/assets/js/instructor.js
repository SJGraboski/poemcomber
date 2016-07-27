// get assignments for instructor page
function getAssignments(){
		
		// get current url
		var currentURL = window.location.origin;

		// make get request to api
		$.get(currentURL + "/api/professoroverview/assignments", function(data){

			// for each assignment
			for(var i = 0 ; i < data.length ; i++){

				// make an assignment
				var assignment = $('<div>');

				// append link to assignment to the div 
				assignment.append("<a href='/comments/" + data[i].id + "/'>" + data[i].title  + 
					" (" + data[i].author +")</a>")

				// append the div to the assignment panel
				$("#assignments").append(assignment);
			}
		})
}

// get Students and their comments on the instructor page
function getStudents(){
		
		// get current url
		var currentURL = window.location.origin;

		// make empty array to store data
		var dataArr = [];

		// make get request to api
		$.get(currentURL + "/api/professoroverview/students", function(data){
				
				// the data is now in the data array
				dataArr = data;
				
		// for each entry in the array
		$.each(dataArr, function(i){
					
			// save the id
			var id = dataArr[i].id;
			
			// save the id in an object
			var obj = {"id": id };

			// make post request with obj to api
			$.post(currentURL + "/api/professoroverview/studentcomments", obj, function(c_data){
					console.log(c_data);
				// save a student div
				var student = $('<div class="students" data-id=' + dataArr[i].id +'>');

				// append an h4 with the student's name to the div
				student.append("<h4>" + dataArr[i].username  + "<h4>");

				// if there's at least one comment in the c_data array
				if (c_data.length >= 1) {
					// make a list
					var list = $('<ul>');
					// go through every comment in the c_data array
					for (var j = 0; j < c_data.length; j++){
						// append all of the proper data to the list, including a link to the assignment
						list.append("<li><a href='/comments/" + c_data[j].assignment.id + "'>"  +
												c_data[j].assignment.title + "</a>: \"" + c_data[j].comment + "\"</li>");
					}
					// append the list to the student div
					student.append(list);
				}
				// append it all to the students panel
				$("#students").append(student);
			})
		})			
	})
	}

// calls
$(document).on('ready', function(){
	getAssignments();
	getStudents();
})
