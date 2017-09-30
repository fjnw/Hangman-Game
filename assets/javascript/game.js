var puzzles = ["Phil the Instructor","Maggie the TA", "Reuben the TA"];
var puzzle; 
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var strikes = 0;

window.onload = canvasInit;

function canvasInit() {
	var c = document.querySelector('canvas').getContext('2d');
		c.fillStyle = "black";
		c.lineWidth=2;
		c.fillRect(50, 15, 20, 135); 	// vertical box
		c.fillRect(50, 15, 160, 8); 	// horizonal box
		c.beginPath(); 					// hanging rope
		c.moveTo(160,20);
		c.lineTo(160,40);
		c.stroke();
}

function startGame(){
	document.querySelector('.splashScreen').style.display = 'none';
	
	initializeGame();
	newPuzzle();
}

function initializeGame(){
	div_used = document.querySelector('.used');
	div_puzzle = document.querySelector('.puzzle');
	div_available = document.querySelector('.available');
}

function keyboard() {
	for (var i=0; i<alphabet.length; i++) {
		var l = document.createElement('div');
		l.innerHTML = alphabet[i];
		l.className = 'btnLetter';
		l.onclick = function() { selectLetter(this); };
		div_available.appendChild(l);
	}
}

function newPuzzle() {
	canvasInit();
	div_used.innerHTML = '<p>Letters Used:</p>';
	div_available.innerHTML = '';
	div_puzzle.innerHTML = '';
	keyboard();
	strikes = 0;

	var puzzleID = Math.floor(Math.random()*puzzles.length);
	puzzle = puzzles[puzzleID].toUpperCase();  // makes puzzle letters all uppercase to match alphabet array.

	for (var i = 0; i<puzzle.length; i++) {

		var box = document.createElement('div');
		box.id = 'letter_' + i;

		if (puzzle[i] == " ") box.className = 'box';
		else box.className = "box letter";

		div_puzzle.appendChild(box);
	}
}

function selectLetter (selected) {
	
	selected.style.visibility = 'hidden'; // when letter button clicked it'll go away but retain position unlike:  selected.style.display = 'none'

	var c = document.querySelector('canvas').getContext('2d');
	c.fillStyle = "black";
	c.lineWidth=2;
	c.fillRect(50, 15, 20, 135); // vertical box
	c.fillRect(50, 15, 160, 8); // horizonal box
	c.beginPath(); // hanging rope
	c.moveTo(160,20);
	c.lineTo(160,40);
	c.stroke();
	head = function() {
		c.beginPath();
		c.arc(160, 50, 10, Math.PI * 2, false);
		c.stroke();
	}
	body = function() {
		c.beginPath();
		c.moveTo(160,60);
		c.lineTo(160,100);
		c.stroke();
	}
	armLeft = function() {
		c.beginPath();
		c.moveTo(160,70);
		c.lineTo(130,80);
		c.stroke();
	}
	armRight = function() {
		c.beginPath();
		c.moveTo(160,70);
		c.lineTo(190,80);
		c.stroke();
	}
	legLeft = function () {
		c.beginPath();
		c.moveTo(160,100);
		c.lineTo(135,120);
		c.stroke();
	}
	legRight = function() {
		c.beginPath();
		c.moveTo(160,100);
		c.lineTo(185,120);
		c.stroke();
	}

	var l = document.createElement('div');
	l.innerHTML = selected.innerHTML;
	l.className = 'lblUsed';
	div_used.appendChild(l);

	var letter = selected.innerHTML;
	var current = '';
	var correct = false;
	for (var i = 0; i < puzzle.length; i++) {
		if (puzzle[i] == letter) {
			document.getElementById('letter_'+i).innerHTML = letter;
			correct = true; 
		}
		if (document.getElementById('letter_'+i).innerHTML == "") current += ' ';
		else current += document.getElementById('letter_'+i).innerHTML;
	}
	if (correct) {
		document.getElementById('sndCorrect').currentTime = 0;
		document.getElementById('sndCorrect').play();
		l.style.backgroundColor = '#00bc2b';
	}
	else {
		document.getElementById('sndError').currentTime = 0;
		document.getElementById('sndError').play();
		l.style.backgroundColor = '#ff000c';
		strikes++;
	}
	if (strikes == 1)   head();
	if (strikes == 2)   body();
	if (strikes == 3)   armLeft();
	if (strikes == 4)   armRight();
	if (strikes == 5)   legLeft();
	if (strikes == 6) { legRight();
		alert('You lose. The correct answer was "' + puzzle + '".');
		location.reload();
	};
	if (current == puzzle) {
		alert ("You did it!"); 
		location.reload();
	};
};





