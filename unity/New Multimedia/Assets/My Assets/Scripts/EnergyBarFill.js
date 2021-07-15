#pragma strict

var global : TimeStopGlobal;
var energyBar : UnityEngine.UI.Image;

function Update () {
	var fill: float;

	fill = global.GetComponent(TimeStopGlobal).currentEnergy / global.GetComponent(TimeStopGlobal).maxEnergy;

	energyBar.fillAmount = fill;

}
