#pragma strict


var LevelSelect : GameObject;
var Options : GameObject;
var Exit : GameObject;
var Mainmenu : GameObject;
var ShowMainmenu = true;
var HowtoPlay : GameObject;


function Start(){
	SoundCliks();
  if(ShowMainmenu == true){
	    ShutOff();
	    Mainmenu.SetActive(true);
 	}
}

function SoundCliks(){
	GetComponent.<AudioSource>().Play();
}


function HowTo(){
	
	ShutOff();
	HowtoPlay.SetActive(true);
	
}

function ShutOff() {
	Options.SetActive(false);
    Exit.SetActive(false);
    Mainmenu.SetActive(false);
    LevelSelect.SetActive(false);
	HowtoPlay.SetActive(false);
}


function Play(){
  /*SoundCliks();*/
  /*Application.LoadLevel(levelScene);*/
}

function Credits(){/*
  SoundCliks();
   Application.LoadLevel(CreditsLevel);*/
}


function ChangeAudioVolume(){


  ShutOff();
Options.SetActive(true);
}



function Back(){
  

  ShutOff();
  Mainmenu.SetActive(true);
}

function EXIT(){
  
  ShutOff();
  Exit.SetActive(true);
}

function Quit(){
  Application.Quit();
}

function LEVELSELECT() {
	
	ShutOff();
	LevelSelect.SetActive(true);
}
function lvl1() {
	Application.LoadLevel("Level01");

}
function lvl2(){
	Application.LoadLevel("level02");
}

function lvl4(){
	Application.LoadLevel("level04");
}