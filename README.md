lucy
=======
Acidjs for Node and webworkers. Lucy is a trimmed down version of Acidjs without DOM and browser specific methods.

What is Acid?
=======
Acidjs is an ECMA script utility library for building scalable real-time self-constructing SPAs(single-page applications). What I call an autonomous web app (AWA). Acid embraces a highly modular philosophy in which all files of the system are split up, organized, and called individually when absolutly required. Think of a bridge being formed in front of you while walking across.

Strings,Objects & Arrays
-----------------------
	const lucy = require('lucy')(global);

Strings,Objects & Arrays
-----------------------
All methods for Strings,Objects and Arrays are available from the root object typically assigned as $.

Model & Define
-----------------------
In Lucy everything is a model (Simple plain objects). Models can be "define" which are compiled models for immediately available objects with built-in import capabilities for scripts only. Define uses inherent import methods such as require (NODE) & importScripts (webworkers). Therefore they are seen as synchronous only.

JS

    $.model('post',{
    	like:(node,event) => {
    		console.log('Post Liked');
    	},
    	other:(node,event) => {
    		console.log('other event launched');
    	}
    });
    //returns an async module
    $.define('moduleName',{
    	import:['testModel.js'],
    	import:(testModel) => {
    		var {each,eachObject} = $;
    		each([1,2,3],(item,index)=>{
    			console.log(item,index);
    		});
    	}
    })();
