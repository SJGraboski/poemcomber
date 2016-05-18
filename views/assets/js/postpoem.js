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

	// grab the current url
	var currentURL = window.location.origin;

	// make the ajax call to the api
	$.get(currentURL + "/api/postpoem", data, function(result){
		console.log("ok");
	});
	return false;
}



//document calls
$(document).on("click", '#submit', function(){
	grabpoem();
	return false;
})