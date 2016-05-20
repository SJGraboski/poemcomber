function getPoem(modal, refresh){
  // get url path (which we use in the api call)
  var currentURL = window.location.pathname;

  // make the call
  $.get('/api' + currentURL , function(result){

    // place relevant data in the poem section
    var contentDiv = $('<div>').addClass("thePoem");
    contentDiv.append('<h4>'+ result.title + '<h4>');
    contentDiv.append('<h5>' + result.author + '<h5>');
    contentDiv.append(result.poem);

    // if not modal version, place it in the regular spot
    if (!modal) {
      $('#poem').html(contentDiv);

      // if not a poem refresh, ignore assignment portion, but not comments
      if (!refresh) {
        // format timestamp
        result.createdAt = moment(result.createdAt).format("MMMM DD, YYYY");

        // place relevant data in the assignment summary section
        var assignmentDiv = $('<div>');
        assignmentDiv.append('<p>' + result.summary + '</p>');
        assignmentDiv.append('<p>' + result.createdAt + '</p>');


        $('#assignmentSection').html(assignmentDiv);
      }

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
  var url = '/api' + currentURL + 'grab' + line;
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
      var c_date = moment(comments[i].commentDate).format("hh:mma - MMMM DD, YYYY");
      // father the div
      aComment.append(c_user, c_date, c_text, c_line);
      // append it to the main comment div
      commentsDiv.append(aComment);
    }
    // with all comment divs collected, innerHTML it to the page
    $('#commentSection').html(commentsDiv);
  });
}

function modalPoem() {
  // first, we grab the poem and place it in the modal
  getPoem(true, false);
}

function startSelect(ptag){
  // grab the line
  startLine = ptag.attr("data-line");

  var span = ptag.find('span');

  // add tooltip to left
  span.attr("data-toggle","tooltip");
  span.attr("data-original-title", "Starting Line");

  // display the tooltip
  span.tooltip({trigger: 'manual', placement: 'left'}).tooltip('show');

  // flick the clickedStart counter
  clickedStart++;

}

function endSelect(ptag){
  // grab the line
  endLine = ptag.attr("data-line");
  // if the user selects an endline that's less than the start line
  // kill the function.
  if (endLine < startLine ){
    return false;
  }
  // grab the span
  var span = ptag.find('span');

  // if the line's already been selected as starting line
  if (span.attr('data-original-title') == 'Starting Line') {
    // change tooltip to reflect that the user's comment is for one line
    span.attr("data-original-title", "One Line Comment")
    span.tooltip({trigger: 'manual', placement: 'left'}).tooltip('show');
  }
  // otherwise
  else {
    // add tooltip to right to show that it's the ending line
    span.attr("data-toggle","tooltip");
    span.attr("data-placement","right");
    span.attr("data-original-title", "Ending Line");
  }

  // display the tooltip
  span.tooltip({trigger: 'manual', placement: 'right'}).tooltip('show');

  // flick the clickedStart counter
  clickedEnd++;
}

function submitComment(){
  // if the user hasn't clicked a line on the comment yet, 
  // kill the function
  if (!clickedStart) {
    return false
    // TODO: warning text
  }

  // if somehow the endline precedes the startline
  // kill the function
  if (endLine < startLine && endLine != 0) {
    return false
    // TODO: warning text
  }

  // grab the comment
  var theComment = $('#modalComment').val();
  // if the user hasn't entered a comment yet
  // kill the function
  if (!theComment) {
    console.log("yeppers");
    return false;
  }
  // if there's data in there, make sure it's not empty spaces.
  // if it is, kill the function
  else {
    theComment = theComment.trim();
    if (!theComment) {
      console.log("yeppers");
      return false;
    }
  }

  // if all's good, cook the post materials
  // first, we prepare the data
  var data = {
    comment: theComment,
    startLine: startLine,
    endLine: (endLine == 0) ? startLine : endLine
    // Ternary operation (above): if endline is 0, 
    // make the endline the same as the startline.
    // otherwise, save the endline
  }

  // now grab the url's path
  var currentURL = window.location.pathname;

  // then make the url for the api 
  var url = '/api' + currentURL + "/post";

  // and now post the data,
  // setting everything back to normal on success
  $.post(url, data, function() {

    // Close the modal
    $('#commentModal').modal('toggle');

    // Bring counters back to their zero state
    revertCounters();

    // and refresh the poem on the page
    getPoem(false, true);
  });



}

function revertCounters() {
    // make clickedStart and clickedEnd false;
  clickedStart = clickedEnd = false;

  // revert endLine and startLine back to 0 
  endLine = startLine = 0;
}

function hideTooltips() {
  // select all span tags with tooltips
  var spans = $("[data-toggle='tooltip']");
  spans.tooltip({trigger: 'manual'}).tooltip('hide');

  // remove all apropos attributes
  spans.tooltip('destroy');

}

// calls
// ======

// start line counter
var clickedStart = false;
var clickedEnd = false;
var startLine = 0;
var endLine = 0;


// on ready
$(document).on('ready', function(){
  getPoem(false, false)
});

// on click highlighted
$(document).on('click', '.highlighted', function(){
  getComments($(this));
})

// on click modal button
$(document).on('click', '#commentMode', function(){
  modalPoem();
})

// on click poem line within modal
$(document).on('click', '#modalPoem .poemLine', function(e){
  if (!clickedStart) {
    startSelect($(this));
  }
  else if (!clickedEnd) {
    endSelect($(this));
  }
})

// on click comment submit button in modal
$(document).on('click', '#modalSubmit', function(e){
  submitComment();
  return false;
})

// When clicking anywhere that isn't a poem line in the modal
// revert the counter and hide all tooltips
$(document).on('click', function(e){
  var clicked = e.target.tagName;
  var theID = e.target.id;
  console.log(theID);
  if(clicked != "SPAN" && clicked != "TEXTAREA" && theID != "#modalSubmit"  ){
    revertCounters();
    hideTooltips();
  }
})