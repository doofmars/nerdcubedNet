/*
 * Version 0.14.2.27
 * 
 * */

//initialize the Variables and start the Heartbeat
function init() { 
	if (DEBUG) { debugMode();}

	var saved = read_cookie("chocolateChipCookie");
	if (saved != null) {
		variables = saved;
		addMessage('Game has been sucessfully loaded! Click <a id="restartGame">here</a> to restart the game');
		$('#restartGame').click(function(){ delete_cookie("chocolateChipCookie"); window.location.reload();	});
		updateAll();
	}
	 
	nIntervId = setInterval(heartbeat, 1000);
	unlockButtons();
	unlockEat(0);
	unlockEat(1);
	unlockEat(2);
	initWindows();
	$('#selVideo').val("0");
	
}

//main function that runs the game.
function heartbeat() {
	if (variables.action == "sleep") {
		addHealth(10);
	} else {
		addHealth(-0.1);
	}
	if (GAME_OVER) {
		stopHeartbeat();
	}
	
	messageHealthLow();
	newSubscriber();
	newViews();
	
	update();
}

//stops the heartbeat and displays the game over message
function stopHeartbeat() {
	GAME_OVER = true;
	addMessage("Game over! Score: &e0", "error");
	delete_cookie("chocolateChipCookie");
	clearInterval(nIntervId);
}

//add new subscribers. Maximal subscribers/videos: subscribers = (viedeos^4)/14666 
function newSubscriber() {
	var rand = Math.random();
	var limiter = ((Math.pow(variables.videos, 4)/14666) - variables.subscriber);
	newSubs = Math.floor(limiter * rand);
	addSubscribers(newSubs); 
}

//addViews, handle cold videos and save game
function newViews() {
	if (variables.cooldown <= 0) {
		
		variables.cooldown = COOLDOWNTIME_VIDEO;
		bake_cookie("chocolateChipCookie", variables, 14); //save game in cookie every COOLDOWNTIME_VIDEO seconds
		
		if (variables.videos - variables.coldVideos > 10) {
			variables.coldVideos++;
			if (DEBUG) {console.log("coldVideos=" + variables.coldVideos);}
		}
	}
	variables.cooldown--;
	addViews(variables.videos - variables.coldVideos);
}

//updates views and subscribers
function update() {
	$('#row_views_val').html(variables.views);
	if (variables.subscriber + variables.extraSubs < 0) {
		$('#row_sub_val').html(0);
	} else {
		$('#row_sub_val').html(variables.subscriber + variables.extraSubs);
	}
}

//updates everything (views, subscribers, health and videos)
function updateAll() {
	update();
	$('#row_health_val').html(variables.health);		
	$('#row_videos_val').html(variables.videos);
}

//save game in cookie
function bake_cookie(name, value, exdays) {
//	var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	
	var cookie = [name, '=', JSON.stringify(value), '; expires=.', d.toGMTString(), '; path=/;'].join('');
	document.cookie = cookie;
	
	$('#saveNotify').css('opacity', 1).animate({opacity: 0}, 1000, 'linear');
	if (DEBUG) {console.log("Saved: " + JSON.stringify(value));}
}

//load game from cookie
function read_cookie(name) {
	var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
	result && (result = JSON.parse(result[1]));
	if (DEBUG && result != null) {console.log("Loaded: " + JSON.stringify(result));}
	return result;
}

//delete cookie
function delete_cookie(name) {
//	document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; ', window.location.host.toString()].join('');
	document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/'].join('');
	if (DEBUG) {console.log("Cookie Deleted: " + name);}
}

function validateSave(save){
	if (save == null) {
		return false;
	}
	if (typeof(save.views) == 'number' &&
		typeof(save.videos) == 'number' &&
		typeof(save.coldVideos) == 'number' &&
		typeof(save.cooldown) == 'number' &&
		typeof(save.subscriber) == 'number' &&
		typeof(save.extraSubs) == 'number' &&
		typeof(save.health) == 'number' &&
		typeof(save.action) == 'string') {
		return true; 	
	} else {
		return false;
	}			
}

/*
 * Debug tools:
 * */

//send Message and create an array of Debug Buttons
function debugMode() { 
	addMessage("Debug is On"); 
	
	var debug = $('<div>').attr('id', 'debug').appendTo("#options");
	$('<input type="button" onclick="stopHeartbeat()">')
		.attr("Value", "Stop").appendTo(debug);
	$('<input type="button" onclick="unlockButtons()">')
		.attr("Value", "Unlock").appendTo(debug);
	$('<input type="button" onclick="addHealth(-10)">')
		.attr("Value", "Punch").appendTo(debug);
	$('<input type="button" onclick="addHealth(variables.health * 2)">')
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
//	addMessage("sadfnasdfiojasdifasdjpfk opasdkfpodskafpoaksdfp");
}

/*
 * Setters
 */

function addVideo(value) {
	if (!GAME_OVER) {
		if (variables.videos + value >= 0) {
			variables.videos = variables.videos + value;
		}		
	}
	$('#row_videos_val').html(variables.videos);
}

function addHealth(value) {
	if (!GAME_OVER) {
		variables.health = Math.round10(variables.health + value, -1);
		if (variables.health + value >= 100 && variables.action == "sleep") {
			variables.health = 100.0;
			sleep();
		}
		if (variables.health < 0.1) {
			$('#row_health_val').html("dead");	
			GAME_OVER = true;
		} else {
			$('#row_health_val').html(variables.health);					
		}
	}
}

function addSubscribers(value) {
	if (!GAME_OVER) {
		if (variables.subscriber + value >= 0) {
			variables.subscriber += value;
		}		
	}
}

function addExtraSubs(value) {
	if (!GAME_OVER) {
		variables.extraSubs +=  value;
		if (DEBUG) {console.log("extraSubs=" + variables.extraSubs);}
	}
}

function addViews(value) {
	if (!GAME_OVER) {
		if (variables.views + value >= 0) {
			variables.views = variables.views + value;
		}		
	}
}
