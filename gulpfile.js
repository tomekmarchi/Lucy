(function() {
    'use strict';
    var gulp = require('gulp'),
        beautify = require('gulp-beautify'),
        notify = require('gulp-notify'),
        concat = require('gulp-concat'),
        babel = require('gulp-babel'),
        //file locations in order
        locations = [
            'build/start/credits.js',
            'build/start/start.js',

			'build/modules/namespace.js',
            'build/modules/shared/*.js',
			'build/modules/helpers/*.js',

            'build/end/info.js',
			'build/modules/events/*.js',

            'build/modules/string/*.js',
            'build/modules/string/modules/*.js',

            'build/modules/array/*.js',
            'build/modules/array/modules/*.js',

            'build/modules/object/*.js',
            'build/modules/object/modules/*.js',

        	'build/modules/function/*.js',
            'build/modules/function/modules/*.js',

            'build/modules/number/*.js',
            'build/modules/number/modules/*.js',

            'build/modules/native/*.js',

            'build/end/documentReady.js',

            'build/end/end.js'
        ],
        locations_length = locations.length,
        //compile the acid library
        compile_acid = () => {
            gulp.src(locations)
                //compile source
                .pipe(concat('lucy.js'))
				.pipe(beautify({
					indent_size: 1,
					indent_with_tabs: true
				}))
                //make it fabulous
                .pipe(gulp.dest('compiled')).pipe(notify(function() {
                    return 'lucy Beautified Saved';
                })).pipe(concat('lucyMin.js')).pipe(babel({
					"plugins": [
						["transform-strict-mode", {
							"strict": false
						}]
					],
					"presets": ["babili"],
					comments: false,
					highlightCode:false,
					ast:false,
					compact: true,
					minified:true
				})).pipe(gulp.dest('compiled')).pipe(notify(() => {
                    return 'Lucy Minified Saved';
                }));

        };
    //compile acid
    gulp.task('scripts', () => {
        return compile_acid();
    });
    //start livereload
    gulp.task('default', ['scripts'], () => {
        //watch files then compile and notify lr
        gulp.watch(locations, (event) => {
            compile_acid(event);
        });
    });
})();
