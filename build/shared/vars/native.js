/*

	Native objects

*/
//String Object
var _array = Array,
	//Object Object
	_object = Object,
	//Function Object
	_function = Function,
	//String Object
	_string = String,
	//JSON Object
	json = JSON,
	//Math Object
	_math = Math,
	//boolean object
	_boolean = Boolean,
	//undefined cache
	_undefined = undefined,
	//weakmap
	weak_map = WeakMap,
	new_weak_map = function() {
		return new weak_map();
	},
	//map
	_map = Map,
	//number
	number_object = Number,
	_console = function(obj) {
		console.log(obj);
	},
	_object_keys = _object.keys,
	_objectIs = _object.is,
	_object_assign = _object.assign,
	_bind = Function.bind,
	_bind_call = function(object, data) {
		return _bind.call(object, data);
	},
	stringify = json.stringify,
	$prototype = 'prototype',
	//prototypes
	object_prototype = _object[$prototype],
	//array prototype
	array_prototype = _array[$prototype],
	//string
	string_prototype = _string[$prototype],
	_array_push = array_prototype.push,
	_object_getOwnPropertyDescriptor = _object.getOwnPropertyDescriptor;
