#pragma strict


function Start() {
	var slider = this.transform.root.Find("Music").gameObject.GetComponent(MusicBehaviour);
	this.transform.GetComponent(UnityEngine.UI.Slider).value = slider.volume;
	Debug.Log(slider.volume);
}

function Update () {
	
}
