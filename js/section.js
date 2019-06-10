(function($) {
  var $window = $(window),
    $body = $('body'),
    $header = $('#header'),
    $banner = $('#banner'),
    $unoDesign = $('#uno-design'),
    $unoAnimate = $('#uno-animate'),
    $home = $('#home');

  // Breakpoints.
  breakpoints({
    wide: ['1281px', '1680px'],
    normal: ['981px', '1280px'],
    narrow: ['841px', '980px'],
    narrower: ['737px', '840px'],
    mobile: [null, '736px'],
  });

  // Button.
  $(
    '<div id="navButton">' +
      '<a href="#navPanel" class="toggle"></a>' +
      '</div>',
  ).appendTo($body);

  $unoDesign.on('click', function() {
    event.preventDefault();
    window.location.replace('detail-design.html');
  });

  $unoAnimate.on('click', function() {
    event.preventDefault();
    window.location.replace('detail-animate.html');
  });

  $home.on('click', function() {
    event.preventDefault();
    window.location.replace('home.html');
  });

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
        },
        leave: function() {
          $header.removeClass('alt');
        },
      });
    });
  }
})(jQuery);
