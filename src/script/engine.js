/*
 * Version 0.14.2.27
 * 
 * */

//initialize the Variables and start the Heartbeat
function init() { 
	views = 0;
	videos = 0;
	coldVideos = 0;
	cooldown = COOLDOWNTIME_VIDEO;
	subscriber = 0;
	extraSubs = 0;
	health = 100;
	action = "idle";
	nIntervId = setInterval(heartbeat, 1000);
	if (DEBUG) {
		debugMode();
	}
	unlockButtons();
	unlockEat(0);
	unlockEat(1);
	unlockEat(2);
	$('#selVideo').val("0");
}

function heartbeat() {
	if (action == "sleep") {
		addHealth(10);
	} else {
		addHealth(-0.1);
	}
	if (GAME_OVER) {
		stopHeartbeat();
	}
	
	newSubscriber();
	newViews();
	
	update();
}

function stopHeartbeat() {
	GAME_OVER = true;
	addMessage("Game over! Score: &e0", "error");
	clearInterval(nIntervId);
}

function newSubscriber() {
	var rand = Math.random();
	var limiter = ((Math.pow(videos, 4)/14666) - subscriber);
	newSubs = Math.floor(limiter * rand);
	addSubscribers(newSubs); 
}

function newViews() {
	if (cooldown <= 0) {
		cooldown = COOLDOWNTIME_VIDEO;
		if (videos - coldVideos > 10) {
			coldVideos++;
			if (DEBUG) {console.log("coldVideos=" + coldVideos);}
		}
	}
	cooldown--;
	addViews(videos - coldVideos);
}

function update() {
	$('#row_views_val').html(views);
	if (subscriber + extraSubs < 0) {
		$('#row_sub_val').html(0);
	} else {
		$('#row_sub_val').html(subscriber + extraSubs);
	}
	
}

/*
 * Debug tools:
 * */

//send Message and create an array of Debug Buttons
function debugMode() { 
	addMessage("Debug is On"); 
	
	var debug = $('<div>').attr('id', 'menu').appendTo("#options");
	$('<input type="button" onclick="stopHeartbeat()">')
		.attr("Value", "Stop").appendTo(debug);
	$('<input type="button" onclick="unlockButtons()">')
		.attr("Value", "Unlock").appendTo(debug);
	$('<input type="button" onclick="addHealth(-10)">')
		.attr("Value", "Punch").appendTo(debug);
	$('<input type="button" onclick="addHealth(1000)">')
		.attr("Value", "Heal").appendTo(debug);
	$('<input type="button" onclick="addVideo(1)">')
		.attr("Value", "Make a Video").appendTo(debug);
	$('<input type="button" onclick="addExtraSubs(1)">')
	.attr("Value", "Sub").appendTo(debug);
	$('<input type="button" onclick="test()">')
		.attr("Value", "Test").appendTo(debug);
}

function test(){
	showEvent(1);
}

/*
 * Getters And Setters
 */

function addVideo(value) {
	if (!GAME_OVER) {
		if (videos + value >= 0) {
			videos = videos + value;
		}		
	}
	$('#row_videos_val').html(videos);
}

function addHealth(value) {
	if (!GAME_OVER) {
		health = Math.round10(health + value, -1);
		if (health + value >= 100 && action == "sleep") {
			health = 100.0;
			sleep();
		}
		if (health < 0.1) {
			health = "dead";
			GAME_OVER = true;
		}
		$('#row_health_val').html(health);		
	}
}

function addSubscribers(value) {
	if (!GAME_OVER) {
		if (subscriber + value >= 0) {
			subscriber += value;
		}		
	}
}

function addExtraSubs(value) {
	if (!GAME_OVER) {
		extraSubs +=  value;
		if (DEBUG) {console.log("extraSubs=" + extraSubs);}
	}
}

function addViews(value) {
	if (!GAME_OVER) {
		if (views + value >= 0) {
			views = views + value;
		}		
	}
}
