$(function() {

	var started = false;
	var playerOne = '';
	var playerTwo = '';
	var winner = false;
	var moveA = 0;
	var moveB = 0;
	var triviaLocations = {100: false, 400: false, 600: false, 900: false};

	$('#rules').click(function(){
		alert("1. Hit 'A' (player one) or 'L' (player two) as fast as you can to move character. 2. Race to the end. 3. Answer trivia for extra jumps.")
	});

	$('#startGame').click(function(){
		started = true;
		playerOne = prompt("What is player one's name?");
		playerTwo = prompt("What is player two's name?");
		$('#charA').css('background-image', 'url(http://img-cache.cdn.gaiaonline.com/45ecc7b5733b475d19611875d42b99a2/http://i23.photobucket.com/albums/b396/MASTERLINKX/SuperPaperMario.gif)');
		$('#charB').css('background-image', 'url(http://orig10.deviantart.net/7dda/f/2010/331/9/f/dancing_luigi_sprite_by_zaycko-d33r25b.gif');
		$('.glyphicon').css('color', '#ffd700');
		$('#rowA').css('border-color', '#737373');
		$('#rowB').css('border-color', '#737373');
		
	});

	$(document).keyup(function(e) {
		if(winner === true) {
			alert("Start a new game!");
		} else if(started === true) {
			captureKeys(e);
		}
	});

	function captureKeys(move){
		if(move.keyCode === 65){
 			moveChar("charA", 10);
  		} else if (move.keyCode === 76) {
  			moveChar("charB", 10);
  		}
	}

	function moveChar(char, moveValue){
		if(char === "charA"){
			// Grab move value and move character
	  		moveA += moveValue;
	  		$('#charA').css('left', moveA);
	  		// Check if in trivia position and not already taken, if so, ask trivia
	  		if((triviaPosition("charA", moveA) === true) && (triviaLocations[moveA] === false)){
				$('.glyphicon').css('color', '#ffa500');
				triviaLocations[moveA] = true;
				askTriviaQuestion("charA", playerOne, moveA);
	  		}
	  		// Check for winner
	  		getWinner("charA", playerOne);
	  		//moveA > 750 ? getWinner("charA", playerOne) : null;
  		} else if(char === "charB") {
  			// Grab move value and move character
  		  	moveB += moveValue;
  			$('#charB').css('left', moveB);
  			// Check if in trivia position and not already taken, if so, ask trivia
  			if((triviaPosition("charB", moveB) === true) && (triviaLocations[moveB] === false)){
				$('.glyphicon').css('color', '#ffa500');
				triviaLocations[moveB] = true;
				askTriviaQuestion("charB", playerTwo, moveB);
	  		}
	  		// Check for winner
	  		moveB > 750 ? getWinner("charB", playerTwo) : null;
  		}
	}

	function findCharPosition(char){
		return $('#' + char).css('left');
	}

	function triviaPosition(char, move){
		switch(move){
		  case 100: return true;
		  case 400: return true;
		  case 600: return true;
		  case 900: return true;
		  default: //console.log("Not on spot");
		    break;
		}
	}

	function askTriviaQuestion(char, playerName, move){
		$.get('http://jservice.io/api/random', function(data){
			var question = data[0].question;
			var answer = data[0].answer;
			var category = data[0].category.title;
			var triviaValue = data[0].value;
			console.log(answer);
			
			// Ask question, receive response and determine outcome
			var response = prompt(playerName + ": " + question + " (For " + triviaValue/2 + " jump points; Hint: the category is " + category + ").");
			console.log(response);
			if(response === null) {
				triviaLocations[move] = false;
				alert("With no answer, you move 50 spots back!");
				moveChar(char, -50);
				$('.glyphicon').css('color', '#ffd700');
			} else if(response.toLowerCase() === answer.toLowerCase()){
				alert("Yes! You get to move " + triviaValue/2 + " spots ahead!");
				moveChar(char, triviaValue/2);
				$('.glyphicon').css('color', '#ffd700');
			} else {
				triviaLocations[move] = false;
				$('.glyphicon').css('color', '#ffd700');
				if(parseInt(findCharPosition(char)) > 750){
					alert("With a wrong answer, you move 250 spots back!");
					moveChar(char, -250);
				}
				return false;
			}
		});
	}

	function getWinner(char, playerName){
		if(parseInt(findCharPosition(char)) > 1000){
			alert("Congratulations " + playerName + ", you won!");
			winner = true;
		}
	}

});