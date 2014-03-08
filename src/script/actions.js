//make new video first phase "Recording"
function makeVideo() { 
	if ($('#selVideo').length > 0) {
		variables.videoID = parseInt($('#selVideo').val());		
	} else {
		variables.videoID = 0;
	}
	if (variables.action == "idle") {
		variables.action = "video1";
		$("#btVideo").attr("Value", "Recording");
		lockButtons();
		variables.timer[0] = video_stats[variables.videoID].time1;
	} else {
		addMessage("Wrong action state in makeVideo", "error");
		variables.action = "idle";
	}
}

//make new video second phase "Editing", add health accordingly
function makeVideoPhase2() {
	if (variables.action == "video1") {
		variables.action = "video2";
		$("#btVideo").attr("Value", "Editing");
		addHealth(video_stats[variables.videoID].hp);
		variables.timer[0] = video_stats[variables.videoID].time2;
	} else {
		addMessage("Wrong action state in makeVideoPhase2", "error");
		variables.action = "idle";
	}
}

//Reset to "idle", add video, call videoEvent, add health and views accordingly
function makeVideoPhase3() {
	if (variables.action == "video2") {
		addVideo(1);
		addHealth(video_stats[variables.videoID].hp);
		messageVideo();
		
		addViews(Math.floor((variables.subscriber + variables.extraSubs) * video_stats[variables.videoID].multiplyer));
		
		if (variables.videoID == 4) { //decides if soapbox video or not
			videoEventID(6); // special event for soap box video
		} else {
			videoEvent();
		}
		
		variables.action = "idle";
		$("#btVideo").attr("Value", "Make a Video");
		unlockButtons();
	} else {
		addMessage("Wrong action state in makeVideoPhase3", "error");
		variables.action = "idle";
	}
}

//toggle sleep State
function sleep() {
	if (variables.action == "sleep") {
		addMessage("You have slept and refilled your health");
		variables.action = "idle";
		unlockButtons();
	} else {
		variables.action = "sleep";
		lockButtons();
	}
}

//eat and lock button
function eat(btn) {
	$("#btEat"+btn).attr("disabled", "disabled");
	addHealth(food_stats[btn].hp);
	addMessage(food_stats[btn].message + "[+" + food_stats[btn].hp + "HP]");
	variables.timer[btn + 1] = food_stats[btn].time;
}

function unlockEat(btn){
	$("#btEat"+btn).removeAttr("disabled");
}

function lockButtons() {
	 $("#btVideo").attr("disabled", "disabled");
	 $("#btSleep").attr("disabled", "disabled");
	 $("#selVideo").attr("disabled", "disabled");
}

function unlockButtons() {
	$("#btVideo").removeAttr("disabled");
	$("#btSleep").removeAttr("disabled");
	$("#selVideo").removeAttr("disabled");
}
