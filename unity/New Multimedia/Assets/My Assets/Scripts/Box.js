#pragma strict
var previousLinearVelocity : Vector2;
var previousAngularVelocity : float;
var timeStopped : boolean;
var platform: Rigidbody2D;

function Start(){
	platform = GetComponent(Rigidbody2D);
	timeStopped = false;
}

function Update() {
	if(!timeStopped){
		
		previousLinearVelocity = platform.velocity; 
		previousAngularVelocity = platform.angularVelocity;

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
	platform.angularVelocity = 0;
	Debug.Log("BOX TIME STOPPED");
}

function StartTime(){
	platform.isKinematic = false;
	platform.velocity = previousLinearVelocity;
	platform.angularVelocity = previousAngularVelocity;
}