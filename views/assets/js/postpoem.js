// function grabs the information from the fields in the postpoem page
function grabpoem() {

	// first, grab the vals, save it to data
	var data = {
		title: $('#title').val().trim(),
		summary: $('#summary').val().trim(),
		excerpt: $('#excerpt').val().trim()
	}

	console.log(data.excerpt);

	var currentURL = window.location.origin;

	// make the ajax call to the api
	$.post(currentURL + "/api/postpoem", data, function(result){
		console.log(result)
	});
	return false;
}

//document calls
$(document).on("click", '#submit', function(){
	grabpoem();
	return false;
})