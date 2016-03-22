(function($){
  var menuItems = $('.menuItem'),
      mainContent = $('#mainContent'),

      loadPage = function(pageUrl){
          var effect = 'slide',
              duration = 500;

          mainContent.toggle(effect, { direction: 'left' }, duration);
          mainContent.load("content/" + pageUrl);
          mainContent.toggle(effect, { direction: 'right' }, duration);
      },

      menuClickHandler = function(){
        menuItems.on('click', function(){
          activeMenu = $(this);
          menuItems.removeClass('active');
          activeMenu.addClass('active');

          loadPage(activeMenu.attr('data-page'));
        })
      },

      loadInitialContent = function(){
          var activePage = menuItems.filter('.active').attr('data-page');

          if (activePage) {
            loadPage(activePage);
          }
      },

      init = function(){
        menuClickHandler();

        loadInitialContent();
      }

      init();

})(jQuery);
