/*--begin скрипт для открытия и закрытия меню*/

var menuBtn = document.querySelector(".header__menu-open"),
    mainMenu = document.querySelector(".header__menu"),
    activePage = document.querySelectorAll(".header__menu-link"),
    modalForm = document.querySelector(".modal"),
    modalFormClose = document.querySelector(".modal__btn");


menuBtn.onclick = function() {
    this.classList.toggle("header__btn-rotate");
    mainMenu.classList.toggle("header__menu--close");
 }
/*--end скрипт для открытия и закрытия меню*/

/*--begin скрипт для закрытия модального окна в форме*/
 modalFormClose.onclick = function() {
 	modalForm.classList.remove("modal__show");
 }

 window.addEventListener("keydown", function(event) {
	if (event.keyCode === 27) {
			if (modalForm.classList.contains("modal__show")) {
				modalForm.classList.remove("modal__show");
			}
		}
	});
/*--end  скрипт для закрытия модального окна в форме*/

/*--begin скрипт показа текущей страницы*/
var url = document.location.href;
 for(var i=0;i < activePage.length; i++){
    if (url == activePage[i].href){
        activePage[i].classList.add("header__menu-link--active");
    }
}

/*--end скрипт показа текущей страницы*/

$(document).ready(function(){

	$("#mainForm").validate({

		rules:{

			name:{
		    required: true,
			},

			surname:{
		    required: true,
			},

			email:{
		    required: true,
		    email: true,
			},

			phone:{
		    required: true,
		    digits: true,
			},


		},

		messages:{

			name:{
		    required: "* - Это поле необходимо заполнить!",
			},

			surname:{
		    required: "* - Это поле необходимо заполнить!",
			},

			email:{
		    required: "* - Это поле необходимо заполнить!",
		    email: "Введите корректный email адрес!", 
			},

			phone:{
		    required: "* - Это поле необходимо заполнить!",
		    digits: "Введите корректный номер телефона!",
			},

		},

		submitHandler: function() {
	      modalForm.classList.add("modal__show");
	    }

	});

});