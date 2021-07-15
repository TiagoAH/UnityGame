#pragma strict
import System.Collections.Generic;
//TODO: redo this crap from scratch
var points : List.<TimePoint>;
var currentPoint : int;
var remainingTime : float;
var startingTime : float;
private var nextPoint: TimePoint;
private var velocity: Vector2;
//var points : Vector2[];
var platform : Rigidbody2D;
var timeStop : boolean;
var timeReverse : boolean;

function Start () {
	platform = GetComponent(Rigidbody2D);
	nextPoint = points[0];
	timeStop = false;
	timeReverse = false;
	remainingTime = 0;
}

function slideToNext () {
	var xVelocity : float;
	var yVelocity : float;


	platform.MovePosition(new Vector2(nextPoint.point.x, nextPoint.point.y));
	if(currentPoint >= points.Count-1){
		currentPoint = 0;
	}
	else{
		currentPoint += 1;
	}

	nextPoint = points[currentPoint];
	remainingTime = nextPoint.time;

	if(remainingTime <= 0)
		remainingTime = nextPoint.time;
	startingTime = nextPoint.time;

	if (nextPoint.time == 0){
		nextPoint.time = 0.001;
	}

	xVelocity =  (nextPoint.point.x - platform.position.x)/ remainingTime;
	yVelocity =  (nextPoint.point.y - platform.position.y)/ remainingTime;

	velocity = new Vector2(xVelocity, yVelocity);
	Debug.Log("SLIDING TO NEXT POINT");
	
}

function slideToPrevious() {
	var xVelocity : float;
	var yVelocity : float;

	platform.MovePosition(new Vector2(nextPoint.point.x, nextPoint.point.y));
	if(currentPoint == 0){
		currentPoint = points.Count-1;
	}
	else{
		currentPoint -= 1;
	}

	nextPoint = points[currentPoint];

	if(remainingTime > startingTime)
		remainingTime = 0;
	startingTime = nextPoint.time - remainingTime;
	Debug.Log(startingTime + "=" + nextPoint.time + "-" + remainingTime);
	xVelocity =  (nextPoint.point.x - platform.position.x)/ startingTime;
	yVelocity =  (nextPoint.point.y - platform.position.y)/ startingTime;

	velocity = new Vector2(xVelocity, yVelocity);
	Debug.Log("SLIDING TO PREVIOUS POINT");

}



//Nota: deltaTime é o tempo entre cada frame
function Update(){
	

	timeStop = (this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).stopped;


	//Detects when global time reverse changes states
	if(timeReverse !=  (this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).reversed){
		timeReverse =  (this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).reversed;
		if(timeReverse){
			StartCoroutine("slideToPrevious");
		}
		else{
			StartCoroutine("slideToNext");
		}

	}
	//Debug.Log(remainingTime);
	if(remainingTime >= 0 && !timeStop && remainingTime <= startingTime){
		platform.MovePosition(platform.position + Time.deltaTime * velocity);
		if(!timeReverse){
			remainingTime -= Time.deltaTime;
		}
		else{
			remainingTime += Time.deltaTime;

		}
	}
	else{
		if(timeReverse){
			StartCoroutine("slideToPrevious");
		}
		else{
			StartCoroutine("slideToNext");
		}
	}

}

