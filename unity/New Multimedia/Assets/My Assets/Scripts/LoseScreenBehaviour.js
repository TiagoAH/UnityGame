#pragma strict

function Start () {
	
}

function Reload(){
	Application.LoadLevel(Application.loadedLevel);
	Debug.Log("RELOADED LEVEL");
}

function BackToMenu(){
	Debug.Log("WENT BACK TO MENU");
	Application.LoadLevel("MainMenu");
}

function test(){

	Debug.Log("TESTAR");
}