var modelMethod = (modelName, object, bool) => {
        if (hasValue(object)) {
            var model = modelMethod[modelName] = object;
            if (isFunction(model)) {
                model = model.bind(model);
            } else if (isPlainObject(model)) {
                eachObject(model, (item, key) => {
                    if (isFunction(item)) {
                        model[key] = item.bind(model);
                    }
                });
            }
            model.modelName = modelName;
            return model;
        } else if (hasDot(modelName)) {
            return find(modelName, modelMethod);
        }
        return modelMethod[modelName];
    },
    buildArgumentsMethod = (item) => {
        if (isString(item)) {
            item = find(item, $);
        }
        return item;
    },
    requireMethod = (() => {
		if (hasImport) {
			return importScripts;
		} else if (hasRequire) {
			return require;
		}
    })(),
    buildArgumentsRequireMethod = (item) => {
        if (isString(item)) {
            item = requireMethod(item);
        }
        return item;
    },
    define = (data) => {
        var funct = data.invoke,
            modelName = data.name,
            argsRequire = data.require,
            args = eachArray(data.import, buildArgumentsMethod),
            wrapFunct = function() {
                var freshArgs;
                if (getLength(arguments)) {
                    freshArgs = toArray(args);
                    pushApply(freshArgs, arguments);
                } else {
                    freshArgs = args;
                }
                return funct.apply(wrapFunct, freshArgs);
            }.bind(wrapFunct);
        if (modelName) {
            modelMethod[modelName] = wrapFunct;
        }
        if (argsRequire) {
            pushApply(args, eachArray(argsRequire, buildArgumentsRequireMethod));
        }

        return wrapFunct;
    };

$.model = modelMethod;
$.define = define;
