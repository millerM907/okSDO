

//отправляем запрос о состоянии переключателя, если активен - сразу запускаем распознавание
chrome.runtime.sendMessage("active_status2");

//переменная tabURL хранит url текущей вкладки
let tabURL = window.location.href;
 

chrome.runtime.onMessage.addListener(
  function(request, sender) {
    
    if (request.message == "start_content" || request.active_status == 1){
    	//console.log(request.active_status);
    	recognition();
    } else if (request.message == "end_content" || request.active_status == 0){
    	//console.log(request.active_status);
    	return;
    }

    
    /*
	*если результат проверки на соответствие распознанной фразы текущему url 
	*вернул истину, то выпоняем переход
    */  
   if(request.result){
   		redirect(request.pageName);
    };
         
});
    
function setFocus(name){
    document.getElementById(name).focus();
}

//функция распознавания голоса
function recognition() {
	console.log("Распознавание активировано!");

	var recognizer = new window.webkitSpeechRecognition();

	recognizer.onresult = function (event) {
		//console.log(event.results[0][0].transcript);
		
		recogWord = (event.results[0][0].transcript).toLowerCase();

		//отправляем ссылку и слово в background для проверки на доступность для текущей страницы
		chrome.runtime.sendMessage({operation: "chek", url: tabURL, word: recogWord});
	};

	recognizer.onend = function(){
	    recognizer.start();
	};

	recognizer.start();

};


//функция принимающая название раздела личного кабинета и осуществляющая переход 
function redirect (pageName) {

	switch(pageName) {
	  case 'календарь':
	  	window.location.href = "https://sdo.svgu.ru/calendar/";	
	  	break;
	  case 'вход':  
	    window.location.href = "https://sdo.svgu.ru/login/index.php";
	    break;
	  case 'личный кабинет':
	  case 'кабинет': 
	  case 'мой кабинет':  
	    window.location.href = "https://sdo.svgu.ru/my/";	
	    break;

	  case 'общий форум':
	  	window.location.href = "https://sdo.svgu.ru/mod/forum/view.php?id=230";
	  	break;
	  case 'объявления сайта':
	  	window.location.href = "https://sdo.svgu.ru/mod/forum/view.php?id=11658";
	  	break;
	  case 'курсы':
	  	window.location.href = "https://sdo.svgu.ru/course/index.php";		
	  	break;

	  case 'мои оценки':
	  	window.location.href = "https://sdo.svgu.ru/grade/report/overview/index.php";
	  	break;
	  case 'больше':	
	  case 'мои курсы':
	  	window.location.href = "https://sdo.svgu.ru/my/?myoverviewtab=courses"
	  	break;
	  case 'начало':
	  case 'главная': 
	  	window.location.href = "https://sdo.svgu.ru/";
	  	break;
	  case 'приемная комиссия':
	  	window.location.href = "https://sdo.svgu.ru/local/crw/index.php?cid=17&crws";
	  	break;
	  case 'настройки':
	  	window.location.href = "https://sdo.svgu.ru/user/preferences.php";
	  	break;
	  case 'назад':
	  	window.history.back();
	  	break;
	  case 'вперёд':
	  	window.history.forward();
	  	break;
	  case 'поиск':
	  	setFocus("id_topblock_name");
	  	break;
	  case 'найти':
	  	document.getElementById("id_topblock_submitbutton").submit();
	  	break;

	  case 'сайт свгу':
	  case 'официальный сайт свгу':
	  	window.location.href = "http://www.svgu.ru/";
	  	break;
	  case 'забыл логин':
	  case 'забыл пароль':
	  	window.location.href = "https://sdo.svgu.ru/login/forgot_password.php";
	  	break;

	  case 'приемная комиссия':
	  	window.location.href = "https://sdo.svgu.ru/local/crw/index.php?cid=17&crws";
	  	break;

	  case 'вступительные испытания':
	  case 'программы вступительных испытаний':
	  	window.location.href = "https://sdo.svgu.ru/local/crw/index.php?cid=19&crws";
	  	break;
	  case 'материалы для прохождения вступительных испытаний':
	  	window.location.href = "https://sdo.svgu.ru/local/crw/index.php?cid=20&crws";
	  	break;

	  case 'мэф':
	  case 'феним':
	  case 'институт цифровых технологий и экономики':
	  	window.location.href = "https://sdo.svgu.ru/local/crw/index.php?cid=2&crws";
	  	break;
	  case 'политех':
	  	window.location.href = "https://sdo.svgu.ru/local/crw/index.php?cid=3&crws";
	  	break;
	  case 'педагогический факультет':
	  	window.location.href = "https://sdo.svgu.ru/local/crw/index.php?cid=6&crws";
	  	break;
	  case 'социально-гуманитарный факультет':
	  	window.location.href = "https://sdo.svgu.ru/local/crw/index.php?cid=7&crws";
	  	break;
	  case 'разное':
	  	window.location.href = "https://sdo.svgu.ru/course/index.php?categoryid=1";
	  	break;	
	  case 'рабочие программы':
	  	window.location.href = "https://sdo.svgu.ru/course/index.php?categoryid=9";
	  	break;
	  case 'сообщения':
	  case 'мои сообщения':
	  case 'новые сообщения':
	  	window.location.href = "https://sdo.svgu.ru/message/index.php";
	  	break;
	};
};
