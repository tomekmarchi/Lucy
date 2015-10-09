//convert object to string
var $tostring = object_prototype.toString,
	//make collection into an array
	_toArray = (_array.from) ? _array.from : function (nodes) {
		var arr = [];
		for (var i = -1, l = nodes.length; ++i !== l; arr[i] = nodes[i]);
		return arr;
	};
