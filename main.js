$(function() {

	var moveA = 0;
	var moveB = 0;
	var movepixelsA = '';

	$(document).keyup(function(e) {
  		if(e.keyCode === 65){
 			moveChar("charA");
  		} else if (e.keyCode === 76) {
  			moveChar("charB");
  		}
	});

	function moveChar(name){
		if(name === "charA"){
	  		moveA += 10;
	  		$('#charA').css('left', moveA);
  		} else if(name === "charB") {
  		  	moveB += 10;
  			$('#charB').css('left', moveB);
  		}
	}


});