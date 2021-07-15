#pragma strict
var previousLinearVelocity : Vector2;
var previousAngularVelocity : float;
var timeStopped : boolean;
var platform: Rigidbody2D;

private var maxArrayLength : int;

var timeReversed : boolean;


var positions : Array;
var rotations : Array;
var linearVelocities: Array;
var angularVelocities: Array;



function Start(){
	platform = GetComponent(Rigidbody2D);
	timeStopped = false;
	timeReversed = false;
	maxArrayLength = 1024;
	positions = new Array();
	rotations = new Array();
	linearVelocities = new Array();
	angularVelocities = new Array();
}

function Update() {
	var happened : boolean;
	happened = false;
	if(!timeStopped && !timeReversed ){


		if(positions.length >= 1024){
			positions.RemoveAt(0);
			rotations.RemoveAt(0);
			linearVelocities.RemoveAt(0);
			angularVelocities.RemoveAt(0);
		}
		positions.push(platform.position);
		rotations.push(platform.rotation);
		linearVelocities.push(platform.velocity);
		angularVelocities.push(platform.angularVelocity);

		previousLinearVelocity = platform.velocity; 
		previousAngularVelocity = platform.angularVelocity;

	}else if(!timeStopped && timeReversed){
		//if there are any positions in the vector...
		if(positions.length != 0){
		//move to a previous position and remove it from vector
			platform.MovePosition(positions.pop());
			platform.MoveRotation(rotations.pop());
		//this ensures that when the time goes back to normal, the object moves with the same velocities as it did
			previousLinearVelocity = linearVelocities.pop();
			previousAngularVelocity = angularVelocities.pop();
		}


	}


	//Esta porcaria aqui vai ver se o tempo está parado ou não. Acho que não é a melhor maneira de fazê-lo 
	var globalStop: boolean;
	var globalReverse: boolean;

	globalStop = (this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).stopped;
	globalReverse = (this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).reversed;

	//Debug.Log((globalStop));
	if(globalStop != timeStopped){
		
		if(globalStop){
			StartCoroutine("StopTime");
		}
		else{
			if(timeReversed == globalReverse)
				StartCoroutine("StartTime");
		}
	}

	if(globalReverse != timeReversed && !timeStopped){
		

		 if(globalReverse){
		 	StartCoroutine("ReverseTime");
		 }
		 else{
		 	StartCoroutine("StartTime");
		 }

	}


	timeStopped = (globalStop);
	timeReversed = globalReverse;

}

function StopTime(){
	timeStopped = true;
	platform.isKinematic = true;
	platform.velocity = new Vector2(0,0);
	platform.angularVelocity = 0;
	Debug.Log("BOX TIME STOPPED");
}

function StartTime(){
	platform.isKinematic = false;
	platform.velocity = previousLinearVelocity;
	platform.angularVelocity = previousAngularVelocity;
}

function ReverseTime(){
	Debug.Log("TIME REVERSED ON THE BOX");
	platform.isKinematic = true;
	platform.velocity = new Vector2(0,0);
	platform.angularVelocity = 0;
}