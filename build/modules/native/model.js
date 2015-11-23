var _model = (() => {
        //get model -> (bool) option for a lean model meaning no methods will be attached
        var model_function = (modelName, object, bool) => {
            if (hasValue(object)) {
                var model = _model[modelName] = object;
                if (_isFunction(model)) {
                    model = model.bind(model);
                } else if (isPlainObject(model)) {
                    _each_object(model, (item, key) => {
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
    buildArgumentsMethod = (item) => {
        if (_isString(item)) {
            item = _find(item, $);
        }
        return item;
    },
    requireAvailable=false,
    importScriptsAvailable=false,
    requireMethod =(()=>{
        if(_global){
            if(_global.require && !_global.importScripts){
                return _global.require;
            }else if(_global.importScripts){
                return _global.importScripts;
            }
        }else if(require){
            return require;
        }
    })(),
    buildArgumentsRequireMethod = (item) => {
        if (_isString(item)) {
            item = requireMethod(item);
        }
        return item;
    },
    define = (data) => {
        var funct = data.invoke,
            modelName = data.name,
            argsRequire = data.require,
            args = _each_array(data.import, buildArgumentsMethod),
            wrapFunct = function() {
				var freshArgs;
				if (arguments.length > 0) {
					freshArgs = _toArray(args);
					pushApply(freshArgs, arguments);
				} else {
					freshArgs = args;
				}
				return funct.apply(wrapFunct, freshArgs);
            }.bind(wrapFunct);
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
