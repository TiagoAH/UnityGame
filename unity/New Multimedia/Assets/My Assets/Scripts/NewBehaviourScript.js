#pragma strict

var platform : Rigidbody2D;
public var myTime: float;

function Start () {
	platform = GetComponent(Rigidbody2D);
}

function Fall (fallTime: float){
	var i = -1;
    while (fallTime > 0) {
        platform.position =	new Vector2(platform.position.x + i * 0.01f , platform.position.y);
       	i = i * (-1);
       	yield new WaitForSeconds(0.001f);
        fallTime -= Time.deltaTime;
    }
    platform.isKinematic = false;
}

function OnTriggerEnter2D(other: Collider2D) {
	Debug.Log("COLLIDED");
	StartCoroutine(Fall(myTime));
}