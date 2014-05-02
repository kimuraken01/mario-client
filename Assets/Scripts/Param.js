#pragma strict

static var params : Hashtable = new Hashtable();

static function GetString (name : String) : String {
	return params[name];
}

static function GetInt (name : String) : int {
	var value : String = params[name];
	return parseInt(value);
}

static function GetFloat (name : String) : float {
	var value : String = params[name];
	return parseFloat(value);
}

static function SetString (name : String, value : String) {
	params[name] = value;
}

static function SetInt (name : String, value : int) {
	params[name] = "" + value;
}

static function SetFloat (name : String, value : float) {
	params[name] = "" + value;
}
