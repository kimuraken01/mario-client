#pragma strict

import System.Text.RegularExpressions;

static function GetOSName () : String {
	var os : String = SystemInfo.operatingSystem;
	if (Regex.IsMatch(os, "^Windows")) {
		return "Windows";
	} else if (Regex.IsMatch(os, "^Mac")) {
		return "Mac";
	} else if (Regex.IsMatch(os, "^Android")) {
		return "Android";
	} else if (Regex.IsMatch(os, "^iPhone")) {
		return "iPhone";
	} else {
		return "";
	}
}

static function GetDir (startX : float, startY : float, endX : float, endY : float) : int {
	var moveX : float = endX - startX;
	var moveY : float = endY - startY;
	var dir : int = 0;

	if (moveX == 0) {
		if (moveY >= 0) {
			dir = 0;
		} else {
			dir = 180;
		}
	} else {
		var angle : float = Mathf.Abs(moveY) / Mathf.Abs(moveX);
		if (angle <= 0.5) {	// 1/2
			dir = 90;
		} else if (angle <= 1.5) {	// 3/2
			dir = 45;
		} else {
			dir = 0;
		}
		if (moveX < 0) {
			if (moveY >= 0) {
				dir = 360 - dir;
			} else {
				dir = 180 + dir;
			}
		} else {
			if (moveY < 0) {
				dir = 180 - dir;
			}
		}
		if (dir == 360) {
			dir = 0;
		}
	}

	return dir;
}

static function DirToX (dir : int) : float {
	if (dir == 0) {
		return 0.0;
	} else if (dir == 45) {
		return 1.0;
	} else if (dir == 90) {
		return 1.0;
	} else if (dir == 135) {
		return 1.0;
	} else if (dir == 180) {
		return 0.0;
	} else if (dir == 225) {
		return -1.0;
	} else if (dir == 270) {
		return -1.0;
	} else if (dir == 315) {
		return -1.0;
	} else {
		return 0.0;
	}
}

static function DirToZ (dir : int) : float {
	if (dir == 0) {
		return 1.0;
	} else if (dir == 45) {
		return 1.0;
	} else if (dir == 90) {
		return 0.0;
	} else if (dir == 135) {
		return -1.0;
	} else if (dir == 180) {
		return -1.0;
	} else if (dir == 225) {
		return -1.0;
	} else if (dir == 270) {
		return 0.0;
	} else if (dir == 315) {
		return 1.0;
	} else {
		return 0.0;
	}
}

static function LoadSceneWithLoading (scene : String) {
	Param.SetString("scene", scene);
	Application.LoadLevel("Loading");
}
