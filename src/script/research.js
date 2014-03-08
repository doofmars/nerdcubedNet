function researchWindow(){
	if (isWindowActive()) { return; }
	showWindow("Research", "Here you can research new video types or Food.</br>" +
			"Each type or item has different effects."
			).animate({opacity: 1}, 200, 'linear');
	
	$('.eventPanel').css('width', 400);
	
	var wrapper = $('<div>').attr('id', 'researchWrapper').insertAfter("#description");

	$('<div>').html("Research new video type:").attr('id', 'researchDescription').appendTo(wrapper);
	var videoResearchContainer = $('<div>').addClass('video').appendTo(wrapper);
	$('<div>').html(videoResearchData[variables.typesUnlocked].name + " ")
		.attr('id', 'researchText').appendTo(videoResearchContainer);
	$('<input type="button" onclick="researchVideo()">').attr('id', 'researchButton')
		.attr("Value", videoResearchData[variables.typesUnlocked].cost + " views")
		.appendTo(videoResearchContainer);
	
	if (variables.typesUnlocked == video_stats.length) {
		$('.video #researchButton').attr("disabled", "disabled");
	}
	
	$('<div>').html("Research new food to eat:").attr('id', 'researchDescription').appendTo(wrapper);
	var foodResearchContainer = $('<div>').addClass('food').appendTo(wrapper);
	$('<div>').html(foodResearchData[variables.foodUnlocked].name + " ")
		.attr('id', 'researchText').appendTo(foodResearchContainer);
	$('<input type="button" onclick="researchFood()">').attr('id', 'researchButton')
		.attr("Value", foodResearchData[variables.foodUnlocked].cost + " views")
		.appendTo(foodResearchContainer);
	
	if (variables.foodUnlocked == food_stats.length) {
		$('.food #researchButton').attr("disabled", "disabled");
	}
}

function researchVideo() {
	if (variables.views < videoResearchData[variables.typesUnlocked].cost) {
		return;
	} else {
		variables.views = variables.views - videoResearchData[variables.typesUnlocked].cost;
	}
	if (variables.typesUnlocked < video_stats.length ) {
		variables.typesUnlocked = variables.typesUnlocked + 1;		
	}
	$('.video #researchText').html(videoResearchData[variables.typesUnlocked].name);
	$('.video #researchButton').attr("Value", videoResearchData[variables.typesUnlocked].cost + " views");
	if (variables.typesUnlocked == video_stats.length) {
		$('.video #researchButton').attr("disabled", "disabled");
	}
}

function researchFood(){
	if (variables.views < foodResearchData[variables.foodUnlocked].cost) {
		return;
	} else {
		variables.views = variables.views - foodResearchData[variables.foodUnlocked].cost;
	}
	if (variables.foodUnlocked < food_stats.length ) {
		variables.foodUnlocked = variables.foodUnlocked + 1;		
	}
	$('.food #researchText').html(foodResearchData[variables.foodUnlocked].name);
	$('.food #researchButton').attr("Value", foodResearchData[variables.foodUnlocked].cost + " views");
	if (variables.foodUnlocked == food_stats.length) {
		$('.food #researchButton').attr("disabled", "disabled");
	}
}