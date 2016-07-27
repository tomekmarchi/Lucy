var $ = (string, object) => {
		return find(string, object || modelMethod);
	},
	hasRequire = typeof require !== 'undefined',
	hasImport = typeof importScripts !== 'undefined';
