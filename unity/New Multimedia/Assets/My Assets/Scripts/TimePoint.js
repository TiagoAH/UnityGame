#pragma strict

public class TimePoint 
{

	var time : float;
	var point: Vector2;
	//É um exemplo de uma classe que reune Vector2, mas também tem uma variável tempo, do tipo float
	function TimePoint(x: float, y:float, time: float){
		point = new Vector2(x,y);
		this.time= time;
	}
}