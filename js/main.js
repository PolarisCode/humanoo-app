(function($){
  var menuItems = $('.menuItem'),
      mainContent = $('#mainContent');
      bodyParts = null,
      selectedBodyParts = [];

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

      cancelBodySelectionHandler = function(){
        mainContent.on('click', '.cancelBodySelection', function(){
          $('.selectedBodyPart').hide();
          $('.selectBodyPart').show();
        });
      },

      saveBodySelectionHandler = function(){
        mainContent.on('click','.saveBodySelection', function(){
          var selectedBodyPart = $('.selectedBodyPart'),
              bodyPart = selectedBodyPart.find('.header').text(),
              content = selectedBodyPart.find('.content').text();

          var newBodyPart = $($('.bodyPartItem')[0]).clone();

          newBodyPart.find('.header').text(bodyPart);
          newBodyPart.find('.content').text(content);

          newBodyPart.show();

          newBodyPart.appendTo($('.bodyParts'));
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

        cancelBodySelectionHandler();

        saveBodySelectionHandler();
      }

      init();

})(jQuery);
