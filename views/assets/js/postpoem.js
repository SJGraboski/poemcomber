// function grabs the information from the fields in the postpoem page
function poemConvert(excerpt) {
	// replace all instances of double-line breaks with <br />\n
	excerpt = excerpt.replace(/\n\n/g, "</p><br /><p>");
	// replace all instances of line breaks with </p><p>
	excerpt = excerpt.replace(/\n/g, "</p><p>");
	// add p tags to beginning and end of excerpts
	excerpt = "<p>" + excerpt + "</p>";
	return excerpt;
	// add data-line to each p-tag
}

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
	$.post(currentURL + "/api/postpoem", data, function(result){
		console.log("ok");
	});
	return false;
}



//document calls
$(document).on("click", '#submit', function(){
	grabpoem();
	return false;
})