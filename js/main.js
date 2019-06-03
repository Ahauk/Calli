(function($) {
  var $window = $(window),
    $body = $('body'),
    $header = $('#header'),
    $banner = $('#banner'),
    $logo = $('#navLogo');

  // Breakpoints.
  breakpoints({
    wide: ['1281px', '1680px'],
    normal: ['981px', '1280px'],
    narrow: ['841px', '980px'],
    narrower: ['737px', '840px'],
    mobile: [null, '736px'],
  });

  // Play initial animations on page load.
  $window.on('load', function() {
    window.setTimeout(function() {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Scrolly.
  $('.scrolly').scrolly({
    speed: 1000,
    offset: function() {
      return $header.height() + 10;
    },
  });

  // show element.
  $(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 600) {
      $('.plant-logo').fadeIn();
      $('.about').fadeIn();
      $('.right-border-menu').fadeIn();
      $('.contain-media').fadeIn();
    } else {
      $('.plant-logo').fadeOut();
      $('.about').fadeOut();
      $('.right-border-menu').fadeOut();
      $('.contain-media').fadeOut();
    }

    if (y > 800 && y < 1000) {
      $('.our-services').fadeIn();
    } else {
      $('our-services').fadeOut();
    }
  });

  // Button.
  $(
    '<div id="navButton">' +
      '<a href="#navPanel" class="toggle"></a>' +
      '</div>',
  ).appendTo($body);

  // Panel.
  $('<div id="navPanel">' + '<nav>' + $('#nav').navList() + '</nav>' + '</div>')
    .appendTo($body)
    .panel({
      delay: 1000,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: 'left',
      target: $body,
      visibleClass: 'navPanel-visible',
    });

  // Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
  if (browser.os == 'wp' && browser.osVersion < 10)
    $('#navButton, #navPanel, #page-wrapper').css('transition', 'none');

  // Header.
  if (!browser.mobile && $header.hasClass('alt') && $banner.length > 0) {
    $window.on('load', function() {
      $banner.scrollex({
        bottom: $header.outerHeight(),
        terminate: function() {
          $header.removeClass('alt');
        },
        enter: function() {
          $header.addClass('alt reveal');
          $logo.removeClass('fix');
        },
        leave: function() {
          $header.removeClass('alt');
          $logo.addClass('fix');
        },
      });
    });
  }

  $('nav a').click(function(event) {
    var id = $(this).attr('href');
    var offset = 70;
    var target = $(id).offset().top - offset;
    $('html, body').animate(
      {
        scrollTop: target,
      },
      1000,
    );
    event.preventDefault();
  });
})(jQuery);
