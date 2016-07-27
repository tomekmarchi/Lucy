return $;
};
(function(){
	var isNode = typeof exports === "object" && typeof module !== "undefined";
	if (isNode) {
		module.exports = lucy;
	}
})();
