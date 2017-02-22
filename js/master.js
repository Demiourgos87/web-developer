$(window).load(function(){
  var menuItems = [$('a[href="#home"]'), $('a[href="#services"]'), $('a[href="#portfolio"]')];

  $.each(menuItems, function(){
    $(this).click(function(e){
      e.preventDefault();
      $(this).blur();
      var scrollTo = this.getAttribute('href');
      if (scrollTo == '#home') {
        $('html, body, document, window').animate({scrollTop: 0}, 800);
      } else {
        var heading = $(scrollTo);
        $('html, body, document, window').animate({scrollTop: heading.offset().top}, 500);
      }
    });
  });

  $(document).scroll(function(){
    if ($(this).scrollTop() > 350) $('.backToTop').fadeIn(200);
    else $('.backToTop').fadeOut(200);
  });

  $('.backToTop').click(function(){
    $('html, body, window, document').animate({scrollTop: 0}, 1000);
  });
});
