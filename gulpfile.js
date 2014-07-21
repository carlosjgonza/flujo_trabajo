
var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	gutil = require('gulp-util');

var coffeeSources = ['componentes/coffee/*.coffee'];

var jsSources = [
	'componentes/scripts/pixgrid.js',
	'componentes/scripts/rclick.js',
	'componentes/scripts/tagline.js',
	'componentes/scripts/template.js'
];

gulp.task('coffee', function(){
	gulp.src(coffeeSources)
	.pipe(coffee({bare:true})
	.on('error', gutil.log))
	.pipe(gulp.dest('componentes/scripts'));
});

gulp.task('js', function(){
	gulp.src(jsSources)
	.pipe(concat('script.js'))
	.pipe(browserify())
	.pipe(gulp.dest('builds/desarrollo/js'));
});