var modelMethod = $.model = (modelName, object) => {
		if (hasValue(object)) {
			modelMethod[modelName] = assignDeep(isFunction(object) ? bindTo(object, object) : bindAll(object, object, true), {
				_: {
					name: modelName
				}
			});
		}
		return find(modelName, modelMethod);
	},
	buildArgumentsMethod = (item) => {
		return isString(item) ? find(item, $) || find(item, modelMethod) : item;
	},
	requireMethod = (hasImport) ? importScripts : require,
	buildArgumentsRequireMethod = (item) => {
		return requireMethod(item);
	},
	define = $.define = (data, otherData) => {
		if (otherData) {
			if (isFunction(otherData)) {
				otherData = {
					invoke: otherData
				};
			}
			otherData.name = data;
			data = otherData;
		}
		var modelName = data.name,
			wrapFunct = bindTo(function () {
				var freshArgs = (data.import) ? mapArray(data.import, buildArgumentsMethod) : [],
					argsRequire = data.require;
				if (argsRequire) {
					pushApply(freshArgs, mapArray(isString(argsRequire) ? splitCall(argsRequire, ',') : argsRequire, buildArgumentsRequireMethod));
				}
				if (getLength(arguments)) {
					pushApply(freshArgs, arguments);
				}
				return apply(data.invoke, wrapFunct, freshArgs);
			}, wrapFunct);
		if (modelName) {
			modelMethod[modelName] = wrapFunct;
		}

		return wrapFunct;
	};
