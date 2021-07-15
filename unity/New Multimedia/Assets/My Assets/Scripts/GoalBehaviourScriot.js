#pragma strict

var timer : float;
var finished : boolean;
var output : UnityEngine.UI.Text;
var normalUI : GameObject;
var winUI : GameObject;
var character : GameObject;
function Start () {
	timer = 0.0;
}

function Update () {
	if(!finished){
		timer += Time.deltaTime;
	}
}

function OnTriggerEnter2D(other : Collider2D ){
	if(other.gameObject.tag == "Player" && !finished) {
		output.text = "You beat the Level in " + timer.ToString("0.0") +" seconds!";
		finished = true;
		normalUI = this.transform.root.Find("Canvas/GameUI").gameObject;
		winUI = this.transform.root.Find("Canvas/WinScreen").gameObject;
		normalUI.SetActive(false);
		winUI.SetActive(true);
		other.gameObject.SetActive(false);
		}

}
