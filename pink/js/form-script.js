  /*Скрипт настроек календаря*/
$(function() {
	$('.form__date').datepicker({
	  showAnim: "slide"
	});

	$( ".form__date" ).change(function() {
	  $( ".form__date" ).datepicker( "option", "dateFormat", "yy-mm-dd" );
	});

 /*скрипт показ/скрытие меню */
  var menu = document.querySelector('.main-menu'),
    buttonOpen = document.querySelector('.header-main__menu-btn'),
    buttonClose = document.querySelector('.main-menu__close');

  buttonOpen.onclick = function(event) {
    event.preventDefault();

    menu.classList.add('main-menu__show');
    menu.classList.remove('main-menu__hide');
  }

  buttonClose.onclick = function(event) {
    event.preventDefault();
    menu.classList.add('main-menu__hide');
  }
  

  /*--Валидация формы отправки--*/
  $('#form').validate({
      highlight: function(element, errorClass) {
          $(element).addClass("error");
      },
      unhighlight: function(element, errorClass) {
          $(element).removeClass("error");
      },
      errorElement: "label",
      errorClass: "error",

      submitHandler: function() {
        /*$(".form__popup-luck").show();*/
        $(".form__popup-wrap").addClass("form__popup-open");
        $(".form__popup-wrap").removeClass("form__popup-close");
      }
    });

  $(".form__popup-btn").click(function(event) {
    event.preventDefault();
    /*$(".form__popup").css("display", "none");*/
    $(".form__popup-wrap").addClass("form__popup-close");
  });
    
    
    $('input').not('#photo__upload-file').each(function(index, elem) {
      $(elem).rules("add", {
        required: true,
        messages: {
          required: "Это поле необходимо заполнить!",
        }
      })
    });

    
    $('input').change(function(e) {
        $('form').validate().element($(e.target));
    });


  var quantityDay = $("#length-travel").val();
  var arr = quantityDay.split(' ')[0];
  var maxCompanion = 10;
  var departureDay,dateResult,month,year,dateReturn,dateExit,companion,arrCompanion;

  
  /*--функция для правильного добавления правильного окончания "день,дня,дней"--*/
  function declOfNum(number, titles) {  
    cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
  }

  /*--функция для блокировки кнопок в случае неправильно введенных данных--*/
  function buttonDisbled(selector,param) {
    $(selector).prop("disabled", param);
  }
  
  /*--функция всплывающей подсказки-предуреждения при неверно введнных данных --*/
  function errorMessage(string, element) {
    $(element).addClass("error-input").after('<label class="error">'+string+'</label>');
    $("#form").submit(function(){
      return false;
    });
    
    $(element).bind('focus',function(){
      $(element).removeClass("error-input").next('label').remove();
    });
  }

  /*--функция добавления добавление дней в дату возвращения путешествия--*/
  function additionDay(day) {
    if(!$('#date-exit').val()) $('#date-exit').val("2016-01-01");
    departureDay = Date.parse($('#date-exit').val())+(day*24*60*60*1000);
    dateResult = new Date(departureDay);
    month = (dateResult.getMonth() + 1) >= 10 ? (dateResult.getMonth() + 1): "0" + (dateResult.getMonth() + 1);
    dateMonth = (dateResult.getDate() >= 10) ? dateResult.getDate(): "0" + dateResult.getDate();
    year = dateResult.getFullYear();
    dateReturn = year + "-" + month + "-" + dateMonth;

    $('#date-return').val(dateReturn);
  }

  /*--обработчик для добавления дней путешествия--*/
  $('#length-travel').bind('change', function(){
    quantityDay = $("#length-travel").val(); 
    
    if(quantityDay == false) {
      
      $("#length-travel").val(0 + " дней"); 
      arr = quantityDay.split(' ')[0];
      console.log(arr);
      additionDay(0);
    } else if(quantityDay < 0) {
      
      errorMessage("Введите положительное число!", this);
      buttonDisbled(".form__count-wrap button", true);
    } else if(+quantityDay != quantityDay || quantityDay.indexOf(".") != -1) {

      errorMessage("Введите целое число!", this);
      buttonDisbled(".form__count-wrap button", true);
    } else {

      $("#length-travel").val(quantityDay + " " + declOfNum(quantityDay, ['день','дня','дней']));
      arr = quantityDay.split(' ')[0];
      buttonDisbled(".form__count-wrap button", false);
      additionDay(quantityDay);
    }
  });

  /*--обработчики для увеличения  дней путешествия--*/
  $('.form__wrap-tablet .form__button--left').bind('click', function(event){
    event.preventDefault();
    ++arr;
    additionDay(arr);
    $("#length-travel").val(arr +" "+ declOfNum(arr, ['день','дня','дней']));
  });
  
  /*--обработчики для уменьшения  дней путешествия--*/
  $('.form__wrap-tablet .form__button--right').bind('click', function(event){
    event.preventDefault();
    if(arr == 0) return false;
    --arr;
    additionDay(arr);
    $("#length-travel").val(arr +" "+ declOfNum(arr, ['день','дня','дней']));
  });
  
  /*--обработчик для установки даты возвращения--*/
  $("#date-return").bind('change', function(event) {
    if(!$('#date-return').val()) $('#date-return').val("2016-01-01");
    if(!$('#date-exit').val()) $('#date-exit').val("2016-01-01");
    
    dateReturn = Date.parse($(this).val());
    dateExit = Date.parse($('#date-exit').val());
    
    if((dateReturn - dateExit) < 0) {
      errorMessage("Дата возвращения должна быть больше даты выезда!", this);
      $("#date-exit,#length-travel,#btn-plus,#btn-minus").prop("disabled", true);
    } else {
      $("#date-exit,#length-travel,#btn-plus,#btn-minus").prop("disabled", false);
      
      arr = (dateReturn - dateExit)/1000/60/60/24;
      $("#length-travel").val(arr + " " + declOfNum(arr, ['день','дня','дней']));
    }
  
  });

  $("#date-exit").bind("change", function(event) {
    if(!$('#date-exit').val()) $('#date-exit').val("2016-01-01");
    additionDay(arr);
  });

  $("#quantity-viators").val(0 + " чел");
  companion = $("#quantity-viators").val();
  var companionArr = companion.split(' ')[0];
  console.log(companionArr);
  
  /*Обработчики  на кнопку увеличения количества попутчиков */
  $(".form__count-wrap--viators .form__button--left").bind("click", function(event) {
    event.preventDefault();
    if(companionArr >= maxCompanion) {
      errorMessage("Максимальное количество попутчиков 10 человек!", "#quantity-viators");
      buttonDisbled(this, true);
      return false;
    } else {
      ++companionArr;
      $("#quantity-viators").val(companionArr + " чел");
      insertFields(companionArr);
    }
  });

  /*Обработчики на кнопку уменьшения количества попутчиков */
  $(".form__count-wrap--viators .form__button--right").bind("click", function(event) {
    event.preventDefault();
    if(companionArr == maxCompanion) {
      buttonDisbled(".form__count-wrap--viators .form__button--left", false);
      $("#quantity-viators").removeClass("error-input").next('label').remove();
    }

    if(companionArr == 0) return false;
    --companionArr;
    $("#quantity-viators").val(companionArr + " чел");
    $(".form__viators-info:last-child").remove();
  });

  /*--функция для добавления полей имени и прозвища попутчиков--*/
  function insertFields(number) {
    $(".form__block--viators").append(comp.content.cloneNode(true));
    $(".form__viators-info:last-child .form__num").text(number);
    $(".form__viators-info:last-child input").attr({"id":"viators-name-"+number,"name":"viators-name-"+number});
    $(".form__viators-info:last-child label").attr("for", "viators-name-"+number);
    $(".form__viators-info:last-child .form__alias-wrap input").attr({"id":"alias-viators-"+number,"name":"viators-alias-"+number});
    $(".form__viators-info:last-child .form__alias-wrap label").attr("for", "alias-viators-"+number);
    $(".form__viators-info:first").addClass("form__viators-info--line");

    $('.form__name').each(function(index, elem) {
      $(elem).rules("add", {
        required: true,
        messages: {
          required: "Это поле необходимо заполнить!",
        }
      })
    });
  }

  /*--обработчик на кнопку "удалить" для очистки полей прозвища и имени попутчиков--*/
  $(".form__link-delete").live("click", function(event) {
    event.preventDefault();
    $(this).closest(".form__viators-info").find(".form__name,.form__alias").val("");
  });

  /*--begin скрипт для загрузки локальной загрузки фото в браузер--*/
  var countImg = 1;
  $("#photo__upload-file","#form").bind("change", function() {
    var files = this.files; 
    
    for (var i = 0; i < files.length; i++) {
      preview(files[i]);
    }

  });
  /*--функция для проверки истинности изображения --*/

  function preview(file) {
    
    if (file.type.match(/image.*/)) {
      var reader = new FileReader(); 
    
      reader.addEventListener("load", function(event) {
        var nameImg = file.name,
          titleImg = countImg++;
       
        nameImg = "image_"+titleImg+nameImg.substr(nameImg.length - 4);
        
        $(".form__upload").append(
          '<div class="form__img-wrap">'+
            '<span></span>'+
            '<img src ='+" "+event.target.result+" "+'alt='+" "+nameImg+" "+' class="form__img">'+
            '<figcaption>'+nameImg+'</figcaption>'+
          '</div>'
        );
      }); 
    
      reader.readAsDataURL(file);
    } else {
      alert("Неподдерживаемый формат файла!");
    }
  };

  /*функция для удаления загруженного изображения*/
  $(".form__img-wrap span").live("click",function(event) {
    $(this).closest(".form__img-wrap").remove();
  });

  /*--end скрипт для загрузки локальной загрузки фото в браузер--*/

});

