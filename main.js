$(function() {

	var started = false;
	var playerOne = '';
	var playerTwo = '';
	var moveA = 0;
	var moveB = 0;
	var triviaLocations = {100: false, 400: false, 600: false, 900: false, 1000: false};

	$('#startGame').on('click', function(){
		playerOne = prompt("What is player One's name?");
		playerTwo = prompt("What is player Two's name?");
		started = true;
	});


	$(document).keyup(function(e) {
		if(started === true) {
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
	  		moveA += moveValue;
	  		$('#charA').css('left', moveA);
	  		if((triviaPosition("charA", moveA) === true) && (triviaLocations[moveA] === false)){
				triviaLocations[moveA] = true;
				askTriviaQuestion("charA", playerOne, moveA);
	  		}
	  		//getWinner("charA");
  		} else if(char === "charB") {
  		  	moveB += moveValue;
  			$('#charB').css('left', moveB);
  			if((triviaPosition("charB", moveB) === true) && (triviaLocations[moveB] === false)){
				triviaLocations[moveB] = true;
				askTriviaQuestion("charB", playerTwo, moveB);
	  		}
	  		//getWinner("charB");
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
		  case 1000: return true;
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
			var location = findCharPosition(char);
			console.log(answer);
			var response = prompt(playerName + ": " + question + " (For " + triviaValue/2 + " jump points; Hint: the category is " + category + ").");
			
			if(response.toLowerCase() === answer.toLowerCase()){
				alert("Yes! You get to move " + triviaValue/2 + " spots ahead!");
				moveChar(char, triviaValue/2);
			} else {
				triviaLocations[move] = false;
				return false;
			}
		});
	}

	function getWinner(char){
		if(findCharPosition(char) >= "1100px"){
			alert("Congratulations " + char + ", you won!");
		}
	}

});