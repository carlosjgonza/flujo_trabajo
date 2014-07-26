
var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	gulpuglify = require('gulp-uglify'),
	gutil = require('gulp-util');

var env,
	coffeeSources,
	jsSources,
	sassSources,
	htmlSources,
	jsonSources,
	sassStyle,
	outputDir;

env = process.env.NODE_ENV || 'desarrollo';

if(env==='desarrollo'){
	outputDir = 'builds/desarrollo/';
	sassStyle = 'expanded';
}
else{
	outputDir = 'builds/produccion/';
	sassStyle = 'compressed';
}

coffeeSources = ['componentes/coffee/*.coffee'];

jsSources = [
	'componentes/scripts/pixgrid.js',
	'componentes/scripts/rclick.js',
	'componentes/scripts/tagline.js',
	'componentes/scripts/template.js'
];

sassSources = ['componentes/sass/style.scss'];

htmlSources = [outputDir + '*.html'];

jsonSources = [outputDir + 'js/*.json'];

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
	.pipe(gulpif(env ==='produccion', gulpuglify()))
	.pipe(gulp.dest(outputDir+'js'))
	.pipe(connect.reload());
});

gulp.task('compass', function(){
	gulp.src(sassSources)
	.pipe(compass({
		sass: 'componentes/sass',
		image: outputDir+'imagenes',
		style: sassStyle
	})
	.on('error', gutil.log))
	.pipe(gulp.dest(outputDir+'css'))
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
		root: outputDir,
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