/*
 * This Module handles the entire display of the bottom footer.
 * addmessage() and validateSave() is required.
 * 
 * */


//sets the onclick function to the about links at the bottom of the page.
function initWindows() {
	$('<div>').attr('id', 'footer').appendTo("#wrapper").html(
			'An unofficial fan-project, all love to Dan! ' +
			'<a class="what">What?</a> ' +
			'<a class="who">Who?</a> ' +
			'<a class="why">Why?</a> ' +
			'<a class="save">Save?</a> ' +
			'<a class="load">Load!</a>'
			);
	
	$('.what').click(function(){ whatWindow();	});
	$('.who').click(function(){ whoWindow();	});
	$('.why').click(function(){ whyWindow();	});
	$('.save').click(function(){ saveWindow();	});
	$('.load').click(function(){ loadWindow();	});
}

//removes the set window
function removeWindow(){
	$('div#info').remove();
}

//shows window with given title and text
function showWindow(title, text){
	var messageBox = $('<div>').attr('id', 'info').addClass('eventPanel').css('opacity', '0');
	$('<div>').addClass('eventTitle').text(title).appendTo(messageBox);
	$('<div>').attr('id', 'description').html(text).appendTo(messageBox);
	$('<div>').attr('id', 'buttons').appendTo(messageBox)
		.html('<input type="button" id="windowButton" value="ok" onclick="removeWindow()">');
	$('div#wrapper').append(messageBox);
	return messageBox;
}

function whatWindow(){
	if ($('.eventPanel').length > 0) { return; }
	showWindow("What?", "<p>This is an unofficial Fan project. Sloley to parody the typical life of a YouTuber like Dan</p>" + 
			"<p>This Project is created in my free time and out of fun and passion.</p>" +
			"<p>The game requires Javascript to run, so you shold be good if you can see this.</p>" +
			"<p><b>Thank you for Playing!</b></p>"
			).animate({opacity: 1}, 200, 'linear');
}

function whoWindow(){
	if ($('.eventPanel').length > 0) { return; }
	showWindow("Who?", '<p>Idea and code created by Doofmars (<a href="https://twitter.com/doofmars">@doofmars</a>'+
			' or <a href="http://www.doofmars.de">doofmars.de</a>, mostly german!)</p>' + 
			'<p>The logo was created by <a href="https://twitter.com/WhoHidTheTom">@WhoHidTheTom</a> ' +
			'(<a href="http://www.reddit.com/r/nerdcubed/comments/1esd2v/so_this_is_what_i_did_when_i_first_found_the_font/">Reddit</a>)'
			).animate({opacity: 1}, 200, 'linear');
}

function whyWindow(){
	if ($('.eventPanel').length > 0) { return; }
	var answer = 'Because';
	var rand =  Math.floor(Math.random()*10);
	switch (rand) {
		case 1: answer = 'I don´t Know'; break;
		case 2: answer = 'Valentines Day, really!'; break;
		case 3: answer = 'I like to code things'; break;
		case 4: answer = 'To improve my skills'; break;
		case 5: answer = 'Because of <a href="http://adarkroom.doublespeakgames.com/">adarkroom</a>'; break;
		case 6: answer = 'Because of <a href="http://candies.aniwey.net/">candies</a>'; break;
		case 7: answer = 'Nerdcubed on twitter (I like your tweets)'; break;
		case 8: answer = 'Because of <a href="http://orteil.dashnet.org/cookieclicker/">cookieclicker</a>'; break;
		case 9: answer = 'Because of <a href="http://www.reddit.com/r/nerdcubed">this</a>'; break;
	}
	showWindow("Why?", "<h2>" + answer + "</h2>").animate({opacity: 1}, 200, 'linear');
}

function saveWindow(){
	if ($('.eventPanel').length > 0) { return; }
	var messagebox = showWindow("Save", "The save-function works with cookies, "+
			"so if you dont like cookies or want to restore your progress to another system copy, save and load the following text:");	
	$('<textarea id="saveArea" readonly="readonly" wrap="on" >').val(JSON.stringify(variables))
	.appendTo("#description");
	messagebox.animate({opacity: 1}, 200, 'linear');
}

function loadWindow(){
	if ($('.eventPanel').length > 0) { return; }
	var messagebox = showWindow("Load", "The load-function works with cookies, "+
			"so if you dont like cookies or want to restore your progress to another system copy, save and load the following text:");	
	$('<textarea id="loadArea" wrap="on" >')
	.appendTo("#description");
	$('#windowButton').attr('onclick', 'loadSave()').attr('value', 'Ok & Load');
	$('<input type="button" id="windowButton" value="Cancle" onclick="removeWindow()">').appendTo('#buttons');
	messagebox.animate({opacity: 1}, 200, 'linear');
}

//load the Save from the textarea
function loadSave(){
	var save = null;
	try {
		save = JSON.parse($('textarea#loadArea').val());
	} catch (e) { }
	
	if (validateSave(save)) {
		if (DEBUG && save != null) {console.log("Loaded: " + JSON.stringify(save));}
		delete_cookie("chocolateChipCookie");
		variables = save;
		updateAll();
		setButtons();
	} else {
		addMessage("Error while loading save", "error");
	}
	
	removeWindow();
}