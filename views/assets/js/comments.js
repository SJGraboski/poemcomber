function getPoem(){

/*
  data{
title: “title in here”,
author: “author in here”,
poem: “poem in here”,
createdAt: timestamp from db,
comments: [
comment: {
startline: x,
endline: y
}, comment: {
startline: x,
endline: y
}
]
      };
*/
  console.log(window.location.pathname);
  var currentURL = window.location.pathname;
  console.log(currentURL);



  $.get('/api' + currentURL, function(result){

    // place relevant data in the poem section
    var contentDiv = $('<div>');
    contentDiv.append('<h4>'+ result.title + '<h4>');
    contentDiv.append('<h5>' + result.author + '<h5>');
    contentDiv.append(result.poem);
    $('#poem').html(contentDiv);
    
    // format timestamp
    result.createdAt = moment(result.createdAt).format("MMMM DD, YYYY");

    // place relevant data in the assignment summary section
    var assignmentDiv = $('<div>');
    assignmentDiv.append('<p>' + result.summary + '</p>');
    assignmentDiv.append('<p>' + result.createdAt + '</p>');
    $('#assignmentContent').html(assignmentDiv);

    // container for lines that need highlights (designates comment)
    var commented = [];
    // get range for each comment in the comment section
    for (var i = 0; i < result.comments.length; i++) {
      // save the start and end lines in vars
      var start = result.comments[i].startingLine;
      var end = result.comments[i].endingLine;

      // check range of numbers between the vars 'start' and 'end'
      for (var j = start; j <= end; j++) {
        if (commented.indexOf(j) == -1) {
          commented.push(j);
        }
      }
    }

    // for debug: log the commented array
    console.log(commented);

    // give all commented lines of poetry a highlight class if it has a comment
    for (var i =0; i < commented.length; i++) {
      var highlight = $('[data-line="' + commented[i] +'"]');
      highlight.addClass('highlighted');
    }

    // var commentDiv = $('<div>');
    // for(var i = 0 ; i < result.comments.length ; i++){
    // commentDiv.append('<div>'+ result.comments[i].startline + "," + result.comments[i].endline +'<div>');
    // }
    // $('#comments').html(commentDiv);
  });
}

function getComments(ptag) {
  // grab the line from the data-line attr, as a string
  var line = ptag.attr('data-line');

  // grab the current window path for the api call ('/comments/:id')
  var currentURL = window.location.pathname;
  // make the api url
  var url = '/api' + currentURL + '/grab/' + line;
  // make a post call with a success function 
  // that populates the comments with the comment found
  $.get(url, function(results){
    // comment fill in goes here
    console.log(ok);
  });
}

// calls
// ======

// on ready
$(document).on('ready', function(){
  getPoem()
});

// on click highlighted
$(document).on('click', '.highlighted', function(){
  getComments($(this));
})