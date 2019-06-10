(function($) {
  var $window = $(window),
    $body = $('#imagen');

  $window.on('load', function() {
    window.setTimeout(function() {
      $body.delay(2000).fadeOut(1500, function() {
        window.location.replace('../pages/home.html');
      });
    }, 4000);
  });
})(jQuery);
