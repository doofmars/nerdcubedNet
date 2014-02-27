function addMessage(message, type) {
	var messageBox = $("#log"); // fetch the MessageBox
	var divTag = $('<div>').html(message); //new Message Container
	
	if (typeof type === 'undefined') {
		divTag.attr('id', 'aMessage');
	} else {
		divTag.attr('id', type);
	}
	
	
	var count = $("#log").children().length;
	if (count >= MAX_LOG) {
		$("#log div:last").remove();
	}
	
	messageBox.prepend(divTag);
}

function messageVideo(){
	if (videos == 1) {
		addMessage("You have made your first video");
	}
	if (videos > 9 ){
		if (videos < 100  && videos % 10 == 0) {
			addMessage("You have made your " +videos+ "th video");			
		} else if (videos >= 100  && videos % 100 == 0) {
			addMessage("You have made your " +videos+ "th video");						
		}
	}
}

var healthLowSend = false;

function messageHealthLow(health) {
	if (healthLowSend == false && health < 10) {
		healthLowSend = true;
		addMessage("Your health is low");
	} else if (healthLowSend == true && health >= 10) {
		healthLowSend = false;
	}
}

function messageSleep(){ addMessage("You have slept and refilled your health"); }
