
let keywordMainPage = ["общий форум", "объявления сайта", "начало", "в начало", "больше", "мои курсы", "сообщения", "мои сообщения",
						"курсы", "календарь", "сайт свгу", "официальный сайт свгу", "институт цифровых технологий и экономики", "настройки",
						"мэф", "политех", "педагогический факультет", "социально-гуманитарный факультет", "филфак", "рабочие программы", "разное", "приемная комиссия", 
						"назад", "вперёд", "вход", "личный кабинет", "кабинет", "сведения об успеваемости"];

let keywordLoginPage = ["официальный сайт свгу", "сайт свгу", "начало", "в начало", "забыл логин", "забыл пароль", "главная", "назад", "вперёд"];


let keywordSelectComPage = ["начало", "в начало", "кабинет", "личный кабинет", "мой кабинет", "больше", "курсы", "мои курсы", "назад", "вперёд", "календарь", 
						"общий форум", "объявления сайта", "официальный сайт свгу", "сайт свгу", "программы вступительных испытаний", 
						"вступительные испытания", "материалы для прохождения вступительных испытаний"];

let keywordFacultyPage = ["начало", "в начало", "кабинет", "личный кабинет", "мой кабинет", "больше", "курсы", "мои курсы", "назад", "вперёд", "календарь", 
						"общий форум", "объявления сайта", "официальный сайт свгу", "сайт свгу", "сообщения", "мои сообщения", "настройки"];


let keywordPrivateOfficePage = ["начало", "в начало", "кабинет", "личный кабинет", "мой кабинет", "больше", "курсы", "мои курсы", "назад", "вперёд", "календарь", "настройки", 
						"общий форум", "объявления сайта", "официальный сайт свгу", "сайт свгу", "новые сообщения", "перейти к истории обучения", "история обучения"];

let keywordCoursePage = ["начало", "в начало", "общий форум", "объявления сайта", "сайт свгу", "официальный сайт свгу", "настройки", "институт цифровых технологий и экономики", 
						"мэф", "политех", "педагогический факультет", "социально-гуманитарный факультет", "филологический факультет", "рабочие программы", "разное", "приемная комиссия", 
						"назад", "вперёд"];

let keywordForgotPass = ["в начало", "начало", "назад", "вперёд", "официальный сайт свгу", "сайт свгу", "вход"];

const myMap = new Map();

//главная
myMap.set("https://sdo.svgu.ru/", keywordMainPage);
myMap.set("https://sdo.svgu.ru/index.php", keywordMainPage);

//вход
myMap.set("https://sdo.svgu.ru/login/index.php", keywordLoginPage);

//физмат и мэф
myMap.set("https://sdo.svgu.ru/local/crw/index.php?cid=2&crws", keywordFacultyPage);

//соц-гум
myMap.set("https://sdo.svgu.ru/local/crw/index.php?cid=7&crws", keywordFacultyPage);

//политех
myMap.set("https://sdo.svgu.ru/local/crw/index.php?cid=3&crws", keywordFacultyPage);

//педфак
myMap.set("https://sdo.svgu.ru/local/crw/index.php?cid=6&crws", keywordFacultyPage);

//филфак
myMap.set("https://sdo.svgu.ru/local/crw/index.php?cid=4&crws", keywordFacultyPage);

//рабочие программы
myMap.set("https://sdo.svgu.ru/course/index.php?categoryid=9", keywordFacultyPage);

//разное
myMap.set("https://sdo.svgu.ru/local/crw/index.php?cid=1&crws", keywordFacultyPage);

//приемная комиссия
myMap.set("https://sdo.svgu.ru/local/crw/index.php?cid=17&crws", keywordSelectComPage);

//курсы
myMap.set("https://sdo.svgu.ru/course/index.php", keywordCoursePage);

//личный кабинет
myMap.set("https://sdo.svgu.ru/my/", keywordPrivateOfficePage);
myMap.set("https://sdo.svgu.ru/my/?myoverviewtab=courses", keywordPrivateOfficePage);

//календарь
myMap.set("https://sdo.svgu.ru/calendar/view.php?view=upcoming", keywordFacultyPage);
myMap.set("https://sdo.svgu.ru/calendar/view.php", keywordFacultyPage);

//общий форум
myMap.set("https://sdo.svgu.ru/mod/forum/view.php?id=230", keywordFacultyPage);

//объявления сайта
myMap.set("https://sdo.svgu.ru/mod/forum/view.php?id=11658", keywordFacultyPage);

//мои сообщения
myMap.set("https://sdo.svgu.ru/message/index.php", keywordFacultyPage);

//настройки
myMap.set("https://sdo.svgu.ru/user/preferences.php", keywordFacultyPage);

//востановление пароля
myMap.set("https://sdo.svgu.ru/login/forgot_password.php", keywordForgotPass);


//переменная active хранит состояние переключателя: 0 -выкл, 1 - вкл.
let active = 0;

chrome.runtime.onMessage.addListener(function(request){
	
	if(request == 'start') {

		if(active == 0) {
			active = 1;
			
			//start content script
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			  chrome.tabs.sendMessage(tabs[0].id, {message: "start_content"});
			});

			 
		} else if (active == 1) {
			active = 0;
			
			//end content script
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			  chrome.tabs.sendMessage(tabs[0].id, {message: "end_content"});
			});
		}
	};

	if(request == 'active_status') {
		chrome.runtime.sendMessage(active);
	};

	if(request == 'active_status2'){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id,  {active_status: active});
		});
	};	
});



chrome.runtime.onMessage.addListener( function(request) {
    
	let chekResult;

    if (request.operation == "chek") {
    	chekResult = chekWord(request.url, request.word);
    	 
    };

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id,  {result: chekResult, pageName: request.word});
	});
  });




//функция проверяет, есть ли на странице (url) распознанная фраза, если есть возвращаем true, иначе false
function chekWord(url, word){

	let indicator = false;

	let myArray = myMap.get(url);

	if (myArray != undefined) {

		for (let item of myArray) {
		  if(item == word){
		  	indicator = true;
		  	break;
		  }
		}	
	} 
	return indicator;
}




















		





