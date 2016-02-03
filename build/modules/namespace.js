var $ = (string) => {
        return find(string);
    },
	hasRequire=typeof require !== 'undefined',
	hasImport=typeof importScripts !== 'undefined',
	isNode=typeof module !== 'undefined' && module.exports;
//avoid
if (isNode) {
    global.$ = $;
    global.ACID = $;
}
