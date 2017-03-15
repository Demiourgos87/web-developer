// Smooth scrolling to anchors
(function($){
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

  // Show back to top button upon scrolling the document down
  $(document).scroll(function(){
    if ($(this).scrollTop() > 350) $('.backToTop').fadeIn(200);
    else $('.backToTop').fadeOut(200);
  });

  // Scroll back to top upon clicking the button
  $('.backToTop').click(function(){
    $('html, body, window, document').animate({scrollTop: 0}, 1000);
  });
})(jQuery);

// Lightbox
(function($){
  var lbBackground = $('.lbBackground');
  var lbForeground = $('.lbBackground .lbForeground');
  var close = $('.lbBackground .close');
  var lbPrev = $('.lbBackground .lbPrev');
  var lbNext = $('.lbBackground .lbNext');
  var lbItems = $('#portfolio .col-md-4');
  var lastItem = lbItems.length - 1;
  var lbImage = lbForeground.find('.col-md-6.image a');
  var lbTitle = lbForeground.find('.col-md-6 .title');
  var lbIntro = lbForeground.find('.col-md-6 .intro');
  var lbDescription = lbForeground.find('.col-md-6 .description');
  var target;

  function emptyForeground() {
    lbImage.html('');
    lbTitle.text('');
    lbIntro.text('');
    lbDescription.text('');
  }

  function fillForeground(element) {
    // Get data from the current element
    var currentImg = element.find('img');
    var link = currentImg.attr('data-link');
    var imgSrc = currentImg.attr('src');
    var title = element.find('.title').text();
    var intro = element.find('.intro').text();
    var description = element.find('.description').text();

    // Fill lightbox elements with current element date
    lbImage.attr('href', link);
    lbImage.attr('target', '_blank');
    lbImage.html('<img src="' + imgSrc + '" />');
    lbTitle.text(title);
    lbIntro.text(intro);
    lbDescription.text(description);
  }

  function lbResponse(target) {
    var current = lbItems.eq(target);
    lbForeground.fadeOut(200, function(){
      emptyForeground();
      lbItems.removeClass('active');
      current.addClass('active');
      fillForeground(current);
      lbForeground.fadeIn(200);
    });
  }

  lbNext.click(function(){
    target = $('#portfolio .col-md-4.active').index();
    target == lastItem ? target = 0 : target++;
    lbResponse(target);
  });

  lbPrev.click(function(){
    target = $('#portfolio .col-md-4.active').index();
    target === 0 ? target = lastItem : target--;
    lbResponse(target);
  });

  $.each(lbItems, function(){
    var current = $(this);
    current.click(function(){
      current.addClass('active');
      // Upon clicking on the item, load lightbox background
      lbBackground.fadeIn(400, function(){
        // Fill lightbox foreground with data from the clicked element
        fillForeground(current);
        lbForeground.fadeIn(200);
      });
    });
  });

  // Icon to close the lightbox
  close.click(function(){
    lbItems.removeClass('active');
    lbForeground.fadeOut(200, function(){
      lbBackground.fadeOut(400);
    });
  });

  // Close lightbox when Esc key is pressed
  $(document).keyup(function(e){
    if (e.keyCode == 27) {
      lbItems.removeClass('active');
      lbForeground.fadeOut(200, function(){
        lbBackground.fadeOut(400);
      });
    }
  });
})(jQuery);
