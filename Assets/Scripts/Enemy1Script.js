#pragma strict

var explosion : GameObject;

private var player : GameObject;
private var speed : float = 1.5;
private var gravity : float = 20.0;
private var moveDir : Vector3 = Vector3.zero;
private var controller : CharacterController;
private var isWalking : boolean = false;
private var x : float;
private var dir : int;

function Start () {
	player = GameObject.Find("Player(Clone)");
	controller = GetComponent(CharacterController);

	animation.Play("loop_idle");
	var anim : Animation = GetComponent(Animation);
	anim["loop_run_funny"].speed = 2.0;
}

function Update () {
	// 地面についているかどうか
	if (controller.isGrounded) {
		if (! isWalking) {
			isWalking = true;
			animation.Play("loop_run_funny");
		}

//		var passedTime : float = GameManagerScript.GetPassedTime();

		if (Time.frameCount % 10 == 0) {
			if (player.transform.position.x >= transform.position.x) {
				x = 1.0;
				dir = 180;
			} else {
				x = -1.0;
				dir = 0;
			}
		}

		moveDir.x = speed * x;
		transform.eulerAngles = Vector3(0, dir, 0);
	} else {
		// 重力を計算
		moveDir.y -= gravity * Time.deltaTime;
	}

	// 移動
	controller.Move(moveDir * Time.deltaTime);

	if (transform.position.y < -10) {
		Destroy(gameObject);
	}
}

function OnTriggerEnter (collider : Collider) {
	if (collider.gameObject.name == "Bullet(Clone)") {
		GameManagerScript.score += 5;
		Destroy(gameObject);
		Destroy(collider.gameObject);
		var clone : GameObject = Instantiate(explosion, transform.position, transform.rotation);
		yield WaitForSeconds(0.4);
		Destroy(clone);
	}
}
