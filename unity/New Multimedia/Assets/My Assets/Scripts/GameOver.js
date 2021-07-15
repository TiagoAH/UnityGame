#pragma strict

var normalUI : GameObject;
var loseUI : GameObject;

function Start(){
	var root : Transform;
	root = this.transform.root;

	normalUI = root.Find("Canvas/GameUI").gameObject;
	loseUI = root.Find("Canvas/LoseScreen").gameObject;
}

function OnTriggerEnter2D(other: Collider2D) {

	if(other.gameObject.tag == "Player"){
		Debug.Log("Game over");
		normalUI.SetActive(false);
		loseUI.SetActive(true);
		other.gameObject.SetActive(false);
	}
}

