
var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	gutil = require('gulp-util');

var coffeeSources = ['componentes/coffee/*.coffee'];

var jsSources = [
	'componentes/scripts/pixgrid.js',
	'componentes/scripts/rclick.js',
	'componentes/scripts/tagline.js',
	'componentes/scripts/template.js'
];

var sassSources = ['componentes/sass/style.scss'];

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

gulp.task('compass', function(){
	gulp.src(sassSources)
	.pipe(compass({
		sass: 'componentes/sass',
		image: 'builds/desarrollo/imagenes',
		style: 'expanded'
	})
	.on('error', gutil.log))
	.pipe(gulp.dest('builds/desarrollo/css'));
});