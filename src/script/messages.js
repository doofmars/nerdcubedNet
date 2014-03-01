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
	if (variables.videos == 1) {
		addMessage("You have made your first video");
	}
	if (variables.videos > 9 ){
		if (variables.videos < 100  && variables.videos % 10 == 0) {
			addMessage("You have made your " + variables.videos + "th video");			
		} else if (variables.videos >= 100  && variables.videos % 100 == 0) {
			addMessage("You have made your " + variables.videos + "th video");						
		}
	}
}

var healthLowSend = false;

function messageHealthLow() {
	if (healthLowSend == false && variables.health < 10) {
		healthLowSend = true;
		addMessage("Your health is low");
	} else if (healthLowSend == true && variables.health >= 10) {
		healthLowSend = false;
	}
}
