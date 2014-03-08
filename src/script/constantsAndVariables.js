var GAME_OVER = false;
const MAX_LOG = 10; //number of max log entrys
const DEBUG = true; //debugmode
const BOOKER_CATCH = true;
const COOLDOWNTIME_VIDEO = 60; //time in seconds until video gets cold
const MAX_VALUE = 2314159265358;

var nIntervId;
 
var variables = {
		"views": 0,
		"videos": 0,
		"videoID": 0,
		"coldVideos": 0,
		"cooldown": COOLDOWNTIME_VIDEO,
		"subscriber": 0,
		"extraSubs": 0,
		"health": 100,
		"foodUnlocked":0,
		"typesUnlocked":0,
		"timer": [0, 0, 0, 0], //timer for videos, eat1, eat2, eat3
		"action": "idle",
};

//times, hp and messages for Food
var food_stats = [
{"name": "Eat P&P",
	"time": 120,
	"hp": 4,
	"message": "You ate some P&P and gained "},
{"name": "Eat Pizza",
	"time": 300,
	"hp": 10,
	"message": "You ate a whole Pizza "},
{"name": "Eat Premium Food&reg",
	"time": 600,
	"hp": 30,
	"message": "You ate some delicious Premium Food&reg "}
            ];

//Times, HP and modifyer for different video types
var video_stats =[
{"title": "Standard 101 Video [-10 HP]",
	"time1": 3,
	"time2": 6,
	"hp": -5,
	"multiplyer": 1},
{"title": "The Alpha Detective [-8 HP | longer edits]",
	"time1": 5,
	"time2": 9,
	"hp": -4,
	"multiplyer": 0.8},
{"title": "Challenge Video [-12 HP | shorter edits]",
	"time1": 2,
	"time2": 4,
	"hp": -6,
	"multiplyer": 1.2},
{"title": "Completes Video [-6 HP | Fewer Views]",
	"time1": 5,
	"time2": 3,
	"hp": -3,
	"multiplyer": 0.5},
{"title": "Soap Box Video [-2 HP | Fan Rage]",
	"time1": 4,
	"time2": 6,
	"hp": -1,
	"multiplyer": 1.5},
{"title": "Collaboration Video [-16 HP | More Views]",
	"time1": 5,
	"time2": 5,
	"hp": -8,
	"multiplyer": 2},
{"title": "Father and Son-Days Video [-10 HP]",
	"time1": 4,
	"time2": 5,
	"hp": -5,
	"multiplyer": 1},
{"title": "IRL Video [-14 HP]",
	"time1": 2,
	"time2": 4,
	"hp": -7,
	"multiplyer": 1.3}
				];

var events = [
{"title": "Title", 
	"text": "Text",
	"buttonA": "Button A Text",
	"buttonB": "Button B Text"},
{"title": "A strange offer", 
	"text": "A strange copany, you can't even pronounce, approces you and offers yo a deal over 10 videos you have to rate, better, than they are!",
	"buttonA": "Accept [+10 videos]",
	"buttonB": "Declie"}
	];

var videoResearchData = [
{"name": "The Illusion of a choice",
	"cost": 128,
	},
{"name": "A real choice",
	"cost": 512,
},
{"name": "Do you want some Challange?",
		"cost": 1024,
	},
{"name": "The list is not complete",
		"cost": 9999,
	},
{"name": "What will be next?",
		"cost": 20000,
	},
{"name": "We need some help for the next one",
		"cost": 54321,
	},
{"name": "Luke, I am your...",
		"cost": 101100,
	},
{"name": "Is this real live?",
		"cost": 314159,
	},
{"name": "No new types to research",
		"cost": "-",
	}
			];
var foodResearchData = [
{"name": "Something cheap",
	"cost": 50000,
	},
{"name": "Something delicious",
		"cost": 101010,
	},
{"name": "Something Expensive",
		"cost": 1000000,
	},
{"name": "No new types to research",
		"cost": "-",
	}
	];