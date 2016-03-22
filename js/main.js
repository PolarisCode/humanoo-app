(function($){
  var menuItems = $('.menuItem'),
      mainContent = $('#mainContent');
      bodyParts = null,

      loadInitialData = function(){
        $.get("data/bodyParts.json", function(data){
          bodyParts = data;
        });
      },

      loadPage = function(pageUrl){
          var effect = 'slide',
              duration = 300;

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

      bodyPartClickHandler = function(){
        mainContent.on('click', '#bodyMap area', function(){

          var selectedBodyPart = $('.selectedBodyPart');
          var clickedPart = $(this).attr('title');

          selectedBodyPart.find('.header').text(clickedPart);
          selectedBodyPart.find('.content').text(bodyParts.parts[clickedPart].desc);
          selectedBodyPart.show();

          $('.selectBodyPart').hide();
        });
      },

      loadInitialContent = function(){
          var activePage = menuItems.filter('.active').attr('data-page');

          if (activePage) {
            loadPage(activePage);
          }
      },

      init = function(){
        loadInitialData();

        menuClickHandler();

        loadInitialContent();

        bodyPartClickHandler();
      }

      init();

})(jQuery);
