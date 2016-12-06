//make a promise
var contracts = $.contracts = {},
	contract = $.contract = (arry, name, callback) =>{
		if(!callback && !isArray(arry)){
			contracts[name][arry] = 1;
			contracts[name]();
			return;
		}
		var arrayLength = getLength(arry);
		var fn = contracts[name] = function () {
			var go = 0;
			eachArray(arry, (item) => {
				if (fn[item] === 1) {
					go = go + 1;
				}
			});
			//if amount of promises made were same as needed then launch callback
			if (go === arrayLength) {
				asyncMethod(callback);
				contracts[name] = null;
				return True;
			}
			return False;
		};
	};
