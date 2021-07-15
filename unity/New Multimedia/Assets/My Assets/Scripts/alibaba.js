#pragma strict

var door : Transform;
var sld : Transform;
private var scrpt : SlidingPlatformBehaviour;
private var platform : Rigidbody2D;
private var open : boolean;
private var count : int;

function Start() {
	count = 0;
	open = false;
	platform = door.GetComponent(Rigidbody2D);
	scrpt = sld.GetComponent(SlidingPlatformBehaviour);
	scrpt.speed = 0;
}

function Update() {
	if (open && count < 300) {
		Open();
	}
}

function OnTriggerStay2D(other : Collider2D) {
	if (Input.GetKeyDown("e")) {
		open = true;
		scrpt.speed = 0.1;
		Debug.Log("PRESSED BUTTON");
	}
}

function Open() {
	count += 1;
	platform .MovePosition(new Vector2(platform .position.x + 0.1, platform.position.y));

}