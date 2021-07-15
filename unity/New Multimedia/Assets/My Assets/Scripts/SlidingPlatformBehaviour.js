#pragma strict

var path : List.<Vector2>;
private var currentIndex : int;
var speed : float;
private var velocity : Vector2;
var minDistance: float;
private var platform : Rigidbody2D;
private var dir : Vector2;

private var timeStop : boolean;
private var timeReverse : boolean;

function Start () {
	
	currentIndex = 0;
	timeStop = false;
	timeReverse = false;
	minDistance = 0.5;
	platform = GetComponent(Rigidbody2D);
	dir =  path [currentIndex]  - this.transform.position;
}

function Update () {


	timeStop = (this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).stopped;

	if(timeReverse != (this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).reversed){
		timeReverse = (this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).reversed;
		ChooseDestination();
	}
	
	if(!timeStop){
		if(Vector2.Distance(path[currentIndex], this.transform.position) > minDistance){
		 	platform.MovePosition(platform.position + dir * Time.deltaTime *speed);

		 }
		 else{
		 	ChooseDestination();
		 }
	 }
}

function ChooseDestination(){

	
	if(!timeReverse){
		if(currentIndex < path.Count - 1)
			currentIndex += 1;
		else
			currentIndex = 0;
	}else{
		if(currentIndex >0)
			currentIndex -= 1;
		else
			currentIndex = path.Count -1;	
	}


	dir =  path [currentIndex]  - this.transform.position;
	
}
