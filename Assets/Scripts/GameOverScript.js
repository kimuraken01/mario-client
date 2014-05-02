#pragma strict

var style : GUIStyle;

function Start () {
	style = new GUIStyle();
	style.fontSize = 50;
	style.normal.textColor = Color.red;
	style.alignment = TextAnchor.MiddleCenter;
}

function Update () {
	// スペースキー
	if (Input.GetButtonUp("Jump")) {
		Application.LoadLevel("Title");
	// 左クリック
	} else if (Input.GetMouseButtonDown(0)) {
		Application.LoadLevel("Title");
	// タップ
	} else if (Input.touchCount > 0) {
		if (Input.GetTouch(0).phase == TouchPhase.Began) {
			Application.LoadLevel("Title");
		}
	}
}

function OnGUI () {
	GUI.Label(Rect(0, 0, Screen.width, Screen.height), "GAME OVER", style);
}
