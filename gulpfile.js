(function () {
	'use strict';
	var gulp = require('gulp'),
		babel = require('gulp-babel'),
		beautify = require('gulp-beautify'),
		uglify = require('gulp-uglify'),
		notify = require('gulp-notify'),
		concat = require('gulp-concat'),
		gulpif = require('gulp-if');


	//file locations
	var locations = [
	//begin
	//comment info
	'build/start/credits.js',
	//seaf function open
	'build/start/start.js',
	//shared vars across seaf
	'build/shared/vars/*.js',
	'build/shared/modules/*.js',
	'build/shared/modules/**/*.js',
	//namespace
	'build/namespace.js',
	//array prototype
	'build/modules/array/array.js',
	//array prototype modules
	'build/modules/array/modules/*.js',
	//string prototype
	'build/modules/string/string.js',
	//string prototype modules
	'build/modules/string/modules/*.js',
	//object prototype
	'build/modules/object/object.js',
	//object prototype
	'build/modules/object/modules/*.js',
	//function prototype
	'build/modules/function/functions.js',
	//function prototype modules
	'build/modules/function/modules/*.js',
	//number prototype
	'build/modules/number/number.js',
	//number prototype modules
	'build/modules/number/modules/*.js',
	//for acid specific modules
	'build/modules/acid/*.js',
	//modules that deal with native objects
	'build/modules/native/*.js',
	//get system info
	'build/end/info.js',
	//seaf function close
	'build/end/end.js'],
	locations_length=locations.length;
	//compile the acid library
	function compile_acid() {
		return gulp.src(locations)
		//compile source
		.pipe(concat('lucy.js'))
		.pipe(babel({
			blacklist: ["strict"],
			compact: false
		})).pipe(notify(() => {
			return 'lucy Babeled';
		}))
		//make it fabulous
		.pipe(beautify({
			indent_size: 4,
			indent_char: '	',
			indent_with_tabs: true
		}))
		//make it dirty and min it
		.pipe(gulp.dest('compiled'))
		.pipe(uglify({
			compress: true,
			join_vars: true
		}))
		.pipe(concat('lucy_min.js'))
		//we done bois
		.pipe(gulp.dest('compiled')).pipe(notify(function(){
			return 'lucy COMPILED';
		}));
	}
	//compile acid
	gulp.task('scripts', function () {
		return compile_acid();
	});
	//start livereload
	gulp.task('default', ['scripts'], function () {
		//watch files then compile and notify lr
		gulp.watch(locations, function (event) {
			compile_acid(event);
		});
	});
})();
