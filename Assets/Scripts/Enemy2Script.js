#pragma strict

var explosion : GameObject;

function Start () {

}

function Update () {

}

function OnCollisionEnter (obj : Collision) {
	if (obj.gameObject.name == "Bullet(Clone)") {
		GameManagerScript.score += 5;
		Destroy(gameObject);
		var clone : GameObject = Instantiate(explosion, transform.position, transform.rotation);
		yield WaitForSeconds(0.4);
		Destroy(clone);
	}
}
