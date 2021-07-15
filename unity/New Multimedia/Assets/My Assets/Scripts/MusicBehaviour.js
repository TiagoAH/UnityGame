#pragma strict

public var volume : float;
var levelSource : AudioSource;
var level : int;
var started : boolean;
var menuSource: AudioSource;

function Start () {
	DontDestroyOnLoad(this.transform.gameObject);
	Debug.Log(Application.loadedLevel);

}

function SetVolume(val : float){
	volume = val;
}

function Update () {
	if(Application.loadedLevel != level){
		SwitchTracks();
		level = Application.loadedLevel;
	}

	menuSource.volume = volume;
	levelSource.volume = volume;
}

function SwitchTracks(){
	if(level == 0){
		menuSource.Play();
		levelSource.Pause();

	}
	else{
		menuSource.Pause();
		levelSource.Play();

	}
	started = true;
}
