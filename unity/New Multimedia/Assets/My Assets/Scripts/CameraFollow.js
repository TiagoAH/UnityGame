#pragma strict
// This complete script can be attached to a camera to make it
// continuously point at another object.
// The target variable shows up as a property in the inspector.
// Drag another object onto it to make the camera look at it.
var dampTime : float = 0.3; //offset from the viewport center to fix damping
private var velocity = Vector3.zero;
var target : Transform;


function Update() {
    if(target) {
        var point : Vector3 = GetComponent.<Camera>().WorldToViewportPoint(target.position);
        var delta : Vector3 = target.position -
                    GetComponent.<Camera>().ViewportToWorldPoint(Vector3(0.5, 0.5, point.z));
        var destination : Vector3 = transform.position + delta;
        transform.position = Vector3.SmoothDamp(transform.position, destination, 
                                                velocity, dampTime);
    }
}