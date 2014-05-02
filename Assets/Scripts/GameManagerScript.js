#pragma strict

var player : GameObject;
//var other : GameObject;
var enemy1 : GameObject;
var enemy2 : GameObject;
//var item : GameObject;
var floor1 : GameObject;
var floor2 : GameObject;
var goal : GameObject;
var cam : GameObject;
var lig : GameObject;
var style : GUIStyle;

static var startTime : float;
static var score : int;
static var bestScore : int;
static var debugStr : String = "";

function Start () {
	startTime = Time.time;
	score = 0;
	bestScore = GetBestScore();

	style = new GUIStyle();
	style.fontSize = 30;
	style.normal.textColor = Color.white;

	Instantiate(player, Vector3(0, 2, 0), Quaternion.Euler(0, 180, 0));
//	Instantiate(other, Vector3(1, 0.5, 0), Quaternion.Euler(0, 180, 0));
	Instantiate(floor1, Vector3(0, 0, 0), Quaternion.Euler(0, 0, 0));
	Instantiate(floor1, Vector3(11, 0, 0), Quaternion.Euler(0, 0, 0));
	Instantiate(floor1, Vector3(22, 0, 0), Quaternion.Euler(0, 0, 0));
	Instantiate(floor1, Vector3(33, 0, 0), Quaternion.Euler(0, 0, 0));
	Instantiate(floor1, Vector3(44, 0, 0), Quaternion.Euler(0, 0, 0));
	Instantiate(floor2, Vector3(10, 2, 0), Quaternion.Euler(0, 0, 0));
	Instantiate(goal, Vector3(48.5, 3, 0), Quaternion.Euler(0, 0, 0));

	Instantiate(cam, Vector3(0, 2.5, -1), Quaternion.Euler(0, 0, 0));
	Instantiate(lig, Vector3(4.5, 6.4, -5.5), Quaternion.Euler(50, 330, 0));
}

function Update () {
	var enemy1Intval : int = 60;
//	var enemy2Intval : int = 60;

	var passedTime : float = GetPassedTime();

	if (Time.frameCount % enemy1Intval == 0) {
		Instantiate(enemy1, Vector3(Random.Range(0, 30.0), 5.0, 0), Quaternion.Euler(0, 180, 0));
	}

//	if (Time.frameCount % enemy2Intval == 0) {
//		Instantiate(enemy2, Vector3(Random.Range(0, 30.0), 5.0, 0), Quaternion.Euler(0, 180, 0));
//	}
}

function OnGUI () {
	GUI.Label(Rect(0, 0, 120, 20), "SCORE:" + score.ToString(), style);
	GUI.Label(Rect(0, 30, 120, 20), "BEST SCORE:" + bestScore.ToString(), style);
	GUI.Label(Rect(0, 60, 120, 20), "DEBUG:" + debugStr, style);
}

static function GetPassedTime () : float {
	return Time.time - startTime;
}

static function GetBestScore () : int {
	return PlayerPrefs.GetInt("score");
}

static function UpdateBestScore () {
	if (score > bestScore) {
		PlayerPrefs.SetInt("score", score);
	}
}
