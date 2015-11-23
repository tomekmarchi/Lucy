/**
 * @name Lucyjs
 * @version 1
 * @authors
	 Thomas Marchi
		 @github https://github.com/tomekmarchi/
	 Nathan Woltman
		 @github https://github.com/woollybogger
 * @copyright 2015 Thomas Marchi,Nathan Woltman
 * @github https://github.com/tomekmarchi/ACID
 * @email tomekmarchi@gmail.com
 */

module.exports = function(_global) {
	"use strict";
	var $ = {};

	//debug option
	var $debug = false;

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
		new_weak_map = function new_weak_map() {
			return new weak_map();
		},

		//map
		_map = Map,

		//number
		number_object = Number,
		_console = function _console(obj) {
			console.log(obj);
		},
		_object_keys = _object.keys,
		_objectIs = _object.is,
		_object_assign = _object.assign,
		_bind = Function.bind,
		_bind_call = function _bind_call(object, data) {
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

	var regex_space = /\s/,
		regex_space_global = /\s/g,
		regex_dot = /\./g,
		regex_dash = /-/g,
		regex_fowardslash = /\//g,
		regex_ext = /\.[0-9a-z]+$/i,
		regex_underscore = /_/g,
		isJSRegex = /\.js/,
		isCSSRegex = /\.css/,
		isJSONRegex = /\.json/,
		hasDotRegex = /\./;

	//convert object to string
	var $tostring = object_prototype.toString,

		//make collection into an array
		arrayFrom = _array.from,
		_toArray;
	if (arrayFrom) {
		_toArray = function(item) {
			return arrayFrom.call(_array, item);
		};
	} else {
		_toArray = function(items) {
			var arr = [];
			for (var i = -1, l = items.length; ++i !== l; arr[i] = items[i]);
			return arr;
		};
	}

	/*
 	This is for object checking is or isnot
 	*/
	//checking
	var obj_strng_gen = function obj_strng_gen(name) {
			return '[object ' + name + ']';
		},
		regexptype = obj_strng_gen('RegExp'),
		argsTag = obj_strng_gen('Arguments'),
		arrayTag = obj_strng_gen('Array'),
		boolTag = obj_strng_gen('Boolean'),
		dateTag = obj_strng_gen('Date'),
		errorTag = obj_strng_gen('Error'),
		funcTag = obj_strng_gen('Function'),
		mapTag = obj_strng_gen('Map'),
		numberTag = obj_strng_gen('Number'),
		objectTag = obj_strng_gen('Object'),
		setTag = obj_strng_gen('Set'),
		stringTag = obj_strng_gen('String'),
		weakMapTag = obj_strng_gen('WeakMap'),
		arrayBufferTag = obj_strng_gen('ArrayBuffer'),
		float32Tag = obj_strng_gen('Float32Array'),
		float64Tag = obj_strng_gen('Float64Array'),
		int8Tag = obj_strng_gen('Int8Array'),
		int16Tag = obj_strng_gen('Int16Array'),
		int32Tag = obj_strng_gen('Int32Array'),
		unit8Tag = obj_strng_gen('unit8Array'),
		unit8ClampedTag = obj_strng_gen('unit8ClampedArray'),
		unit16Tag = obj_strng_gen('unit16Array'),
		unit32Tag = obj_strng_gen('unit32Array'),
		is_same_obj_gen = function is_same_obj_gen(type) {
			return function(obj) {
				return $tostring.call(obj) === type;
			};
		},

		//is regexp
		isRegex = is_same_obj_gen(regexptype),

		//is args
		isArgs = is_same_obj_gen(argsTag),

		//is bool
		isBool = is_same_obj_gen(boolTag),

		//is date
		isDate = is_same_obj_gen(dateTag),

		//is error
		isError = is_same_obj_gen(errorTag),

		//is map
		isMap = is_same_obj_gen(mapTag),

		//is object
		isObject = is_same_obj_gen(objectTag),

		//is isSet
		isSet = is_same_obj_gen(setTag),

		//is isWeakMap
		isWeakMap = is_same_obj_gen(weakMapTag),

		//is isFloat32
		isFloat32 = is_same_obj_gen(float32Tag),

		//is isFloat64
		isFloat64 = is_same_obj_gen(float64Tag),

		//is isInt8
		isInt8 = is_same_obj_gen(int8Tag),

		//is isInt16
		isInt16 = is_same_obj_gen(int16Tag),

		//is isInt32
		isInt32 = is_same_obj_gen(int32Tag),

		//is unit8
		isUnit8 = is_same_obj_gen(unit8Tag),

		//is unit8clamped
		isUnit8clamped = is_same_obj_gen(unit8ClampedTag),

		//is unit16
		isUnit16 = is_same_obj_gen(unit16Tag),

		//is unit3
		isUnit32 = is_same_obj_gen(unit32Tag),

		//is native function
		isNative = function isNative(obj) {
			return hasValue(obj) ? obj.toString().toLowerCase().indexOf('native') != -1 : false;
		},

		//hasval fn returns true or false
		hasValue = function hasValue(n) {
			return n !== undefined && n !== null;
		},

		//is undefined
		isUndefined = function isUndefined(obj) {
			return obj === undefined;
		},

		//is NaN
		_isNaN = isNaN ? isNaN : number_object.isNaN,

		//is int
		_isInt = number_object.isInteger ? number_object.isInteger : function(num) {
			if (num % 1 === 0) {
				return true;
			}
			return false;
		},

		//is equal to null
		isNull = function isNull(obj) {
			return obj === null;
		},
		isFinite = isFinite,

		//check if object is array returns true or false
		_isArray = function _isArray(object) {
			return object instanceof _array;
		},

		//checks to see if is string returns true or false
		_isString = function _isString(obj) {
			return hasValue(obj) ? obj.constructor === _string : false;
		},

		//checks to see if is number returns true or false
		isNumber = function isNumber(obj) {
			return hasValue(obj) ? obj.constructor == number_object : false;
		},

		//is plain object returns true or false
		isPlainObject = function isPlainObject(obj) {
			return hasValue(obj) ? obj.constructor.toString().trim().slice(9, 16) === 'Object(' : false;
		},

		//checks to see if object is a function returns true or false
		_isFunction = function _isFunction(obj) {
			return hasValue(obj) ? obj instanceof _function : false;
		},

		//checks to see if object is a HTMLCollection returns true or false
		_isHTMLCollection = function _isHTMLCollection(obj) {
			return hasValue(obj) ? obj.constructor.name == "HTMLCollection" : false;
		},

		//checks to see if object is a NodeList returns true or false
		_isNodeList = function _isNodeList(obj) {
			return hasValue(obj) ? obj.constructor.name == "NodeList" : false;
		},

		//searching a string for a string returns true or false
		_has = function _has(string, search) {
			var value, loopValue;
			if (!_isString(search)) {
				_each(search, function(item, key) {
					loopValue = string.indexOf(item) != -1;
					if (loopValue) {
						value = loopValue;
					}
				});
			} else {
				value = string.indexOf(search) != -1;
			}
			return value;
		},

		//does object have length
		islength = function islength(obj) {
			return !obj.length;
		},
		isEmpty = function isEmpty(obj) {
			if (hasValue(obj)) {
				var len = islength(obj);
				if (islength(obj)) {
					return !len;
				}
				return !_object.keys(obj).length;
			}
			return false;
		},
		isFileCSS = function isFileCSS(item) {
			return isCSSRegex.test(item);
		},
		isFileJSON = function isFileJSON(item) {
			return isJSONRegex.test(item);
		},
		isFileJS = function isFileJS(item) {
			return isJSRegex.test(item) && !isFileJSON(item);
		},
		hasDot = function hasDot(item) {
			return hasDotRegex.test(item);
		},
		getModelRootName = function getModelRootName(string) {
			return string.split('.')[0];
		},
		getModelProperty = function getModelProperty(string) {
			return _arrayLastItem(string.split('/'))[0];
		},
		isJavascript = isFileJS,
		isCSS = isFileCSS,
		getModelName = function getModelName(string) {
			var splitIt = string.split('/');
			return _find(splitIt[splitIt.length - 1].split('.js')[0], _model);
		};

	/*
 
 This is for finding an object method via a string used througout events
 
 */
	//find method
	var _find = function _find(name, obj) {
		var obj = obj ? obj : $,
			name = name.split('/'),
			name = name[name.length - 1];
		if (_has(name, '.')) {
			var newname = name.split('.'),
				length = newname.length;
			for (var i = 0; i < length; i++) {
				var obj = obj[newname[i]];
				if (!obj) {
					return false;
				}
			}
		} else {
			var obj = obj[name];
		}
		return obj || false;
	};
	/*
 	This is for async promises & timer functions
 */
	//haspromises
	//haspromises
	var haspromise = Promise,

		//make async function calling faster than timeout 0
		_promise_async = haspromise ? haspromise.resolve() : null,

		//async function call
		_async = haspromise ? function(fnc, a) {
			_promise_async.then(fnc);
			return false;
		} : function(fnc, a) {
			_timer(fnc, 0);
			return false;
		},

		//timeing
		_timer = function _timer(fun, time, callback) {
			return setTimeout(function() {
				fun();
				if (callback) {
					callback();
				}
				fun = null;
				callback = null;
				return false;
			}, time);
		},

		//make promise array
		_promise = function _promise(arry, name, callback, calls) {
			_promises[name] = function() {
				var len = arry.length,
					fn = _promises[name],
					go = 0;
				for (var i = 0; i < len; i++) {
					if (fn[arry[i]] == 1) {
						var go = go + 1;
					}
				}
				//if amount of promises made were same as needed then launch callback
				if (go == len) {
					_async(callback);
					$.promises[name] = null;
					return true;
				}
				return false;
			};
			_promises[name].call = {};
			if (calls) {
				_promises[name].call = calls;
			}
		},

		//promised
		_promised = function _promised(self, fn) {
			var val = _promises[fn];
			_promises[fn][self] = 1;
			if (val) {
				var funn = val();
				if (funn) {
					_promises[fn] = null;
				}
			}
			var item = null,
				fun = null,
				funn = null;
			return false;
		},

		//make a promise
		_promoiseFN = $.promise = function(array, name, fun) {
			if (!fun) {
				return _promised(array, name);
			}
			return _promise(array, name, fun);
		},
		_promises = {};
	$.promises = _promises;

	var _arrayLastItem = function _arrayLastItem(array, indexFrom) {
		var result;
		if (!indexFrom) {
			indexFrom = 1;
		}
		if (array) {
			result = array.splice(array.length - indexFrom, indexFrom);
		} else {
			result = array[array.length - 1];
		}
		return result;
	};

	/*
 Each Methods
 Array
 	Each,EachDo,whileTrue,whileFalse,eachWhile,whileLength,eachRight
 Object
 	Each
 Number
 	Each
 */

	//loop through an array of items
	var _each_array = function _each_array(array, fn) {
		//an array of results will be returned
		var returned,
			a = 0,
			length = array.length,
			results = [];
		for (var i = 0; i < length; i++) {
			returned = fn(array[i], i, length, array);
			if (hasValue(returned)) {
				results[a] = returned;
				a++;
			}
		}
		return results;
	};

	var eachRaw = function eachRaw(array, fn) {
		//an array of results will be returned
		for (var i = 0, length = array.length; i < length; i++) {
			fn(array[i], i, length, array);
		}
	};

	var eachDo = function eachDo(array, callback, safeIteration) {
		var i = 0;

		if (safeIteration)
			while (i < array.length && (!(i in this) || callback(array[i], i, array) !== false)) ++i;
		else
			while (i < array.length && callback(array[i], i++, array) !== false);

		return array;
	};

	//loop while the returned result is true
	var _whileTrue = function _whileTrue(array, fn) {
		//an array of results will be returned
		for (var i = 0, results = [], len = array.length; i < len; i++) {
			if (!(results[i] = fn(array[i], i, len))) {
				break;
			}
		}
		return results;
	};

	//loop while the returned result is false
	var _whileFalse = function _whileFalse(array, fn) {
		//an array of results will be returned
		for (var i = 0, results = [], len = array.length; i < len; i++) {
			if (results[i] = fn(array[i], i, len)) {
				break;
			}
		}
		return results;
	};

	//each while the check function is true
	var _eachWhile = function _eachWhile(array, fn, check) {
		//an array of results will be returned
		for (var i = 0, results = [], len = array.length; i < len; i++) {
			if (!check(results[i] = fn(array[i], i, len))) {
				break;
			}
		}
		return results;
	};

	//loop while the count is less than the length of the array
	var _whileLength = function _whileLength(array, fn) {
		//an array of results will be returned
		var results = [];
		var i = 0;
		while (i < arr.length) {
			results[i] = fn(array[i], i);
			i++;
		}
		return results;
	};

	//loop through array backwards aka from the right
	var eachArrayFromRight = function eachArrayFromRight(array, fn) {
		//an array of results will be returned
		for (var results = [], len = array.length, i = len - 1; i >= 0; i--) {
			results[i] = fn(array[i], i, len);
		}
		return results;
	};

	//loop through an object
	var _each_object = function _each_object(object, fn) {
		//an object with matching keys with results will be returned
		var results = {};
		var key;
		for (var i = 0, keys = _object_keys(object), len = keys.length; i < len; i++) {
			//object currect key
			key = keys[i];
			//call function get result
			results[key] = fn(object[key], key, len);
		}
		return results;
	};
	//loop through based on number
	var _each_number = function _each_number(start, end, fn) {
		if (!fn) {
			var fn = end,
				end = start,
				start = 0;
		}
		var results = [];
		for (; start < end; start++) {
			//call function get result
			results[start] = fn(start);
		}
		return results;
	};

	function chunkSlice(array, start, end) {
		var length = Math.min(end, array.length) - start,
			result = new Array(length),
			i = 0;

		for (; i < length; i++) {
			result[i] = array[start + i];
		}

		return result;
	}

	function numericalCompare(a, b) {
		return a - b;
	}

	function numericalCompareReverse(a, b) {
		return b - a;
	}

	function xorBase(a, b) {
		var result = [],
			item,
			i = 0;

		for (; i < a.length; i++) {
			item = a[i];
			if (b.indexOf(item) < 0 && result.indexOf(item) < 0) {
				result.push(item);
			}
		}

		for (i = 0; i < b.length; i++) {
			item = b[i];
			if (a.indexOf(item) < 0 && result.indexOf(item) < 0) {
				result.push(item);
			}
		}

		return result;
	}

	function _uniq(array, isSorted) {
		var result = [],
			length = array.length,
			i = 1;

		if (!length) {
			return result;
		}

		result[0] = array[0];

		if (isSorted) {
			for (; i < length; i++) {
				if (array[i] !== array[i - 1]) {
					result.push(array[i]);
				}
			}
		} else {
			for (; i < length; i++) {
				if (result.indexOf(array[i]) < 0) {
					result.push(array[i]);
				}
			}
		}

		return result;
	}

	//extend prototype for acid libs
	var extend = function extend(obj, ext, wrap) {
			for (var i = 0, keys = _object_keys(obj), len = keys.length; i < len; i++) {
				var key = keys[i];
				var item = obj[key];
				if (item) {
					if (wrap) {
						var item = wrap(item);
					}
					Object.defineProperty(ext, acid_lib_prefix + key, {
						enumerable: false,
						configurable: true,
						writable: true,
						value: item
					});
				}
			}
		},

		//merge objects
		$merge = _object_assign ? function(object, source) {
			return _object_assign(object, source);
		} : function(object, source) {
			var copy = source || {};
			for (var i = 0, keys = _object_keys(object), len = keys.length; i < len; i++) {
				var key = keys[i],
					item = object[key];
				if (hasValue(item)) {
					copy[key] = isPlainObject(item) ? $merge(item) : item;
				}
			}
			return copy;
		};

	//uppercase first letter lower case the rest
	var _ucFirst = function _ucFirst(string) {
		return string.charAt(0).toUpperCase() + string.substr(1);
	};

	//shared functions
	//Flattens a nested array. Pass level to flatten up to a depth;
	var _flatten_once = function _flatten_once(arr) {
			return arr.reduce(function(a, b) {
				if (!_isArray(a)) {
					a = [a];
				}
				if (!_isArray(b)) {
					b = [b];
				}
				pushApply(a, b);
				return a;
			});
		},
		flatten = function flatten(array, level) {
			if (level) {
				if (level === 1) {
					return _flatten_once(array);
				}
				for (var i = 0; i < level; i++) {
					array = array.reduce(function(previousValue, currentValue, index, array) {
						return previousValue.concat(_isArray(currentValue) ? currentValue : [currentValue]);
					}, []); //initial starting value is an amepty array []
				}
				return array;
			}
			return array.reduce(function(previousValue, currentValue, index, array) {
				return previousValue.concat(_isArray(currentValue) ? flatten(currentValue) : currentValue);
			}, []); //initial starting value is an amepty array []
		},

		//cache for function that removes falsey values from array
		compact = function compact(self) {
			var result = [];

			for (var i = 0; i < self.length; i++) {
				if (self[i]) {
					result.push(self[i]);
				}
			}

			return result;
		};
	//initialize array object for array prototype
	var array_extend = {};
	var pushApply = function pushApply(item, array) {
		return _array_push.apply(item, array);
	};

	$.pushApply = pushApply;

	/**
	 * Finds the index of a value in a sorted array using a binary search algorithm.
	 *
	 * If no `compareFunction` is supplied, the `>` and `<` relational operators are used to compare values,
	 * which provides optimal performance for arrays of numbers and simple strings.
	 *
	 * @function Array#bsearch
	 * @param {*} value - The value to search for.
	 * @param {Function} [compareFunction] - The same type of comparing function you would pass to
	 *     [`.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).
	 * @returns {number} The index of the value if it is in the array, or `-1` if it cannot be found.
	 *     If the search value can be found at multiple indexes in the array, it is unknown which of
	 *     those indexes will be returned.
	 *
	 * @example
	 * ['a', 'b', 'c', 'd'].bsearch('c');
	 * // -> 2
	 *
	 * [1, 1, 2, 2].bsearch(2);
	 * // -> 2 or 3
	 *
	 * [1, 2, 3, 4].bsearch(10);
	 * // -> -1
	 *
	 * [1, 2, 3, 4].bsearch(1, function(a, b) {
	 *   return a - b;
	 * });
	 * // -> 0
	 *
	 * ['img1', 'img2', 'img10', 'img13'].bsearch('img2', String.naturalCompare);
	 * // -> 1
	 * // `String.naturalCompare` is provided by the string-natural-compare npm module:
	 * // https://www.npmjs.com/package/string-natural-compare
	 */
	$.bsearch = function(item, value, compareFunction) {
		var low = 0;
		var high = item.length;
		var mid;

		if (compareFunction) {
			while (low < high) {
				mid = low + high >>> 1;
				var direction = compareFunction(item[mid], value);
				if (!direction) {
					return mid;
				}
				if (direction < 0) {
					low = mid + 1;
				} else {
					high = mid;
				}
			}
		} else {
			while (low < high) {
				mid = low + high >>> 1;
				if (item[mid] === value) {
					return mid;
				}
				if (item[mid] < value) {
					low = mid + 1;
				} else {
					high = mid;
				}
			}
		}

		return -1;
	};
	//Creates an array of elements split into groups the length of size. If collection can't be split evenly, the final chunk will be the remaining elements.
	$.chunk = function(array, chunk) {
		size = size || 1;

		var numChunks = Math.ceil(array.length / size);
		var result = new Array(numChunks);

		for (var i = 0, index = 0; i < numChunks; i++) {
			result[i] = chunkSlice(array, index, index += size);
		}

		return result;
	};
	/**
	 * Removes all elements from the array.
	 *
	 * @function Array#clear
	 *
	 * @example
	 * var array = [1, 2, 3];
	 * array.clear();
	 * console.log(array);
	 * // -> []
	 */
	$.clear = function(array) {
		array.length = 0;
		return array;
	};
	/**
	 * Creates a shallow copy of the array.
	 *
	 * @function Array#clone
	 * @returns {Array} A clone of the array.
	 *
	 * @example
	 * var a = [1, 2, 3];
	 * var b = a.clone();
	 * console.log(b, b === a);
	 * // -> [1, 2, 3] false
	 */
	$.clone = function(item) {
		return item.slice(0);
	};
	/**
	 * Returns a new array with all falsey values removed. Falsey values
	 * are `false`, `0`, `""`, `null`, `undefined`, and `NaN`.
	 *
	 * @function Array#compact
	 * @returns {Array} The new array containing only the truthy values from the original array.
	 *
	 * @example
	 * [0, 1, false, 2, '', 3].compact();
	 * // -> [1, 2, 3]
	 */
	$.compact = compact;
	//Sorts a list into groups and returns a count for the number of objects in each group.
	$.countBy = function(array, funct) {
		var object = {},
			item,
			len = array.length;
		for (var i = 0; i < len; i++) {
			item = array[i], results = funct(item);
			if (!object[results]) {
				object[results] = 0;
			}
			object[results] = object[results] + 1;
		}
		return object;
	};

	/*
 
 [4.3, 6.1, 6.4].countBy(function(n) {
   return n.floor();
 });
 
 //{ '4': 1, '6': 2 }
 
 
 */
	//create an array from a range
	$.createRange = function(array, start_arg, stop_arg, increment) {
		var stop = stop_arg ? stop_arg : start_arg,
			start = stop_arg ? start_arg : 0;
		for (var i = start; i < stop; i++) {
			if (increment) {
				if (i > 0) {
					var i = i - 1 + 5,
						i_check = i + increment;
				}
			}
			array.push(i);
			if (increment) {
				if (i_check == stop) {
					break;
				}
			}
		}
		return array;
	};

	//create an array from a range
	$.createRangeTo = function(array, start_arg, stop_arg, increment) {
		var stop = stop_arg ? stop_arg : start_arg,
			i,
			start = stop_arg ? start_arg : 0;
		for (var i = start; i <= stop; i++) {
			if (increment) {
				if (i > 0) {
					i = i - 1 + 5, i_check = i + increment;
				}
			}
			array.push(i);
			if (increment) {
				if (i_check == stop) {
					break;
				}
			}
		}
		return array;
	};
	//Creates an array excluding all values of the provided arrays using SameValueZero for equality comparisons.
	$.difference = function(array, compare) {
		var difference = [],
			len = array.length;
		for (var i = 0; i < len; i++) {
			var item = array[i],
				indexof = compare.indexOf(item);
			if (indexof == -1) {
				difference.push(item);
			}
		}
		return difference;
	};

	//Creates an array excluding all values of the arrays using SameValueZero for equality comparisons.
	$.differenceAll = function(array) {
		var len = array.length,
			subitem,
			item,
			difference = [];
		for (var i = 0; i < len; i++) {
			item = array[i], sub_len = item.length;
			for (var a = 0; a < sub_len; a++) {
				subitem = item[a], indexof = difference.indexOf(subitem);
				if (indexof == -1) {
					difference.push(subitem);
				} else {
					difference.splice(indexof, 1);
				}
			}
		}
		return difference;
	};
	//Creates a an array with elements taken from the beginning. Elements are taken until predicate returns falsey. The predicate is bound to thisArg and invoked with three arguments; (value, index, array).
	$.dropWhile = function(array, funct) {
		var temp = [],
			len = array.length;
		for (var i = 0; i < len; i++) {
			var item = array[i],
				condition = funct(item, i, array);
			if (!condition) {
				temp.push(item);
			}
		}
		return temp;
	};

	//Creates a an array with elements taken from the end. Elements are taken until predicate returns falsey. The predicate is bound to thisArg and invoked with three arguments; (value, index, array).
	$.dropRightWhile = function(array, funct) {
		var temp = [],
			item,
			len = array.length;
		for (var i = len - 1; i >= 0; i--) {
			item = array[i], condition = funct(item, i, array);
			if (!condition) {
				temp[i] = item;
			}
		}
		return temp;
	};

	//Removes elements from array corresponding to the given indexes and returns an array of the removed elements. Indexes may be specified as an array of indexes or as individual arguments.
	$.drop = function(array, amount) {
		return array.splice(amount, array.length);
	};

	//Removes elements from array corresponding to the given indexes (from right) and returns an array of the removed elements. Indexes may be specified as an array of indexes or as individual arguments.
	$.dropRight = function(array, amount) {
		return array.slice(0, array.length - amount);
	};
	//loop through array using for loop cached
	$.eachArray = _each_array;

	//loop through array using for loop cached but without returning data
	$.eachRaw = eachRaw;

	//loop through array backwards aka from the right
	$.eachRight = eachArrayFromRight;

	//loop through array using for loop cached
	$.eachDo = _each_array;

	//each while the check function is true
	$.eachWhile = _eachWhile;

	//loop while the returned result is true
	$.whileTrue = _whileTrue;

	//loop while the returned result is false
	$.whileFalse = _whileFalse;

	//loop while the count is less than the length of the array
	$.whileLength = _whileLength;

	/*
  Determines if the arrays are equal by doing a shallow comparison of their elements using strict equality.
 */
	$.isEqualArray = function(item, array) {
		if (array === item) {
			return true;
		}

		if (!array || array.length !== item.length) {
			return false;
		}

		for (var i = 0; i < array.length; i++) {
			if (array[i] !== item[i]) {
				return false;
			}
		}

		return true;
	};

	//Returns the first element of an array. Passing n will return the first n elements of the array.
	$.first = function(array, n) {
		if (n) {
			return array.splice(0, n);
		}
		return array[array.length - 1];
	};
	//returns the first false item
	$.firstFalse = function(array, funct) {
		var item,
			len = array.length;
		for (var i = 0; i < len; i++) {
			item = array[i];
			if (!funct(item)) {
				return item;
			}
		}
		return false;
	};
	//returns the first true item
	$.firstTrue = function(array, funct) {
		var item,
			len = array.length;
		for (var i = 0; i < len; i++) {
			item = array[i];
			if (funct(item)) {
				return item;
			}
		}
		return false;
	};
	//Flattens a nested array. Pass level to flatten up to a depth;
	$.flatten = function(item, level) {
		return flatten(item, level);
	};

	//Returns the composition of a list of functions, where each function consumes the return value of the function that follows. In math terms, composing the functions f(), g(), and h() produces f(g(h())).
	$.flow = function(array, args) {
		var len = array.length;
		return function() {
			for (var i = 0; i < len; i++) {
				args = array[i].apply(null, _isArray(args) ? args : [args]);
			}
			return args;
		};
	};

	//flowright is like flow except that it creates a function that invokes the provided functions from right to left.
	$.flowRight = function(array, args) {
		var len = array.length;
		return function() {
			for (var i = len - 1; i >= 0; i--) {
				args = array[i].apply(null, _isArray(args) ? args : [args]);
			}
			return args;
		};
	};

	/*
 
 var greet    = function(name){ return "hi: " + name; };
 var exclaim  = function(statement){ return statement.toUpperCase() + "!"; };
 [greet,exclaim].flow()('moe');
 
 function add(x, y) {
   return x + y;
 }
 
 function square(n) {
   return n * n;
 }
 
 var addSquare = [square, add].flowright();
 addSquare(1, 2);
 
 right will just allow you to reverse the order of the args
 
 */

	//Splits a collection into sets, grouped by the result of running each value through iteratee.
	$.groupBy = function(array, funct) {
		var object = {},
			item,
			results,
			len = array.length;
		for (var i = 0; i < len; i++) {
			item = array[i], results = funct(item);
			if (!object[results]) {
				object[results] = [];
			}
			object[results].push(item);
		}
		return object;
	};
	//Given a list, and an iteratee function that returns a key for each element in the list (or a property name), returns an object with an index of each item. Just like groupBy, but for when you know your keys are unique.
	$.indexBy = function(array, index) {
		var object = {},
			obj,
			i,
			len = array.length;
		for (i = 0; i < len; i++) {
			obj = array[i];
			object[obj[index]] = obj;
		}
		return object;
	};
	//Returns everything but the last entry of the array.
	$.initial = function(array, startFrom) {
		var temp = [],
			length = array.length - 1;
		for (var i = 0; i < length; i++) {
			temp[i] = array[i];
		}
		return temp;
	};

	//Computes the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays.
	/**
	 * Returns an new array that is the [set intersection](http://en.wikipedia.org/wiki/Intersection_(set_theory))
	 * of the array and the input array(s).
	 *
	 * @function Array#intersect
	 * @param {...Array} *arrays - A variable number of arrays.
	 * @returns {Array} The new array of unique values shared by all of the arrays.
	 *
	 * @example
	 * [1, 2, 3].intersect([2, 3, 4]);
	 * // -> [2, 3]
	 *
	 * [1, 2, 3].intersect([101, 2, 50, 1], [2, 1]);
	 * // -> [1, 2]
	 */
	$.intersect = function(array, args) {
		var result = [],
			numArgs = args.length;

		if (!numArgs) {
			return result;
		}

		next: for (var i = 0; i < array.length; i++) {
			var item = array[i],
				j;

			if (result.indexOf(item) < 0) {
				for (j = 0; j < numArgs; j++) {
					if (args[j].indexOf(item) < 0) {
						continue next;
					}
				}
				result.push(item);
			}
		}

		return result;
	};

	//Calls the method named by methodName on each value in the list. Any extra arguments passed to invoke will be forwarded on to the method invocation.
	$.invoke = function(array, method, args) {
		var temp = [],
			item,
			len = array.length;
		for (var i = 0; i < len; i++) {
			item = array[i];
			temp.push(item[method].apply(item, args));
		}
		return temp;
	};
	//checks if the array is empty
	$.isArrayEmpty = function(item) {
		return item.length === 0;
	};
	//get largest number from array
	$.largest = function(item) {
		return _math.max.apply(_math, item);
	};
	//Returns the last element of an array. Passing n will return the last n elements of the array.
	$.last = function(item, indexFrom) {
		return _arrayLastItem(item, indexFrom);
	};
	//start from begining of array using argument as index
	$.left = function(item, a) {
		return item[a];
	};
	/**
	 * Sorts an array in place using a numerical comparison algorithm
	 * (sorts numbers from lowest to highest) and returns the array.
	 *
	 * @function Array#numsort
	 * @returns {Array} The array this method was called on.
	 *
	 * @example
	 * var files = [10, 0, 2, 1];
	 * files.numsort();
	 * console.log(files);
	 * // -> [0, 1, 2, 3]
	 */
	$.numSort = function(item) {
		return item.sort(numericalCompare);
	};
	//Converts arrays into objects. Keys as this and values as first argument
	$.object = function(array, value) {
		var len = array.length,
			object = {};
		for (var i = 0; i < len; i++) {
			object[array[i]] = value[i];
		}
		return object;
	};
	//Split array into two arrays: one whose elements all satisfy predicate and one whose elements all do not satisfy predicate.
	$.partition = function(array, funct) {
		var temp_a = [],
			temp_b = [],
			item,
			len = array.length;
		for (var i = 0; i < len; i++) {
			item = array[i];
			if (funct(item)) {
				temp_a.push(item);
			} else {
				temp_b.push(item);
			}
		}
		return [temp_a, temp_b];
	};
	//extracting a list of property values to an array
	$.pluck = function(array, pluck_item) {
		var temp = [],
			item,
			len = array.length;
		for (var i = 0; i < len; i++) {
			item = array[i][pluck_item];
			if (item) {
				temp.push(item);
			}
		}
		return temp;
	};
	/**
	 * Sorts an array in place using a reverse numerical comparison algorithm
	 * (sorts numbers from highest to lowest) and returns the array.
	 *
	 * @function Array#rnumsort
	 * @returns {Array} The array this method was called on.
	 *
	 * @example
	 * var files = [10, 0, 2, 1];
	 * files.rnumsort();
	 * console.log(files);
	 * // -> [3, 2, 1, 0]
	 */
	$.rNumSort = function(array) {
		return array.sort(numericalCompareReverse);
	};
	/**
	 * Removes all occurrences of the passed in items from the array and returns the array.
	 *
	 * __Note:__ Unlike {@link Array#without|`.without()`}, this method mutates the array.
	 *
	 * @function Array#remove
	 * @param {...*} *items - Items to remove from the array.
	 * @returns {Array} The array this method was called on.
	 *
	 * @example
	 * var array = [1, 2, 3, 3, 4, 3, 5];
	 *
	 * array.remove(1);
	 * // -> [2, 3, 3, 4, 3, 5]
	 *
	 * array.remove(3);
	 * // -> [2, 4, 5]
	 *
	 * array.remove(2, 5);
	 * // -> [4]
	 */
	$.remove = function(array, args) {
		var remStartIndex = 0;
		var numToRemove = 0;

		for (var i = 0; i < array.length; i++) {
			var removeCurrentIndex = false,
				j;

			for (j = 0; j < args.length; j++) {
				if (array[i] === args[j]) {
					removeCurrentIndex = true;
					break;
				}
			}

			if (removeCurrentIndex) {
				if (!numToRemove) {
					remStartIndex = i;
				}
				++numToRemove;
			} else if (numToRemove) {
				array.splice(remStartIndex, numToRemove);
				i -= numToRemove;
				numToRemove = 0;
			}
		}

		if (numToRemove) {
			array.splice(remStartIndex, numToRemove);
		}

		return array;
	};
	//Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result.
	$.rest = function(array, n) {
		var array = this;
		if (n) {
			return array.first(n);
		}
		array.shift();
		return array;
	};
	//start from end array using a as index
	$.right = function(array, a) {
		return array[array.length - 1 - a];
	};
	//Produce a random sample from the list. Pass a number to return n random elements from the list. Otherwise a single random item will be returned.
	$.sample = function(array, set_amount) {
		var len = array.length - 1;
		if (set_amount) {
			var temp = [],
				random;
			for (var i = 0; i < set_amount; i++) {
				random = array.splice(Math.round(Math.random() * (array.length - 1)), 1)[0];
				if (random) {
					temp.push(random);
				}
			}
			return temp;
		}
		return array[Math.round(Math.random() * len)];
	};
	//shuffle an array and return a new array
	$.shuffle = function(arrayOG) {
		var temp = _toArray(arrayOG),
			array = [],
			i = 0,
			len = temp.length;
		while (i < len) {
			array.push(temp.splice(Math.round(Math.random() * (temp.length - 1)), 1)[0]);
			i++;
		}
		return array;
	};

	//get smallest number from array
	$.smallest = function(item) {
		return _math.min.apply(_math, item);
	};
	//Uses a binary search to determine the index at which the value should be inserted into the list in order to maintain the list's sorted order.
	$.sortedIndex = function(array, n) {
		var min = 0,
			item,
			len = array.length;
		for (var i = 0; i < len; i++) {
			item = array[i];
			if (n > item) {
				min = i;
			}
		}
		if (min > 0) {
			min = min + 1;
		}
		return min;
	};
	//sum of values in an array
	$.sumOf = function() {
		var array = this,
			sumof = 0,
			len = array.length;
		for (var i = 0; i < len; i++) {
			sumof = sumof + array[i];
		}
		return sumof;
	};
	//Creates a slice of array with n elements taken from the beginning.
	$.take = function(amount) {
		return this.slice(0, amount);
	};

	//Creates a slice of array with elements taken from the beginning. Elements are taken until predicate returns falsey. function args (value, index, array).
	$.takeWhile = function(funct) {
		var array = this,
			temp = [],
			item,
			len = array.length;
		for (var i = 0; i < len; i++) {
			item = array[i], condition = funct(item, i, array);
			if (condition) {
				temp.push(item);
			}
		}
		return temp;
	};

	//Creates a slice of array with n elements taken from the end.
	$.takeRight = function(amount) {
		var array = this;
		return array.splice(array.length - amount, amount);
	};

	//Creates a slice of array with elements taken from the end. Elements are taken until predicate returns falsey. function args (value, index, array).
	$.takeRightWhile = function(funct) {
		var array = this,
			temp = [],
			item,
			len = array.length;
		for (var i = len - 1; i >= 0; i--) {
			item = array[i], condition = funct(item, i, array);
			if (condition) {
				temp.unshift(item);
			}
		}
		return temp;
	};
	//Computes the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays.
	$.union = function(arrayOG) {
		var result = _uniq(arrayOG),
			array,
			i,
			j;

		for (i = 0; i < arguments.length; i++) {
			array = arguments[i];
			for (j = 0; j < array.length; j++) {
				if (result.indexOf(array[j]) < 0) {
					result.push(array[j]);
				}
			}
		}

		return result;
	};
	//Produces a duplicate-free version of the array, using === to test object equality.
	$.uniq = _uniq;
	//Returns a copy of the array with all instances of the values removed.
	$.without = function(array, args) {
		var result = [],
			i,
			j;

		next: for (i = 0; i < array.length; i++) {
			for (j = 0; j < arguments.length; j++) {
				if (array[i] === arguments[j]) {
					continue next;
				}
			}
			result.push(array[i]);
		}

		return result;
	};
	//Creates an array that is the symmetric difference of the provided arrays. See Wikipedia for more details.
	$.xor = function(arrayOG) {
		var numArgs = arguments.length,
			i,
			result;

		if (!numArgs) {
			return _uniq(arrayOG);
		}

		result = xorBase(arrayOG, arguments[0]);

		for (i = 1; i < numArgs; i++) {
			result = xorBase(result, arguments[i]);
		}

		return result;
	};

	//Merges together the values of each of the arrays with the values at the corresponding position.
	$.zip = function(array) {
		var len = array.length,
			args = _toArray(arguments),
			arguments_length = args.length,
			zip = [],
			i,
			a,
			zipped;
		for (i = 0; i < len; i++) {
			zipped = [];
			zipped.push(array[i]);
			for (a = 0; a < arguments_length; a++) {
				zipped.push(args[a][i]);
			}
			zip.push(zipped);
		}
		return zip;
	};
	//unzip the array of zipped arrays
	$.unZip = function(array) {
		var len = array.length,
			unzip = [],
			i,
			a,
			c,
			sub = array[0],
			sub_len = sub.length;

		for (i = 0; i < sub_len; i++) {
			unzip[i] = [];
		}
		for (a = 0; a < sub_len; a++) {
			for (c = 0; c < len; c++) {
				unzip[i].push(array[c][a]);
			}
			i++;
		}
		return unzip;
	};

	/*
 STRING Prototype object
 */
	//initialize
	var rawURLDecode_regex = /%(?![\da-f]{2})/gi,
		and_regex = /&/g,
		less_than_regex = /</g,
		more_than_regex = />/g,
		double_quote_regex = /"/g,
		slash_regex = /\//g;
	//get characters in a range in a string
	$.rangeString = function(text, start, end, insert) {
		var start_text = text.slice(0, start),
			end_text = text.slice(end, text.length),
			i = start_text + insert + end_text,
			start_text = null,
			text = null,
			insert = null,
			insert = null,
			end_text = null;
		return i;
	};
	//start index from last item
	$.lastString = function(text) {
		return text[text.length - 1];
	};
	//start index from right of string
	$.rightString = function(text, a) {
		return text[text.length - 1 - a];
	};
	//start index from right of string pollyfill
	$.endsWithString = function(subjectString, searchString, position) {
		if (position === undefined || position > subjectString.length) {
			position = subjectString.length;
		}
		position -= searchString.length;
		var lastIndex = subjectString.indexOf(searchString, position);
		return lastIndex !== -1 && lastIndex === position;
	};
	//replace a phrase (word) with a string from an array of strings
	$.replacePhrase = function(w, a) {
		if (_isArray(w)) {
			var w = w.join('|');
		} else if (isPlainObject(w)) {
			var f = this;

			for (var i = 0, keys = _object_keys(w), len = keys.length; i < len; i++) {
				var key = keys[i];
				var f = f.replacephrase(key, w[key]);
			}

			return f;
		} else {
			//replace word regex
			var replace_word = new RegExp('\\b' + w + '\\b', 'gi');
			return this.replace(replace_word, a);
		}
	};
	//replace a string with a string from an array of strings
	$.replaceList = function(a, r) {
		var s = this,
			len = a.length;
		for (var i = 0; i < len; i++) {
			var s = s.replace(a[i], r);
		}
		var a = null,
			r = null;
		return s;
	};
	//raw URL encode
	var _rawURLDecode = function _rawURLDecode(string) {
		return decodeURIComponent((string + '').replace(rawURLDecode_regex, function() {
			return '%25';
		}));
	};
	$.rawURLDecode = _rawURLDecode;
	//html entities
	var _htmlEntities = function _htmlEntities(string) {
		return string.replace(and_regex, '&amp;').replace(less_than_regex, '&lt;').replace(more_than_regex, '&gt;').replace(double_quote_regex, '&quot;').replace(slash_regex, '&quot;');
	};
	$.htmlEntities = _htmlEntities;
	//decode then htmlentities
	$.sanitize = function(string) {
		return _htmlEntities(_rawURLDecode(string));
	};
	//decode URI Component
	$.duc = function() {
		return decodeURIComponent(this);
	};
	//encode URI Component
	$.euc = function() {
		return encodeURIComponent(this);
	};

	//tokenize split by groups of characters that are not whitespace
	$.tokenize = function(string) {
		return string.match(/\S+/g) || [];
	};
	//match by alphanumeric+underscore
	$.words = function(string) {
		return string.match(/\w+/g);
	};
	//uppercase first letter lower case the rest
	$.ucFirst = _ucFirst;

	//uppercase first letter for all
	$.ucFirstAll = function(string) {
		var array = string.split(' '),
			len = array.length;
		for (var i = 0; i < len; i++) {
			var item = array[i];
			array[i] = item.charAt(0).toUpperCase() + item.substr(1);
		}
		return array.join(' ');
	};

	//uppercase first letter lower case the rest
	$.ucFirstOnly = function(string) {
		return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
	};

	//uppercase first letter lower case the rest all
	$.ucFirstOnlyAll = function(string) {
		var array = string.split(' '),
			len = array.length;
		for (var i = 0; i < len; i++) {
			var item = array[i];
			array[i] = item.charAt(0).toUpperCase() + item.substr(1).toLowerCase();
		}
		return array.join(' ');
	};

	//Returns the camel cased string
	$.camel = function(stringOriginal) {
		var string = $.ucfirstall.call(stringOriginal.replace(regex_underscore, ' ').replace(regex_dash, ' '));
		return (string.charAt(0).toLowerCase() + string.substr(1)).replace(regex_space_global, '');
	};

	//Returns the kebab cased string
	$.kebab = function(stringOriginal) {
		return stringOriginal.toLowerCase().replace(regex_underscore, ' ').replace(regex_space_global, '-');
	};

	//Returns the snake cased string
	$.snake = function(stringOriginal) {
		return stringOriginal.toLowerCase().replace(regex_dash, ' ').replace(regex_space_global, '_');
	};

	//returns the trunced version of the string
	$.truncate = function(stringOriginal, amount) {
		var string = stringOriginal,
			length = string.length;
		if (length > amount) {
			return string.slice(0, amount);
		}
		return string;
	};

	//returns the trunced version of the string starting from the right
	$.truncateLeft = function(stringOriginal, amount) {
		var string = stringOriginal,
			length = string.length;
		if (length > amount) {
			return string.substr(amount, length);
		}
		return string;
	};

	//returns the trunced version of the string
	$.truncateWord = function(stringOriginal, amount) {
		var string = stringOriginal,
			length = string.length;
		if (length > amount) {
			var stringLength = 0;
			var newString = '';
			var words = string.split(' ');
			var wordsLength = words.length;
			var item;
			var possibleNew;
			for (var i = 0; i < wordsLength; i++) {
				item = words[i] + ' ';
				possibleNew = item.length + stringLength;
				if (possibleNew < amount) {
					stringLength = possibleNew;
					newString = newString + item;
				} else {
					break;
				}
			}
			return newString.trim();
		}
		return string;
	};

	//repeat
	$.repeat = function(stringOriginal, amount) {
		if (!amount) {
			return '';
		}
		if (amount == 1) {
			return stringOriginal;
		}
		var string = stringOriginal,
			temp = string;
		for (var i = 1; i < amount; i++) {
			if (i > 0) {
				var temp = temp + string;
			}
		}
		return temp;
	};

	//add paramaters to a URL
	$.addParam = function(url, n) {
		var o = url,
			len = o.length;
		if (len > 0) {
			var last = o[len - 1];
			if (o.indexOf('?') != -1) {
				if (last != '?') {
					return o + '&' + n;
				} else if (last == '?') {
					return o + n;
				}
				return o + '&' + n;
			} else {
				return o + '?' + n;
			}
		} else {
			return '?' + n;
		}
	};
	/*
 Object prototype
 */
	//initilize object ptotoype extend object
	var object_extend = {};
	//clone an object ES6 + ES5
	$.cloneObject = (function() {

		function cloned_function() {}

		function clone_it(obj) {
			cloned_function.prototype = obj;
			return new cloned_function();
		}
		var clone = function clone() {
			return clone_it(this);
		};

		return clone;
	})();

	//copy an object ES6 + ES5
	$.copyObject = function(item) {
		return $merge(item, {});
	};

	//for loop
	$.eachObject = function(item, fn) {
		return _each_object(item, fn);
	};

	//checks if objects are the same ES6
	$.isEqualObject = _objectIs;
	//extend object prototype
	var _extend = function _extend(item, firstSource) {
		return $merge(item.prototype, firstSource);
	};

	$.extend = _extend;

	//merge object
	$.mergeObject = $merge;

	//copy an object ES6 + ES5
	$.stringify = function(item) {
		return stringify(item);
	};

	//Creates a function that accepts up to n arguments ignoring any additional arguments. The 2nd argument will be binded if none the initial new function will be.
	$.ary = function(funct, amount, bind) {
		var ary = function ary() {
			return funct.apply(bind || ary, _toArray(arguments).splice(0, amount));
		};
		return ary;
	};

	$.chain = function(funct, obj) {
		//chain functions together

		//add to chain
		if (funct.methods) {
			for (var i = 0, keys = _object_keys(obj), len = keys.length; i < len; i++) {
				var key = keys[i];
				var item = obj[key];
				funct.methods[key] = (function(item, key) {
					return function() {
						funct.results[key] = item.apply(item, _toArray(arguments));
						return funct.methods;
					};
				})(item, key);
			}
			return funct;
		}

		//create chain
		var chain = function chain() {
			chain.results.first = funct.apply(chain, _toArray(arguments));
			return chain.methods;
		};

		//remove chain item
		chain.removeChain = function(obj) {
			chain.results[obj] = null;
			return chain;
		};
		//remove all chains
		chain.removeAllChains = function() {
			chain.methods = {};
			return chain;
		};
		//return chain values
		chain.values = function(obj) {
			if (!obj) {
				return chain.results;
			}
			var array = [],
				chain_results = chain.results;
			for (var i = 0, keys = _object_keys(chain_results), len = keys.length; i < len; i++) {
				var key = keys[i];
				var item = chain_results[key];
				array.push(item);
			}
			return array;
		};
		//original function
		chain.original = function() {
			return funct.apply(chain, _toArray(arguments));
		};
		chain.results = {}; //chain results
		chain.methods = {}; //chain methods

		//add chained functions
		for (var i = 0, keys = _object_keys(obj), len = keys.length; i < len; i++) {
			var key = keys[i];
			var item = obj[key];
			chain.methods[key] = (function(item, key) {
				return function() {
					chain.results[key] = item.apply(item, _toArray(arguments));
					return chain.methods;
				};
			})(item, key);
		}

		//return new chained function
		return chain;
	};
	//short hand for request animation frame
	$.curry = function(funts) {
		var count = 0,
			args = [],
			argsLength = funts.length,
			curry = function curry() {
				args = _each_array(_toArray(arguments), function(item) {
					count++;
				});
				if (argsLength == count) {
					var value = funts.apply(funts, args);
					count = 0;
					args = [];
					return value;
				}
				return curry;
			};
		return curry;
	};

	/*
 
 	var curried=function(a,b,c){
 		return [a,b,c];
 	}.curry();
 
 	curried(1)(2)(3);
 	// → [1, 2, 3]
 
 	curried(1, 2)(3);
 	// → [1, 2, 3]
 
 	curried(1, 2, 3);
 	// → [1, 2, 3]
 
 */

	$.curryRight = function(funts) {
		var count = 0,
			args = [],
			argsLength = funts.length,
			curry = function curry() {
				_each_array(_toArray(arguments), function(item) {
					args.unshift(item);
					count++;
				});
				if (argsLength == count) {
					var value = funts.apply(curry, args);
					count = 0;
					args = [];
					return value;
				}
				return curry;
			};
		return curry;
	};

	/*
 
 	curried(1)(2)(3);
 	// → [1, 2, 3]
 
 	curried(1, 2)(3);
 	// → [1, 2, 3]
 
 	curried(1, 2, 3);
 	// → [1, 2, 3]
 
 */

	//Creates a function that negates the result of the predicate func. The func predicate is invoked with the this binding and arguments of the created function.
	$.negate = function(func) {
		return function() {
			if (func.apply(func, _toArray(arguments))) {
				return false;
			}
			return true;
		};
	};

	//Creates a function that is restricted to execute func once. Repeat calls to the function will return the value of the first call. The func is executed with the this binding of the created function.
	$.once = function(fn) {
		var value,
			amount = false;
		return function() {
			if (!amount) {
				amount = true;
				value = fn.apply(this, _toArray(arguments));
				fn = null; //null func to free up mem
			}
			return value;
		};
	};

	//Creates a function that executes func, with the this binding and arguments of the created function, only after being called n times.
	$.after = function(fn, amount) {
		var called_amount = 0,
			value = 0;
		return function() {
			if (amount < called_amount) {
				amount = 1;
				value = fn.apply(this, _toArray(arguments));
				fn = null; //null func to free up mem
			}
			return value;
		};
	};

	//Creates a function that executes func, with the this binding and arguments of the created function, only before being called n times.
	$.before = function(fn, amount) {
		var called_amount = 0,
			value = 0;
		return function() {
			if (amount > called_amount) {
				amount = 1;
				value = fn.apply(this, _toArray(arguments));
				fn = null; //null func to free up mem
			}
			return value;
		};
	};

	//Creates a function that invokes func with arguments arranged according to the specified indexes where the argument value at the first index is provided as the first argument, the argument value at the second index is provided as the second argument, and so on.
	$.reArg = function(funct, list) {
		return function() {
			return funct.apply(funct, _each_array(_toArray(arguments), function(item, index) {
				args.push(order[list[index]]);
			}));
		};
	};

	/*
 
 var rearg=(function(a, b, c) {
   return [a, b, c];
 },[1,2,0]);
 
 rearg(1,2,3);
 -> [2, 3, 1]
 
 
 */

	//debounce function
	$.debounce = function(original, time) {
		var timeout = false,
			fn = function fn() {
				if (timeout !== false) {
					clearTimeout(timeout);
				}
				var args = _toArray(arguments),
					boundTo = this;
				timeout = setTimeout(function() {
					original.apply(boundTo, args);
					timeout = false;
					args = null;
					boundTo = null;
				}, time);
			};
		fn.run = function() {
			if (timeout) {
				clearTimeout(timeout);
			}
			original.apply(this, _toArray(arguments));
		};
		fn.clear = function() {
			if (timeout) {
				clearTimeout(timeout);
				timeout = false;
			}
		};
		return fn;
	};

	//throttle function
	$.throttle = function(func, time) {
		var timeout = false,
			fn = function fn() {
				if (timeout !== false) {
					return false;
				}
				var args = _toArray(arguments);
				timeout = setTimeout(function() {
					func.apply(fn, args);
					args = null;
					timeout = false;
				}, time);
			};
		fn.clear = function() {
			clearTimeout(timeout);
			timeout = false;
		};
		fn.run = function() {
			clearTimeout(timeout);
			timeout = false;
			func.apply(fn, _toArray(arguments));
		};

		return fn;
	};

	//timer wrapper
	$.timer = function(fn, time) {
		return setTimeout(fn, time);
	};

	//timer wrapper
	$.interval = function(fn, time) {
		return setInterval(fn, time);
	};

	//async function call
	$.asyncFN = haspromise ? function(fnc) {
		_promise_async.then(fnc);
	} : function(fnc) {
		setTimeout(fnc, 0);
	};

	//wrap 2 functions 'this' is launched after the argument function(s)
	$.wrap = function(funct, object, bind) {
		if (_isFunction(object)) {
			return function() {
				var args = _toArray(arguments);
				return [object.apply(bind, args), funct.apply(bind, args)];
			};
		} else if (isPlainObject(object)) {
			for (var i = 0, keys = _object_keys(object), len = keys.length; i < len; i++) {
				var key = keys[i];
				object[key] = $.wrap.apply(funct, [object[key], bind]);
			}
		}
		return object;
	};

	//wrap 2 functions 'this' is launched before the argument function(s)
	$.wrapBefore = function(funct, object, bind) {
		if (_isFunction(object)) {
			return function() {
				var args = _toArray(arguments);
				return [funct.apply(bind, args), object.apply(bind, args)];
			};
		} else if (isPlainObject(object)) {
			for (var i = 0, keys = _object_keys(object), len = keys.length; i < len; i++) {
				var key = keys[i];
				object[key] = wrap_before.apply(funct, [object[key], bind]);
			}
		}
		return object;
	};
	//initilize number for Number prototype
	var number_extend = {};

	//is number zero
	$.isZero = function(item) {
		return item === 0;
	};
	//is strict equal to
	$.isNumberEqual = function(item, num) {
		return item === num;
	};
	//is In range of two numbers
	$.isNumberInRange = function(num, start, end) {
		if (end === _undefined) {
			var end = start,
				start = 0;
		}
		return num > start && num < end;
	};

	//Math.js math utilities
	(function() {
		//cache math functions
		var abs = _math.abs,
			acos = _math.acos,
			acosh = _math.acosh,
			asin = _math.asin,
			asinh = _math.asinh,
			atan = _math.atan,
			atanh = _math.atanh,
			atan2 = _math.atan2,
			cbrt = _math.cbrt,
			ceil = _math.ceil,
			clz32 = _math.clz32,
			cos = _math.cos,
			cosh = _math.cosh,
			exp = _math.exp,
			expm1 = _math.expm1,
			floor = _math.floor,
			fround = _math.fround,
			hypot = _math.hypot,
			imul = _math.imul,
			log = _math.log,
			log1p = _math.log1p,
			log10 = _math.log10,
			log2 = _math.log2,
			max = _math.max,
			min = _math.min,
			pow = _math.pow,
			random = _math.random,
			round = _math.round,
			sign = _math.sign,
			sin = _math.sin,
			sinh = _math.sinh,
			sqrt = _math.sqrt,
			tan = _math.tan,
			tanh = _math.tanh,
			trunc = _math.trunc;

		//add this and value
		$.add = function(number, value) {
			return number + value;
		};
		//minus this and value
		$.minus = function(number, value) {
			return number - value;
		};
		//divide this and value
		$.divide = function(number, value) {
			return number / value;
		};
		//multiple this and value
		$.multiple = function(number, value) {
			return number * value;
		};
		//The modulo function is the integer remainder of dividing this by value
		$.remainder = function(number, value) {
			return number % value;
		};
		//add 1
		$.increment = function(number) {
			return number + 1;
		};
		//minus 1
		$.deduct = function(number) {
			return number - 1;
		};
		//Returns the absolute value of a $.
		$.abs = abs;
		//Returns the arccosine of a $.
		$.acos = acos;
		//Returns the hyperbolic arccosine of a $.
		$.acosh = acosh;
		//Returns the arcsine of a $.
		$.asin = asin;
		//Returns the hyperbolic arcsine of a $.
		$.asinh = asinh;
		//Returns the arctangent of a $.
		$.atan = atan;
		//Returns the hyperbolic arctangent of a $.
		$.atanh = atanh;
		//Returns the arctangent of the quotient of its arguments.
		$.atan2 = atan2;
		//Returns the cube root of a $.
		$.cbrt = cbrt;
		//Returns the smallest integer greater than or equal to a $.
		$.ceil = ceil;
		//Returns the number of leading zeroes of a 32-bit integer.
		$.clz32 = clz32;
		//Returns the cosine of a $.
		$.cos = cos;
		//Returns the hyperbolic cosine of a $.
		$.cosh = cosh;
		//Returns Ex, where x is the argument, and E is Euler's constant (2.718…), the base of the natural logarithm.
		$.exp = exp;
		//Returns subtracting 1 from exp(x).
		$.expm1 = expm1;
		//Returns the largest integer less than or equal to a $.
		$.floor = floor;
		//Returns the nearest single precision float representation of a $.
		$.fround = fround;
		//Returns the square root of the sum of squares of its arguments.
		$.hypot = hypot;
		//Returns the result of a 32-bit integer multiplication.
		$.imul = imul;
		//Returns the natural logarithm (loge, also ln) of a $.
		$.log = log;
		//Returns the natural logarithm of 1 + x (loge, also ln) of a $.
		$.log1p = log1p;
		//Returns the base 10 logarithm of a $.
		$.log10 = log10;
		//Returns the base 2 logarithm of a $.
		$.log2 = log2;
		//Returns the largest of zero or more numbers.
		$.max = max;
		//Returns the smallest of zero or more numbers.
		$.min = min;
		//Returns base to the exponent power, that is, baseexponent.
		$.pow = pow;
		//Returns a random number between min (inclusive) and max (exclusive)
		$.randomArbitrary = function(number, min) {
			if (!min) {
				var min = 0;
			}
			return random() * (number - min) + min;
		};
		// Returns a random integer between min (included) and max (excluded)
		// Using Math.round() will give you a non-uniform distribution!
		$.randomInt = function(number, min) {
			if (!min) {
				var min = 0;
			}
			return floor(random() * (number - min)) + min;
		};
		//random wrapper
		$.random = random;
		//Returns the value of a number rounded to the nearest integer.
		$.round = round;
		//Returns the sign of the x, indicating whether x is positive, negative or zero.
		$.sign = sign;
		//Returns the sine of a $.
		$.sin = sin;
		//Returns the hyperbolic sine of a $.
		$.sinh = sinh;
		//Returns the positive square root of a $.
		$.sqrt = sqrt;
		//Returns the tangent of a $.
		$.tan = tan;
		//Returns the hyperbolic tangent of a $.
		$.tanh = tanh;
		//Returns the integral part of the number x, removing any fractional digits.
		$.trunc = trunc;
	})();

	//async launch an array of functions
	var asyncLaunch = function asyncLaunch(item) {
		_async(item);
	};
	$.async = function(fns) {
		if (_isFunction(fns)) {
			_async(fns);
		} else if (_isArray(fns)) {
			_each_array(fns, asyncLaunch);
		} else {
			_each_object(fns, asyncLaunch);
		}
	};

	var _cache = (function() {
		var cache_function = function cache_function(key, value) {
			if (!key) {
				return _cache;
			} else if (hasValue(value)) {
				return _cache[key] = value;
			}
			return _cache[key];
		};
		return cache_function;
	})();

	$.cache = _cache;

	//toggle a cache item with two values
	$.cacheToggle = function(key, a, b) {
		if (_cache[key] === a) {
			return _cache[key] = b;
		}
		return _cache[key] = a;
	};

	//console.log
	var _log = console.log,
		_consoleObject = console,
		acidConsole = function acidConsole(array, theme) {
			var preped = [array];
			if (theme) {
				preped[0] = '%c' + preped[0];
				preped.push(logThemes[theme] + "font-size:13px;padding:2px 5px;border-radius:3px;");
			}
			_log.apply(_consoleObject, preped);
		},
		generateLogTheme = function generateLogTheme(color, bg) {
			return 'color:' + color + ';background:' + bg + ';';
		},
		logThemes = {
			notify: generateLogTheme('#01c690', '#0e2a36'),
			warning: generateLogTheme('#ebb227', '#262626'),
			important: generateLogTheme('#ffe4ea', '#dc3153')
		},
		addTheme = function addTheme(name, color, bg) {
			logThemes[name] = generateLogTheme(color, bg);
		};
	$.console = acidConsole;
	$.addConsoleTheme = addTheme;

	var _each = function _each(object, funct, fn) {
		if (_isArray(object)) {
			var returned = _each_array(object, funct);
		} else if (isPlainObject(object)) {
			var returned = _each_object(object, funct);
		} else if (isNumber(object)) {
			var returned = _each_number(object, funct, fn);
		} else if (_isNodeList(object) || _isHTMLCollection(object)) {
			var returned = _each_array(_toArray(object), funct);
		} else {
			var returned = _each_object(object, funct);
		}
		return returned;
	};

	$.each = _each;

	//get property from string
	$.get = _find;
	//hasValue
	$.hasValue = hasValue;
	//indexof
	$.has = _has;
	//export all checking functions
	$.isArray = _isArray;
	$.isString = _isString;
	$.isNumber = isNumber;
	$.isObject = isObject;
	$.isPlainObject = isPlainObject;
	$.isFunction = _isFunction;
	$.isRegex = isRegex;
	$.isArgs = isArgs;
	$.isBool = isBool;
	$.isDate = isDate;
	$.isError = isError;
	$.isMap = isMap;
	$.isSet = isSet;
	$.isWeakMap = isWeakMap;
	$.isFloat32 = isFloat32;
	$.isFloat64 = isFloat64;
	$.isInt8 = isInt8;
	$.isInt16 = isInt16;
	$.isInt32 = isInt32;
	$.isUnit8 = isUnit8;
	$.isUnit8clamped = isUnit8clamped;
	$.isUnit16 = isUnit16;
	$.isUnit32 = isUnit32;
	$.isNative = isNative;
	$.isUndefined = isUndefined;
	$.isNaN = _isNaN;
	$.isInt = _isInt;
	$.isNull = isNull;
	$.isEmpty = isEmpty;
	$.isFileCSS = isFileCSS;
	$.isFileJSON = isFileJSON;
	$.isFileJS = isFileJS;
	$.hasDot = hasDot;
	$.getModelProperty = getModelProperty;
	$.getModelRootName = getModelRootName;

	function jsonWithCatch(str) {
		try {
			return json.parse(str);
		} catch (e) {
			return false;
		}
	}

	//convert from json string to json object cache it to use across lib
	$.json = jsonWithCatch;

	$.weakMap = function(items) {
		return new weak_map(items);
	};

	$.map = function(items) {
		return new _map(items);
	};

	var weakEvents, weakData;

	if (weak_map) {
		$.weakEvent = weakEvents = new weak_map();

		$.weakData = weakData = new weak_map();
	}

	/*
 
 Math Related cached functions
 
 */

	//Euler's constant and the base of natural logarithms, approximately 2.718.
	$.e = _math.E;
	//Natural logarithm of 2, approximately 0.693.
	$.ln2 = _math.LN2;
	//Natural logarithm of 10, approximately 2.303.
	$.ln10 = _math.LN10;
	//Base 2 logarithm of E, approximately 1.443.
	$.log2e = _math.LOG2E;
	//Base 10 logarithm of E, approximately 0.434.
	$.log10e = _math.LOG10E;
	//Ratio of the circumference of a circle to its diameter, approximately 3.14159.
	$.pi = _math.PI;
	//Square root of 1/2; equivalently, 1 over the square root of 2, approximately 0.707.
	$.sqrt1_2 = _math.SQRT1_2;
	//Square root of 2, approximately 1.414.
	$.sqrt2 = _math.SQRT2;
	var _model = (function() {
			//get model -> (bool) option for a lean model meaning no methods will be attached
			var model_function = function model_function(modelName, object, bool) {
				if (hasValue(object)) {
					var model = _model[modelName] = object;
					if (_isFunction(model)) {
						model = model.bind(model);
					} else if (isPlainObject(model)) {
						_each_object(model, function(item, key) {
							if (_isFunction(item)) {
								model[key] = item.bind(model);
							}
						});
					}
					model.modelName = modelName;
					return model;
				} else if (_has(modelName, '.')) {
					return _find(modelName, _model);
				}
				return _model[modelName];
			};
			return model_function;
		})(),
		buildArgumentsMethod = function buildArgumentsMethod(item) {
			if (_isString(item)) {
				item = _find(item, $);
			}
			return item;
		},
		requireAvailable = false,
		importScriptsAvailable = false,
		requireMethod = (function() {
			if (_global) {
				if (_global.require && !_global.importScripts) {
					return _global.require;
				} else if (_global.importScripts) {
					return _global.importScripts;
				}
			} else if (require) {
				return require;
			}
		})(),
		buildArgumentsRequireMethod = function buildArgumentsRequireMethod(item) {
			if (_isString(item)) {
				item = requireMethod(item);
			}
			return item;
		},
		define = function define(data) {
			var funct = data.invoke,
				modelName = data.name,
				argsRequire = data.require,
				args = _each_array(data['import'], buildArgumentsMethod),
				wrapFunct = (function() {
					var freshArgs;
					if (arguments.length > 0) {
						freshArgs = _toArray(args);
						pushApply(freshArgs, arguments);
					} else {
						freshArgs = args;
					}
					return funct.apply(wrapFunct, freshArgs);
				}).bind(wrapFunct);
			if (modelName) {
				_model[modelName] = wrapFunct;
			}
			if (argsRequire) {
				pushApply(args, _each_array(argsRequire, buildArgumentsRequireMethod));
			}

			return wrapFunct;
		};

	$.model = _model;
	$.define = define;

	//export native functions
	$.keys = _object_keys;
	$.getPropDescrip = _object_getOwnPropertyDescriptor;
	$.assign = _object_assign;
	/*
 		A service is an object that holds a set of processes that
 		can be added over time.
 		Then this service can run said processes.
 */

	var acidService = function acidService(name) {
			return acidService[name];
		},
		acidCreateService = function acidCreateService(name, optionalObjects) {
			var service = acidService[name] = {},
				serviceProcess = service.process = optionalObjects || {},
				serviceRun = service.run = function(optionalNameOfProcess) {
					if (optionalNameOfProcess) {
						serviceProcess[optionalNameOfProcess]();
					} else {
						_each_object(serviceProcess, function(item) {
							item();
						});
					}
				},
				serviceAdd = service.add = function(object) {
					_each_object(object, function(item, key) {
						serviceProcess[key] = item.bind(service);
					});
				},
				serviceEnd = service.end = function() {
					service = null;
					serviceProcess = null;
					serviceRun = null;
					serviceEnd = null;
					serviceAdd = null;
					service[name] = null;
				};
			_each_object(service, function(item, key) {
				if (_isFunction(item)) {
					service[key] = item.bind(service);
				}
			});
			_each_object(serviceProcess, function(item, key) {
				if (_isFunction(item)) {
					serviceProcess[key] = item.bind(service);
				}
			});
		};

	$.createService = acidCreateService;
	$.service = acidService;

	$.timerClear = function(number) {
		return clearTimeout(number);
	};

	$.intervalClear = function(number) {
		return clearInterval(number);
	};

	$.clearTimers = function() {
		//clear all timers
		var maxId = setTimeout(function() {}, 0);
		for (var i = 0; i < maxId; i++) {
			clearTimeout(i);
		}
	};

	$.clearIntervals = function() {
		//clear all timers
		var maxId = setInterval(function() {}, 1000);
		for (var i = 0; i <= maxId; i++) {
			clearInterval(i);
		}
	};
	//to array
	$.toArray = _toArray;

	$.toggle = function(value, a, b) {
		if (value === a) {
			return b;
		}
		return a;
	};
	//acid platform information
	$.lucy = {
		//lib name
		name: 'Lucy',
		//lib version
		version: 1,
		//platform type
		platform: 'stable'
	};
	//log out the ACID version
	acidConsole('Lucy v' + $.lucy.version + ' ' + $.lucy.platform, 'notify');

	return $;
};