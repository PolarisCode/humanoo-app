(function($){
  var menuItems = $('.menuItem'),
      mainContent = $('#mainContent'),

      loadPage = function(pageUrl){
          mainContent.empty();
          mainContent.load("content/" + pageUrl);
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
