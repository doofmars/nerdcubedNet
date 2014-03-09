function showEvent(eventID){
	var messageBox = $('<div>').attr('id', 'event').addClass('eventPanel').css('opacity', '0');
	$('<div>').addClass('eventTitle').text(events[eventID].title).appendTo(messageBox);
	$('<div>').attr('id', 'description').html(events[eventID].text).appendTo(messageBox);
	$('<div>').attr('id', 'buttons').appendTo(messageBox)
		.html('<input type="button" value="' + events[eventID].buttonA + '" onclick="removeEvents()">' +
			  '<input type="button" value="' + events[eventID].buttonB + '" onclick="removeEvents()">');
		
	$('div#wrapper').append(messageBox);
	messageBox.animate({opacity: 1}, 200, 'linear');
}

function removeEvents(){
	$('div#event').remove();
}

function videoEvent() {
	var rand =  Math.floor(Math.random()*100);
	videoEventID(rand);
}


function videoEventID(eventID){
	switch (eventID) {
	case 1:
		addMessage("Youtube ate one of your videos");
		addVideo(-1);
		break;
	case 2:
		addMessage("Youtube ate two of your videos");
		addVideo(-2);
		break;
	case 3:
		addMessage("The editing process was exhausting -10 Health");
		addHealth(-10);
		break;
	case 4:
		addMessage("You've decided to split your video +2 Videos");
		addVideo(1);
		break;
	case 5:
		addMessage("The editing cheered you up +5  Health");
		addHealth(5);
		break;
	case 6:
		var upset = Math.floor((variables.subscriber + variables.extraSubs)/10 * Math.random());
		if (upset > 0) {
			addMessage("The video has upset "+upset+" of your subscribers");
			addExtraSubs(-upset);			
		}
		break;
	case 7:
		var newSubs = 10;
		if (Math.floor((variables.subscriber + variables.extraSubs)/5) > newSubs) {
			newSubs = Math.floor((variables.subscriber + variables.extraSubs)/5);
		}
		addMessage("Your new video has gained some attention, you have " + newSubs + " new subscribers");
		addExtraSubs(newSubs);	
		break;
	case 8:
		addMessage("The editing failed and you have lost all of your footage");
		addVideo(-1);
		break;
	case 9:
		addMessage("You created an In a nutshell video.");
		break;
//	case 10:
//		addMessage("");
//		break;
	}
}
