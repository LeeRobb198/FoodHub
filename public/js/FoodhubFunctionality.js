$(document).ready(function(){
// Semantic UI Range
  $('.ui.range').range({
    min: 0,
    max: 10,
    start: 5,
  });
    // All your normal JS code goes in here
    $(".rating").rating();

    $('.sidebar')
      .sidebar('attach events', '.item');


      $('#showReviews').click(function(){
          $('#reviews').css({"display": "inline"});
      });

      $('#write').click(function(){
        window.location.href = "pages/addReview.html"
      });
});
