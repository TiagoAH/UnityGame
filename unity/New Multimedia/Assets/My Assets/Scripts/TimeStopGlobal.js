#pragma strict


	var stopped : boolean;
	var reversed : boolean;
	var currentEnergy : float;
	var maxEnergy : float;
	var timer : int;
	var cameraMain : Camera;
	var cameraZoomOut : Camera;

	function Start(){
		stopped = false;
		reversed = false;
		maxEnergy = 1024;
		currentEnergy = 0;
		cameraMain.enabled = true;
		cameraZoomOut.enabled = false;
		timer = 0;
	}

	function Update(){

		
	 	if(Input.GetKeyDown("t") && currentEnergy>0){
		 	stopped = !stopped;
		 	reversed = false;
		 	//Debug.Log("Stopped Time key pressed");
		 	timer = 100;
		 }
		if(Input.GetKeyDown("r") && currentEnergy>0){
			stopped = false;
			reversed = !reversed;
			//Debug.Log("Reversed Time key pressed");
			timer = 100;
		}
		if(Input.GetKeyDown("z")){
			cameraMain.enabled = !cameraMain.enabled;
			cameraZoomOut.enabled = !cameraZoomOut.enabled;

		}


		if(timer == 0 && currentEnergy < maxEnergy && !stopped && !reversed){
			currentEnergy += 1;
		}


		if (timer > 0 && !stopped && !reversed)
			timer -= 1;

		if (stopped || reversed)
			currentEnergy -= 1;

		if(currentEnergy < 0){
			stopped = false;
			reversed = false;
			timer = 200;
			currentEnergy = 0;
		}

		//Debug.Log(currentEnergy);
		//Debug.Log(timer);
	
	}

