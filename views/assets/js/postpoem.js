// grab the poem, put into db as an assignment
function grabpoem() {

	// first, grab the vals, save it to data
	var data = {
		title: $('#title').val().trim(),
		author: $('#author').val().trim(),
		summary: $('#summary').val().trim(),
		excerpt: $('#excerpt').val().trim()
	}

	// remove script tags from the excerpt with regex
	data.excerpt = data.excerpt.replace(/<[^>]*>/igm, "");

	// validation: if a field is left blank, kill the function
	if (data.title == "" || data.author == "" || data.summary == "" || data.excerpt == ""){
		alert("You must complete all fields before sending the poem");
		return false;
	}

	// grab the current url
	var currentURL = window.location.origin;

	// make the ajax call to the api
	$.post(currentURL + "/api/postpoem", data, function(){
		// send us back to the overview on success
		
	});
	return false;
}



// document calls
$(document).on("click", '#submit', function(){
	grabpoem();
	return false;
})