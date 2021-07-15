#pragma strict

private var platform : Rigidbody2D;
private var shaking : boolean;
private var falling : boolean;
var timeMax : float;
private var timeRemaining : float;

private var positions : Array;
private var shakingStatus : Array;
private var fallingStatus : Array;
private var timeRemainingArray : Array;
private var velocities : Array;

private var previousVelocity : Vector2;


private var timeStopped : boolean;
private var timeReversed : boolean;
private var i : float;

function Start () {
	platform = GetComponent(Rigidbody2D);
	shaking = timeStopped = timeReversed = falling = false;
	timeRemaining = timeMax;
	i = -1;

	positions = new Array();
	velocities = new Array();
	shakingStatus = new Array();
	fallingStatus = new Array();
	timeRemainingArray = new Array();

}

function Update () {
	

	if(timeStopped != (this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).stopped){
		timeStopped = (this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).stopped;
		ChangeTimeStatus();

	}

	if(timeReversed != (this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).reversed){
		timeReversed = (this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).reversed;
		ChangeTimeStatus();
	}

	if(!timeStopped && shaking){
		Shake();
		if(!timeReversed)
			if(timeRemaining > 0){
				timeRemaining -= Time.deltaTime;
			}
			else{
				falling = true;
				shaking = false;
				ChangeTimeStatus();
			}
	}


	if(!timeStopped && !timeReversed){
		if(positions.length >1024){
			positions.RemoveAt(0);
			velocities.RemoveAt(0);
			shakingStatus.RemoveAt(0);
			fallingStatus.RemoveAt(0);
			timeRemainingArray.RemoveAt(0);
		}

		positions.push(this.platform.position);
		velocities.push(this.platform.velocity);
		shakingStatus.push(shaking);
		fallingStatus.push(falling);
		timeRemainingArray.push(timeRemaining);
	}

	if(timeReversed && !timeStopped){
		if(positions.length > 0){
			this.platform.MovePosition(positions.pop());
			shaking = shakingStatus.pop();
			falling = fallingStatus.pop();
			timeRemaining = timeRemainingArray.pop();
			previousVelocity = velocities.pop();


		}
	}



}

function ChangeTimeStatus(){
	if(timeReversed){
		platform.isKinematic = true;
	
	}
	if(!timeReversed && falling && !timeStopped){
		platform.isKinematic = false;
		this.platform.velocity = previousVelocity;
	}

	if(timeStopped){
		platform.isKinematic = true;
		previousVelocity = platform.velocity;
		platform.velocity = new Vector2(0,0);
	}
}

function Shake(){
	platform.MovePosition(platform.position + new Vector2(0.05f*i, 0));
	i = i * -1;
}

function OnCollisionStay2D(other : Collision2D){
	if(!falling && !shaking && !timeStopped){
		shaking = true;
	}
}
