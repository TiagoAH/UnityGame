#pragma strict

var platform : Rigidbody2D;
public var myTime: float;
var timeStopped: boolean;
var fell: boolean;
var previousVelocity : Vector2;





function Start () {
	platform = GetComponent(Rigidbody2D);
	timeStopped = false;
	fell = false;
	}

function Update() {
	if(fell && !timeStopped){
		
		previousVelocity = platform.velocity; 

	}

		//Esta porcaria aqui vai ver se o tempo está parado ou não. Acho que não é a melhor maneira de fazê-lo 
		var globalStop: boolean;
		globalStop = (this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).stopped;
		//Debug.Log((globalStop));
		if(globalStop != timeStopped){
			timeStopped = (globalStop);
			if(timeStopped){
				StartCoroutine("StopTime");
			}
			else{
				StartCoroutine("StartTime");
				}
		}


}

function StopTime(){
	timeStopped = true;
	platform.isKinematic = true;
	platform.velocity = new Vector2(0,0);
}

function StartTime(){
	if(fell){
		platform.isKinematic = false;
	}
	platform.velocity = previousVelocity;

}


function Fall (fallTime: float){
	var i = -1;
    while (fallTime > 0) {
    	if(!timeStopped){
	        platform.position =	new Vector2(platform.position.x + i * 0.01f , platform.position.y);
	       	i = i * (-1);
	        fallTime -= Time.deltaTime;
        }
        yield new WaitForSeconds(0.01f);
    }
    platform.isKinematic = false;
    fell = true;
}

function OnCollisionEnter2D(other: Collision2D) {
	Debug.Log("COLLIDED");
	if(!fell && other.gameObject.tag != "TimeStop"){
		StartCoroutine(Fall(myTime));
	}
}
/*
function OnTriggerExit2D(other: Collider2D) {
	Debug.Log("Left");
	if(other.gameObject.tag == "TimeStop"){
		StartCoroutine("StartTime");
	}

}


*/


