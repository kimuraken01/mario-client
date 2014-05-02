#pragma strict

var style : GUIStyle;

function Start () {
	style = new GUIStyle();
	style.fontSize = 50;
	style.normal.textColor = Color.white;
	style.alignment = TextAnchor.MiddleCenter;
}

function Update () {
	// スペースキー
	if (Input.GetButtonUp("Jump")) {
//		Param.SetString("mode", "normal");
		Common.LoadSceneWithLoading("Main");
	// 左クリック
	} else if (Input.GetMouseButtonDown(0)) {
//		Param.SetString("mode", "normal");
		Common.LoadSceneWithLoading("Main");
	// タップ
	} else if (Input.touchCount > 0) {
		if (Input.GetTouch(0).phase == TouchPhase.Began) {
//			Param.SetString("mode", "normal");
			Common.LoadSceneWithLoading("Main");
		}
	}

}

function OnGUI () {
	GUI.Label(Rect(0, 0, Screen.width, Screen.height), "TITLE", style);
}
