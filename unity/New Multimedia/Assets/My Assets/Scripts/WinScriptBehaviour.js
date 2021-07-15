#pragma strict

var nextLevel : String;
function NextLevel () {
	Application.LoadLevel(nextLevel);
}

function BackToMenu(){
	Application.LoadLevel("MainMenu");
}