(function($){
  var menuItems = $('.menuItem'),
      mainContent = $('#mainContent'),
      bodyParts = null,
      selectedBodyParts = [],

      loadInitialData = function(){
        $.get("data/bodyParts.json", function(data){
          bodyParts = data;
        });
      },

      loadPage = function(pageUrl){
          var effect = 'slide',
              duration = 400;

          selectedBodyParts = [];

          mainContent.toggle(effect, { direction: 'left' }, duration, function(){
            mainContent.load("content/" + pageUrl);
            mainContent.toggle(effect, { direction: 'right' }, duration);
          });
      },

      menuClickHandler = function(){
        menuItems.on('click', function(){
          var activeMenu = $(this);
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

      resetForm = function(){
        $('.selectedBodyPart').hide();
        $('.selectBodyPart').show();
      },

      cancelBodySelectionHandler = function(){
        mainContent.on('click', '.cancelBodySelection', function(){
          resetForm();
        });
      },

      saveBodySelectionHandler = function(){
        mainContent.on('click','.saveBodySelection', function(){
          var selectedBodyPart = $('.selectedBodyPart'),
              bodyPart = selectedBodyPart.find('.header').text(),
              content = selectedBodyPart.find('.content').text();

          if (selectedBodyParts.indexOf(bodyPart)===-1) {
            var newBodyPart = $($('.bodyPartItem')[0]).clone();

            newBodyPart.find('.header').text(bodyPart);
            newBodyPart.find('.content').text(content);

            newBodyPart.show();

            newBodyPart.appendTo($('.bodyParts'));

            selectedBodyParts.push(bodyPart);

          } else {
            alert("Body Part already has been added.");
          }

          resetForm();
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
      };

      init();

})(jQuery);
