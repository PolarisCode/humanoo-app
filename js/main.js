(function($){
  var menuItems = $('.menuItem'),

      menuClickHandler = function(){
        menuItems.on('click', function(){
          menuItems.removeClass('active');
          $(this).addClass('active');
        })
      },

      init = function(){
        menuClickHandler();
      }

      init();

})(jQuery);
