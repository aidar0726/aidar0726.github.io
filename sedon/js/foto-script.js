$(document).ready(function() {
  $('.foto__img-wrap').magnificPopup({
    type: 'image',
    mainClass: 'mfp-zoom-in',
    closeOnContentClick: true,
    tLoading: '',
    image: {
      verticalFit: true
    },

    gallery: {
      enabled: true,
    },

    removalDelay: 300,

    callbacks: {
        beforeChange: function() {
          this.items[0].src = this.items[0].src + '?=' + Math.random(); 
        },
        open: function() {
          $.magnificPopup.instance.next = function() {
            var self = this;
            self.wrap.removeClass('mfp-image-loaded');
            setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
          }
          $.magnificPopup.instance.prev = function() {
            var self = this;
            self.wrap.removeClass('mfp-image-loaded');
            setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
          }
        },
        imageLoadComplete: function() { 
          var self = this;
          setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
        }
    }
    
  });

  /*--begin скрипт для открытия и закрытия меню*/

  var menuBtn = document.querySelector(".header__menu-open"),
      mainMenu = document.querySelector(".header__menu"),
      activePage = document.querySelectorAll(".header__menu-link");


  menuBtn.onclick = function() {
      this.classList.toggle("header__btn-rotate");
      mainMenu.classList.toggle("header__menu--close");
   }

   /*--end скрипт для открытия и закрытия меню*/

  /*--begin скрипт показа текущей страницы*/
    var url = document.location.href;
     for(var i=0;i < activePage.length; i++){
        if (url == activePage[i].href){
            activePage[i].classList.add("header__menu-link--active");
        }
    }

  /*--end скрипт показа текущей страницы*/

});