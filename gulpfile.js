var gulp = require('gulp'),
    jade = require('gulp-jade'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    gulpif = require('gulp-if');

var env = process.env.NODE_ENV || 'development';//SET NODE_ENV=PRODUCTION enter

var outputDir  = '';

if(env == 'development'){
    outputDir = 'builds/development';
}else{
    outputDir = 'builds/production';
}

gulp.task('jade', function(){
    return gulp.src('src/templates/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload());
});

gulp.task('js',function(){
    return browserify('src/js/main',{ debug: env === 'development' })
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulpif(env === 'production',streamify(uglify())))
        .pipe(gulp.dest(outputDir + '/assets/js'))
        .pipe(connect.reload());
});

gulp.task('sass',function(){
    var config = {};
    if (env === 'development'){
        config.sourceComments = 'map';
    }
    if (env === 'production'){
        config.outputStyle = 'compressed';
    }

    return gulp.src('src/sass/*.sass')
        .pipe(sass(config))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
         }))
        .pipe(gulp.dest(outputDir + '/assets/css'))
        .pipe(connect.reload());
});

gulp.task('watch',function() {
    gulp.watch('src/templates/**/*.jade',['jade']);
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/sass/**/*.sass',['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: [outputDir],
    livereload: true,
    port:3000
  });
});

gulp.task('default',['js','jade','sass','watch','connect']);
