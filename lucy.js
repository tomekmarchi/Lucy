(function(self,$$$) {
	
	var and=/&/g,
		less=/</g,
		more=/>/g,
		dq=/"/g,
		andt='&amp;',
		lesst='&lt;',
		moret='&gt;',
		dqt='&quot;',
		gen=function(tag,attr,inner){
			return '<'+tag+' '+attr+'>'+inner+'</'+tag+'>';	
		},
		$=function(tag,attr,inner){
			return gen.apply(null, [tag,attr,inner]);
		},
		autogen=function(tag){
		return function(attr,inner){
				return gen(tag,attr,inner);
			};
		};
	
	self[$$$] = $;
	
	self.tag=function(tag,inner){
		return gen(tag,'',inner);	
	};
	
	self.li=autogen('li');
	self.div=autogen('div');
	self.a=autogen('a');
	self.option=autogen('option');
	self.article=autogen('article');
	
	self.ent=function(str){
		var str=String(str).replace(and, andt).replace(less, lesst).replace(more, moret).replace(dq, dqt);
		return str;
	};
	
	self.loop=function(array,fun){
		var len=array.length,
			data='';
		for (var i = 0; i < len; i++) {
			var data=data+fun(array[i],i);
		}
		var array=null,
			len=null;
		return data;
	};
	
	self.intloop=function(i,len,fun){
		var data='';
		for (var i=i; i <= len; i++) {
			var data=data+fun(i);
		}
		var array=null,
			len=null;
		return data;
	};
	
	String.prototype.html=function(data){
			var e=this,
				attr=data.attr,
				set=data.set,
				html=data.html || '',
				items='';
				
			if(attr){
				for (var i in attr){
					if (!attr.hasOwnProperty(i)){continue;}
					var items=items+' '+i+'="'+attr[i]+'"';
				}
			}
			
			if(set){
				for (var i in set){
					if (!set.hasOwnProperty(i)){continue;}
					e.setattr('data-'+i,set[i]);
					var items=items+' data-'+i+'="'+set[i]+'"';
				}
			}
			
			return '<'+e+' '+items+'>'+html+"</"+e+">";
	};

}(self,'$'));

(function ($arr, $object, $fn, $strng, $j) {
	"use strict";
	//regex
	var $a = /^.[\w_-]+$/,
		$b = /^[A-Za-z]+$/,
		$c = /\s/,
		$cb = /\{(.*?)\}/g,
		//objects
		//bool
		$t = true,
		$f = false,
		//null
		$n = null,
		//strngs
		$p = 'prototype',
		//cache vars
		//native objs
		$m = Math,
		//prototypes
		$arrp = $arr[$p],
		$strngproto = $strng[$p],
		$debug=$f,//debug option
		$viewcmd={},//store the views
		$temp={},//store internal data for selectors
		$ext={//extend options
			xhr:{
				loaded:function (evt) {
					if($debug){
						evt.log();
					}
					var xhr = evt.target;
					xhr.eventremove('load', $ext.xhr.loaded);
					var status = evt.target.status;
					if (status == 200) {
						var type = xhr.getResponseHeader('content-type'),
							data = xhr.responseText;
						if (type == 'application/json') {
							if (data) {
								var data = data.json();
							}
						}
						var callback = xhr.call;
						if (callback) {
							callback.async(data);
						}
					}
					if (status > 200) {
						var callback = xhr.fail;
						if (callback) {
							callback.async();
						}
					}
					return $f;
				}	
			},
			preload:{
				loaded:function (evt) {
					var xhr = evt.target;
					xhr.eventremove('load', $ext.preload.loaded);
					var status = evt.target.status;
					if (status == 200) {
						var callback = xhr.call,
							data = xhr.responseText;
						if (callback) {
							callback.async(data);
						}
					}
					var xhr = $n,
						evt = $n,
						callback = $n;
					return $f;
				},
				error:function (evt) {
					var xhr = evt.target;
					xhr.eventremove('error', $ext.preload.error);
					var status = evt.target.status;
					var fail = xhr.fail;
					if (fail) {
						fail.async(status);
					}
					var xhr = $n,
						evt = $n;
					return $f;
				}
			}
		},
		//array
		$toarray = function (nodes) {
			var arr = [];
			for (var i = -1, l = nodes.length; ++i !== l; arr[i] = nodes[i]);
			return arr;
		},
		$isarray = $arr.isArray,
		//strng
		$strngis = function (str) {
			return (str) ? str.constructor === String : str;
		},
		//hasval fn
		hasvalfn = function (n) {
			if (n === false) {
				return false;
			}
			return n !== undefined;
		};
		
		var $number = {
			isempty: function () {
				return $f;
			},
			iszero: function () {
				return this === 0;
			}
		};
		
		//ww
		var $strng = {
			addparam:function(n){
				var o=this;
				if(o.length>0){
					if(o.indexOf('?') != -1){
						return o+'&'+n;
					}
					else{
						return o+'?'+n
					}
				}else{
					return '?'+n
				}
			},
			//cache
			cache: function (i) {
				var o = this;
				if (hasvalfn(i)) {
					return $.cache[o] = i;
				}
				return $.cache[o];
			},
			isempty: function () { //is string empty
				return this.trim().length === 0;
			},
			replacelist: function (a, r) {//replace a string with a string from an array of strings
				var s = this,
					len = a.length;
				for (var i = 0; i < len; i++) {
					var s = s.replace(a[i], r);
				}
				var a = $n,
					r = $n;
				return s;
			},
			last: function () {
				var i = this;
				return i[i.length - 1];
			},
			right: function (a) {
				var i = this;
				return i[i.length - 1 - a];
			},
			//get property form string
			get: function (i) {
				return $find(this, i) || $f;
			},
			//xhr
			xhr: function (data) {
				var xhr, url = this,
					args = data.args || '',
					type = data.type,
					content = data.content,
					callback = data.call,
					fail = data.fail,
					abort = data.abort,
					progress = data.progress,
					xhr = new XMLHttpRequest();

				if (callback) {
					xhr.call = callback;
				}
				if (fail) {
					xhr.eventadd('error', fail);
				}
				if (progress) {
					xhr.eventadd('progress', progress);
				}
				if (abort) {
					xhr.eventadd('abort', abort);
				}
				xhr.call=callback;
				xhr.eventadd('load', $ext.xhr.loaded);
				
				
				xhr.open(type, url, $t);
				if (!content) {
					if (type == 'GET') {
						var ctype = 'text/plain';
					} else {
						var ctype = "application/x-www-form-urlencoded";
					}
				}
				xhr.setRequestHeader("Content-type", ctype);
				xhr.send(args);
				var xhr = $n,
					url = $n,
					args = $n,
					type = $n,
					content = $n,
					callback = $n,
					c = $n,
					a = $n;
				return $f;
			},
			//set promise
			promised: function (fn) {
				var promval = $ext.promise.fn,
					val = promval[fn];
				val[this] = 1;
				if (promval) {
					var funn = val();
					if (funn) {
						$ext.promise.fn[fn] = $n;
					}
				}
				var item = $n,
					fun = $n,
					funn = $n;
				return $f;
			},
			//search string return $t or $f
			has: function (srch) {
				return this.indexOf(srch) != -1;
			},
			//URI component
			duc: function () {
				return decodeURIComponent(this);
			},
			euc: function () {
				return encodeURIComponent(this);
			},
			//create node
			tag: function () {
				return $d.createElement(this);
			},
			//convert to json
			json: function () {
				return $j.parse(this);
			},
			//build into HTML
			html: function (data) {
				var e = this,
					attr = data.attr,
					set = data.set,
					html = data.html || '',
					items = '';
				if (attr) {
					for (var i in attr) {
						if (!attr.hasOwnProperty(i)) {
							continue;
						}
						var items = items + ' ' + i + '="' + attr[i] + '"';
					}
				}
				if (set) {
					for (var i in set) {
						if (!set.hasOwnProperty(i)) {
							continue;
						}
						e.setattr('data-' + i, set[i]);
						var items = items + ' data-' + i + '="' + set[i] + '"';
					}
				}
				return '<' + e + ' ' + items + '>' + html + "</" + e + ">";
			}
		},
		$array = {
			smallest: function () {
				return $m.min.apply($m, this);
			},
			largest: function () {
				return $m.max.apply($m, this);
			},
			cache: function () {
				var o = this,
					a = arguments;
				if (a) {
					return a.
					for (function (item, i) {
						return o[i].cache(item);
					});
				}
				return o.
				for (function (item, i) {
					return item.cache();
				});
			},
			setview: function () {
				var o = this,
					a = arguments,
					len = o.length;
				for (var i = 0; i < len; i++) {
					o[i].setview(a[i]);
				}
				return $f;
			},
			isempty: function () { //conatins a value
				return (this.compact()[0]) ? $f : $t;
			},
			compact: function () { //remove null values
				return this.filter(Boolean);
			},
			last: function () {
				var i = this;
				return i[i.length - 1];
			},
			right: function (a) {
				var i = this;
				return i[i.length - 1 - a];
			},
			for :function (fn) {
				var array = this,
					len = array.length;
				for (var i = 0; i < len; i++) {
					array[i] = fn(array[i], i);
				}
				return array;
			},
			async: function () { //async on an array
				var fns = this,
					len = fns.length;
				for (var i = 0; i < len; i++) {
					fns[i].timer(0);
				}
				var len = $n;
				return $f;
			},
			promise: function (name, fun) {
				var arry = this;
				$ext.promise.fn[name] = function () {
					var len = arry.length,
						fn = $ext.promise.fn[name],
						go = 0;
					for (var i = 0; i < len; i++) {
						var item = fn[arry[i]];
						if (item == 1) {
							var go = go + 1;
						}
					}
					if (go == len) {
						fun.timer(0);
						$ext.promise.fn[name] = null;
					}
					return $f;
				}
			}
		},
		$bool = {
			isempty: function () {
				return this === $f;
			}
		},
		$obj = {
			post:function(){
				self.postMessage(this);
			},
			//console.log
			log:function(){
				var data={
					event:'console',
					logit:this
				}.post();
				return $f;
			},
			//for loop
			for :function (fn) {
				var a = this;
				for (var key in a) {
					if (!a.hasOwnProperty(key)) {
						continue;
					}
					fn(a[key], key, a);
				}
				return a;
			},
			//merge object
			merge: function (c) {
				this.
				for (function (item, key, og) {
					if (c[key]) {
						if (c[key].isobj()) {
							c[key] = c[key].merge(item);
							return;
						}
					}
					c[key] = item;
				});
				return c;
			},
			//add event
			eventadd: function (n, i, c) {
				this.addEventListener(n, i, c || $f);
				return this;
			},
			//remove event
			eventremove: function (n, i, c) {
				this.removeEventListener(n, i, c || $f);
				return this;
			},
			//extend object prototype
			extend: function (a) {
				var obj = this.prototype;
				if (!a) {
					return obj;
				}
				for (var key in a) {
					if (!a.hasOwnProperty(key)) {
						continue;
					}
					var root = obj[key],
						suba = a[key];
					for (var subkey in suba) {
						if (!suba.hasOwnProperty(subkey)) {
							continue;
						}
						root[subkey] = suba[subkey];
					}
				}
			},
			isarray: function () { // is this an array
				return $isarray(this);
			},
			isstring: function () { //isstring
				return this.constructor === String;
			},
			isnull: function () { //conatins a value
				return this === $n;
			},
			isobj: function () { //is plain object
				return this.constructor.toString().slice(9, 16) == 'Object(';
			},
			isfn:function(){
				return this instanceof Function;
			},
			isempty: function () { //conatins a value for objects
				var o = this;
				for (i in o) {
					if (!o.hasOwnProperty(i)) {
						continue;
					}
					return false;
				}
				return true;
			},
		};
				
		//Function
		var $functions = {
			//timer wrapper
			timer: function (time, args) {
				var fun = this;
				return setTimeout(function () {
					fun.apply($n, args);
					fun = $n;
					args = $n;
					return $f;
				}, time);
			},
			//asunc function
			async: function () {
				var fnc = this;
				fnc.timer(0, arguments);
				return $f;
			}
		};
		
		var extend = function (obj, ext, wrap) {
			for (var key in obj) {
				if (!obj.hasOwnProperty(key)) {
					continue;
				}
				if (wrap) {
					ext[key] = wrap(obj[key]);
				} else {
					ext[key] = obj[key];
				}
			}
		};
		
	//export function
	self.lucy = {};
	
	//js cache
	$.cache = {};
	//sys cache
	$.mem = {};
	//return temp obj
	$.temp = $temp;
	//get what has been imported
	$.debug=function(i){//turn on logs
		$debug=i;
	};
	//xhr functions 
	$.xhr = {};
	//hasvalue
	$.hasvalue = hasvalfn;
	//sys info 
	
	extend($obj, $object[$p]); //objects
	extend($array, $arr[$p]); //array
	extend($strng, $strngproto); //string
	extend($number, Number[$p]); //function
	extend($functions, $fn[$p]); //function
	extend($bool, Boolean[$p]); //Boolean
			
})(Array, Object, Function, String, JSON);