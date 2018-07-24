/*--begin скрипт для карты гугл--*/
	function pageOnLoad() {
    var centerLatLng = new google.maps.LatLng(35.190136, -111.651338);
    var mapOptions = {
        zoom: 13,
        center: centerLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        backgroundColor: '#f2f2f2',
        mapTypeControl: false
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var marker = new google.maps.Marker({
        map: map,
        position: centerLatLng,
        title: 'Мы здесь',
        icon: 'img/map-marker.svg'
    }); 
  }
    //Когда документ загружен полностью - запускаем инициализацию карты.
    google.maps.event.addDomListener(window, 'load', pageOnLoad);
/*--end скрипт для карты гугл--*/

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