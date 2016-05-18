function getPoem(modal){
  // get url path (which we use in the api call)
  var currentURL = window.location.pathname;

  // make the call
  $.get('/api' + currentURL, function(result){

    // place relevant data in the poem section
    var contentDiv = $('<div>').addClass("thePoem");
    contentDiv.append('<h4>'+ result.title + '<h4>');
    contentDiv.append('<h5>' + result.author + '<h5>');
    contentDiv.append(result.poem);

    // if not modal version, place it in the regular spot
    if (!modal) {
      $('#poem').html(contentDiv);

      // format timestamp
      result.createdAt = moment(result.createdAt).format("MMMM DD, YYYY");

      // place relevant data in the assignment summary section
      var assignmentDiv = $('<div>');
      assignmentDiv.append('<p>' + result.summary + '</p>');
      assignmentDiv.append('<p>' + result.createdAt + '</p>');


      $('#assignmentSection').html(assignmentDiv);

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

      // give all commented lines of poetry a highlight class if it has a comment
      for (var i =0; i < commented.length; i++) {
        var highlight = $('[data-line="' + commented[i] +'"]');
        highlight.addClass('highlighted');
      }
    }
    // otherwise put it in the modal, without comments and
    // without adding anything into the assignment part of the page
    else {
      $('#modalPoem').html(contentDiv);
    }
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
    console.log(results);
    // make a comments div
    var commentsDiv = $('<div>').addClass("CommentsSection")
    // get to comments array in the json
    var comments = results.comments;
    // go through each comment obj in comment array
    for (var i =0; i < comments.length; i++){
      // make a div for one comment
      var aComment = $('<div>').addClass('comments');
      // save relevant comment info
      var c_text = $('<p>').addClass('commentText')
                   .text("\"" + comments[i].text + "\"");
      var c_user = $('<p>').addClass('commentAuthor')
                   .html("Comment by <span>" + comments[i].user + "</span>");
      var c_line = $('<p>').addClass('commentLines');

      // check whether the comment is for more than 1 line
      if(comments[i].startLine == comments[i].endLine) {
        // if it's only for one line, state which line
        c_line.text("Line " + comments[i].startLine);
      }
      else {
        // if it's for more than one line, state which lines
        c_line.text("Lines " + comments[i].startLine + "-" + comments[i].endLine);
      }

      // format timestamp for comment date
      var c_date = moment(comments[i].date).format("hh:mma - MMMM DD, YYYY");
      // father the div
      aComment.append(c_user, c_date, c_text, c_line);
      // append it to the main comment div
      commentsDiv.append(aComment);
    }
    // with all comment divs collected, innerHTML it to the page
    $('#commentSection').html(commentsDiv);
  });
}

function modalWorks() {
  // first, we grab the poem and place it in the modal
  getPoem(true);
}

// calls
// ======

// on ready
$(document).on('ready', function(){
  getPoem(false)
});

// on click highlighted
$(document).on('click', '.highlighted', function(){
  getComments($(this));
})

// on click modal button
$(document).on('click', '#commentMode', function(){
  modalWorks();
})