#pragma strict

private var myText : UnityEngine.UI.Text;

function Start (){
	myText = GetComponent(UnityEngine.UI.Text);
}

function Update () {
	if((this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).stopped)
		myText.text = "TIME STOPPED";
	else if ((this.transform.root.gameObject.GetComponent("TimeStopGlobal") as TimeStopGlobal).reversed)
		myText.text = "TIME REVERSED";
	else
		myText.text = "";
}
