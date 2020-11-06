
document.addEventListener('DOMContentLoaded', function(dcle) {
		var check = document.getElementById('chk');
		
		//запрашиваем состояние переключателя у background скрипта
		chrome.runtime.sendMessage("active_status");

		//ожидаем ответ от background скрипта
		chrome.runtime.onMessage.addListener(function(request){
			if(request == 1) {
				check.checked = true;
			}	
		});

		//ожидаем клик по переключателю
		check.addEventListener('click', function(e) {
			
			//передать сообщение start в background.js
			chrome.runtime.sendMessage("start");

		});
});




