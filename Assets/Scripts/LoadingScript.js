#pragma strict

var style : GUIStyle;

function Start () {
	style = new GUIStyle();
	style.fontSize = 50;
	style.normal.textColor = Color.white;
	style.alignment = TextAnchor.MiddleCenter;

	var scene : String = Param.GetString("scene");
	Application.LoadLevel(scene);
}

function Update () {

}

function OnGUI () {
	GUI.Label(Rect(0, 0, Screen.width, Screen.height), "NOW LOADING...", style);
}
