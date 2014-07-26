
var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	gutil = require('gulp-util');

var coffeeSources = ['componentes/coffee/*.coffee'];

var jsSources = [
	'componentes/scripts/pixgrid.js',
	'componentes/scripts/rclick.js',
	'componentes/scripts/tagline.js',
	'componentes/scripts/template.js'
];

var sassSources = ['componentes/sass/style.scss'];

var htmlSources = ['builds/desarrollo/*.html'];

var jsonSources = ['builds/desarrollo/js/*.json'];

gulp.task('coffee', function(){
	gulp.src(coffeeSources)
	.pipe(coffee({bare:true})
	.on('error', gutil.log))
	.pipe(gulp.dest('componentes/scripts'));
});

gulp.task('js', ['coffee'], function(){
	gulp.src(jsSources)
	.pipe(concat('script.js'))
	.pipe(browserify())
	.pipe(gulp.dest('builds/desarrollo/js'))
	.pipe(connect.reload());
});

gulp.task('compass', function(){
	gulp.src(sassSources)
	.pipe(compass({
		sass: 'componentes/sass',
		image: 'builds/desarrollo/imagenes',
		style: 'expanded'
	})
	.on('error', gutil.log))
	.pipe(gulp.dest('builds/desarrollo/css'))
	.pipe(connect.reload());
});

gulp.task("html", function(){
	gulp.src(htmlSources)
	.pipe(connect.reload());
});

gulp.task("json", function(){
	gulp.src(jsonSources)
	.pipe(connect.reload());
});

gulp.task("connect", function(){
	connect.server({
		root: 'builds/desarrollo',
		livereload: true
	});
});

gulp.task("watch", function(){
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('componentes/sass/*.scss', ['compass']);
	gulp.watch(htmlSources, ['html']);
	gulp.watch(jsonSources, ['json']);
});

gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);