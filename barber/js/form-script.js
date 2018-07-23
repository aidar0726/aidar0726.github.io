/* скрипт для закрытия/открытия меню */
var buttonMenu = document.querySelector(".header__btn"),
	mainMenu = document.querySelector(".header__menu");

buttonMenu.onclick = function(event) {
  event.preventDefault();
  if(this.classList.contains("header__btn-close")) {
    
    this.classList.remove("header__btn-close");
    this.classList.add("header__btn-show");
    mainMenu.classList.remove("header__menu-show");
    mainMenu.classList.add("header__menu-close");
  } else {
    
    this.classList.add("header__btn-close");
    this.classList.remove("header__btn-show");
    mainMenu.classList.add("header__menu-show");
    mainMenu.classList.remove("header__menu-close");

  }
}

/* скрипт для выделения текущей ссылки страницы */
var pageLink = document.querySelectorAll(".content--header a");
var url=document.location.href;
for(var i=0;i < pageLink.length; i++){
  if (url==pageLink[i].href){
    pageLink[i].classList.add("header__menu-active");
  }

}


  var link = document.querySelector(".header__login-link");
  var popup = document.querySelector(".popup-form");
  var close = document.querySelector(".popup-form__btn-close");
  var login = popup.querySelector("[name=login]");
  var password = popup.querySelector("[name=password]");
  var storage = localStorage.getItem("login");

  link.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.add("modal-content-show");
    if (storage) {
      login.value = storage;
      password.focus();
    } else {
      login.focus();
    }
  });

  close.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.remove("modal-content-show");
    popup.classList.remove("modal-error");
  });

  popup.addEventListener("submit", function(event) {
    if (!login.value || !password.value) {
      event.preventDefault();
      popup.classList.remove("modal-error");
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add("modal-error");
    } else {
      localStorage.setItem("login", login.value);
    }
  });

  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      if (popup.classList.contains("modal-content-show")) {
        popup.classList.remove("modal-content-show");
        popup.classList.remove("modal-error");
      }
    }
  });

$(document).ready(function(){

    $("#mainForm").validate({

       rules:{

            surname: {
                required: true,
            },

            name: {
                required: true,
            },
            
            patronymic: {
                required: true,
            },
            
            telefon: {
                required: true,
            },

            email: {
              required: true,
              email: true
            }
       },

       messages:{

            surname:{
                required: "Это поле обязательно для заполнения!",
            },

            name:{
                required: "Это поле обязательно для заполнения!",
            },
            
            patronymic: {
                required: "Это поле обязательно для заполнения!",
            },
            
            telefon: {
                required: "Это поле обязательно для заполнения!",
            },

            email: {
              required: "Это поле обязательно для заполнения!",
              email: "Пожалуйста, введите корректный email адрес!"
            }
      },

      submitHandler: function() {
        $(".popup-luck__wrap").addClass("popup-luck__open");
        $(".popup-luck__wrap").removeClass("popup-luck__close");
      },

    });

    
    $(".popup-luck__btn-close").click(function(){
      $(".popup-luck__wrap").addClass("popup-luck__close");
    });

});
