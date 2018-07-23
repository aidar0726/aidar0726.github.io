$(document).ready(function(){
													
	var buttonMenu = document.querySelector(".header__btn"),
		mainMenu = document.querySelector(".header__menu"),
		menuClose = document.querySelector(".header__menu-close"),
		namePage = document.querySelector(".header__name-page"),
		link = document.querySelector(".header__login-link"),
	  popup = document.querySelector(".popup-form"),
	  close = document.querySelector(".popup-form__btn-close"),
	  login = popup.querySelector("[name=login]"),
	  password = popup.querySelector("[name=password]"),
	  storage = localStorage.getItem("login");
	  pageLink = document.querySelectorAll(".content--header a");


		$('.reviews__slider').bxSlider({
			mode: 'horizontal',
			controls: true,
			adaptiveHeight: false,
		});

														

	var url=document.location.href;
		for(var i=0;i < pageLink.length; i++){
		if (url==pageLink[i].href){
			pageLink[i].classList.add("header__menu-active");
		}

	}
														/* script для активной страницы */

	  													/* script menu(open/close) */
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
	    
															/*-----popup script-----*/
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

	/* script для выделения текущей  страницы */

if ($(window).width() < 680) {
      $('.slider-edge').bxSlider({
			controls: false,
		 	adaptiveHeight: false,
		 	mode: 'horizontal',
		 	preventDefaultSwipeY: false
		});
  } 

});
