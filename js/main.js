(function($) {
  var $window = $(window),
    $body = $('body'),
    $header = $('#header'),
    $banner = $('#banner'),
    $principal = $('#principal'),
    $calli = $('#calli-ds'),
    $logo = $('#navLogo');

  // lock scroll position, but retain settings for later
  var scrollPosition = [
    self.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft,
    self.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop,
  ];

  var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
  html.data('scroll-position', scrollPosition);
  html.data('previous-overflow', html.css('overflow'));
  html.css('overflow', 'hidden');
  window.scrollTo(scrollPosition[0], scrollPosition[1]);

  // Hide principal image
  $calli.delay(500).fadeIn(1500, function() {
    $principal.delay(2000).fadeOut();
  });

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
      // un-lock scroll position
      var html = jQuery('html');
      var scrollPosition = html.data('scroll-position');
      html.css('overflow', html.data('previous-overflow'));
      window.scrollTo(scrollPosition[0], scrollPosition[1]);
      $body.removeClass('is-preload');
    }, 4000);
  });

  // Scrolly.
  $('.scrolly').scrolly({
    speed: 1000,
    offset: function() {
      return $header.height() + 10;
    },
  });

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
          $logo.attr('src', 'images/logo1.png');
        },
        leave: function() {
          $header.removeClass('alt');
          $logo.addClass('fix');
          $logo.attr('src', 'images/logo.png');
        },
      });
    });
  }
})(jQuery);
