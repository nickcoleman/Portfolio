// Auto load the page
document.addEventListener('DOMContentLoaded', function() {

	$('#start').on('click', function(){
		$("#footer").html('<h3>Press "Start" For A New Game</h3>');
		clearGame();
		$('#counter').html(counter);
		turnAI();
	});

	$('.quadrant').on('click', function(e){
		colorVal = parseInt(e.currentTarget.value);
		lightQuadrant(colorVal);
		turnPlayer();
	});	

	$('#strict').on('click', function(e){
		strict = e.currentTarget.checked;
		if (strict) {
			$('#rules').html(msgStrict);
		} else {
			$('#rules').html(msgSlack);
		}
	});

}, false);

var sequence=[];
var colorVal = 0;
var playerTurn = false;
var counter = 0;
var counterPlayer = 0;
var strict = false;
var winner = 20;
var msgStrict = '<h3>Strict Rules -- Game Ends If You Make A Mistake</h3>'
var msgSlack = '<h3>Slack Rules -- If You Make A Mistake, Sequence Is Replayed</h3>'

function showSequence(sequence) {
	var i = 0;
	var counter = sequence.length;
	var interval = setInterval(function(){
		$('#counter').html(counter);
		lightQuadrant(sequence[i]);
		i++;
		if (i >= sequence.length) {
			clearInterval(interval);
		}
	}, 1000);
}

function lightQuadrant(color) {
	if (color === 1) {
		$('#quadrantBlue').css("background", "rgba(0, 0, 255, 1)");
		setTimeout(function(){ 
			$('#quadrantBlue').css("background", "rgba(0, 0, 255, .25)");
		}, 250);				
	} else if (color === 2) {
		$('#quadrantRed').css("background", "rgba(255, 0, 0, 1)");
		setTimeout(function(){ 
			$('#quadrantRed').css("background", "rgba(255, 0, 0, .25)");
		}, 250);				
	} else if (color === 3) {
		$('#quadrantYellow').css("background", "rgba(255, 255, 0, 1)");
		setTimeout(function(){ 
			$('#quadrantYellow').css("background", "rgba(255, 255, 0, .25)");
		}, 250);				
	} else if (color === 4) {
		$('#quadrantGreen').css("background", "rgba(0, 255, 0, 1)");
		setTimeout(function(){ 
			$('#quadrantGreen').css("background", "rgba(0, 255, 0, .25)");
		}, 250);				
	} else {
		console.log('Error - lightQuadrant item');
	}
}

function addToSequence() {
	var next = Math.floor(Math.random() * 4) + 1;
	sequence.push(next);
	counter++;
}

function clearGame() {
	sequence=[];
	playerTurn = false;
	counter = 0;
	counterPlayer = 0;
	// turnAI();
}

function turnPlayer() {
	if (playerTurn) {
		console.log('player turn');
		if (colorVal === sequence[counterPlayer] && counterPlayer < sequence.length)	{				
			counterPlayer++;
		} else if (colorVal != sequence[counterPlayer] && counterPlayer < sequence.length) {
			if (strict) {
				$("#footer").html('<h3>You Lost ... Strict Game Rules<br>Press "Start" For A New Game</h3>');
				clearGame();
				return;
			} else {
				$("#footer").html('<h3>Wrong ... Try Again<br>Press "Start" For A New Game</h3>');
				showSequence(sequence);
			}
		} 

		if (counterPlayer >= sequence.length) {
			// end of player turn
			counterPlayer = 0;
			playerTurn = false;
			turnAI();
		}
	}
}

function turnAI(){

	console.log('counter ' + counter);
	console.log('playerTurn ' + playerTurn);

	if (!playerTurn && counter < winner) {
		addToSequence();
		showSequence(sequence);
		playerTurn = true;
	}

	if(!playerTurn && counter >= winner) {
		$("#footer").html('<h3>You Are A Winner<br>Press "Start" For A New Game</h3>');
	}

}
