#pragma strict

var bullet : GameObject;
var cam : GameObject;
var se01 : AudioClip;

private var speed : float = 5.0;
private var jumpSpeed : float = 9.0;
private var gravity : float = 20.0;
private var moveDir : Vector3 = Vector3.zero;
private var controller : CharacterController;
private var yPrev : float;
private var startTime : float;

function Start () {
	// キャラクターコントローラー取得
	controller = GetComponent(CharacterController);

	// カメラ取得
	cam = GameObject.Find("MainCamera(Clone)");
	cam.transform.position.x = transform.position.x;
//	cam.transform.position.y = transform.position.y + 2.0;
	cam.camera.orthographicSize = 3;
}

function Update () {
	var x : float = Input.GetAxis("Horizontal");
	var dir : int = 0;
	var mouseX : int;
	var mouseY : int;
	var touchX : int;
	var touchY : int;
	var pos : Vector3;

	if (x) {
		// 方向キー
		if (x > 0) {
			dir = 90;			// 右
		} else if (x < 0) {
			dir = 270;			// 左
		}

		animation.Play("run");
		moveDir.x = speed * x;
		transform.eulerAngles = Vector3(0, dir, 0);

		cam.transform.position.x = transform.position.x;
	} else if (Input.GetMouseButtonDown(0) || Input.GetMouseButton(0)) {
		// 左クリック
		mouseX = Input.mousePosition.x;
		pos = cam.camera.WorldToScreenPoint(transform.position);

		if (mouseX > pos.x) {
			dir = 90;			// 右
		} else if (x < 0) {
			dir = 270;			// 左
		}

		animation.Play("run");
		moveDir.x = speed * x;
		transform.eulerAngles = Vector3(0, dir, 0);

		cam.transform.position.x = transform.position.x;
	} else if (Input.touchCount > 0) {
		// タップ
		var touch : Touch = Input.GetTouch(0);
		if (touch.phase != TouchPhase.Ended) {
			touchX = touch.position.x;
			pos = cam.camera.WorldToScreenPoint(transform.position);

			if (touchX > pos.x) {
				dir = 90;			// 右
			} else if (x < 0) {
				dir = 270;			// 左
			}

			animation.Play("run");
			moveDir.x = speed * x;
			transform.eulerAngles = Vector3(0, dir, 0);

			cam.transform.position.x = transform.position.x;
		}
	} else {
		animation.Play("Idle");
		moveDir.x = 0;
	}

	// 地面についているかどうか
	if (controller.isGrounded) {
		// ジャンプ
		if (Input.GetButton("Jump")) {
			var yTemp : float = transform.position.y;
			moveDir.y = (transform.position.y - yPrev) + jumpSpeed;
			yPrev = yTemp;
		}
	} else {
		// 重力を計算
		moveDir.y -= gravity * Time.deltaTime;
//		cam.transform.position.y = transform.position.y + 2.0;
	}

	// 移動
	controller.Move(moveDir * Time.deltaTime);

	if (transform.position.y < -10) {
		GameManagerScript.UpdateBestScore();
		Application.LoadLevel("GameOver");
	}

	// 弾発射
	if (Input.GetButton("Fire1") && GetPassedTime() > 0.8) {
		startTime = Time.time;
		Instantiate(bullet, Vector3(transform.position.x, transform.position.y + 0.5, 0),
			Quaternion.Euler(0, 0, 0));
	}
}

function OnControllerColliderHit (hit : ControllerColliderHit) {
	if (hit.gameObject.name == "Enemy1(Clone)") {
		GameManagerScript.UpdateBestScore();
		Application.LoadLevel("GameOver");
	}
}

function OnTriggerEnter (collider : Collider) {
	if (collider.gameObject.name == "Enemy1(Clone)") {
		GameManagerScript.UpdateBestScore();
		Application.LoadLevel("GameOver");
	} else if (collider.gameObject.name == "Goal(Clone)") {
		GameManagerScript.UpdateBestScore();
		Application.LoadLevel("GameOver");
	}
}

function OnGUI () {
}

function GetPassedTime () : float {
	return Time.time - startTime;
}
