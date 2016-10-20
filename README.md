# gulp-jade-sass-seed :v:

## Descripción
Projecto base para templates paginas web (jade, sass, js)

## Dependencias
### Lista de dependencias
| Nombre                                                                   | Versión |
| ------------------------------------------------------------------------ | ------- |
| [Gulp](https://www.npmjs.com/package/gulp)                               | 3.9.0   |
| [Autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)          | 3.1.0   |
| [Connect](https://www.npmjs.com/package/gulp-connect)                    | 2.2.0   |
| [If](https://www.npmjs.com/package/gulp-if)                              | 2.0.0   |
| [Jade](https://www.npmjs.com/package/gulp-jade)                          | 1.1.0   |
| [Sass](https://www.npmjs.com/package/gulp-sass)                          | 2.1.0   |
| [Streamify](https://www.npmjs.com/package/gulp-streamify)                | 1.0.2   |
| [Uglify](https://www.npmjs.com/package/gulp-uglify)                      | 1.5.1   |
| [Vinyl Source Stream](https://www.npmjs.com/package/vinyl-source-stream) | 1.1.0   |
| [Browserify](https://www.npmjs.com/package/browserify)                   | 12.0.1  |

## Clonar repositorio
```
git clone https://github.com/devnido/gulp-jade-sass-seed.git
```

##Entrar en la carpeta del proyecto
```
cd gulp-jade-sass-seed
```

## Instalar dependencias globales
```
npm install -g gulp
```

## Instalar dependencias locales
```
npm install
```

## Ejecutar
```
gulp
```

##Detalle Tareas (task)
###jade
Compila archivos .jade a .html
```javascript
gulp.task('jade', function(){
    return gulp.src('src/templates/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload());
});
```

###javascript
concatena los archivos js y minifica utilizando Browserify
```javascript
gulp.task('js',function(){
    return browserify('src/js/main',{ debug: env === 'development' })
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulpif(env === 'production',streamify(uglify())))
        .pipe(gulp.dest(outputDir + '/assets/js'))
        .pipe(connect.reload());
});
```

###sass
Compila, concatena y minifica sass a css
```javascript
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
```

###watch
Observa cambios en los archivos
```javascript
gulp.task('watch',function() {
    gulp.watch('src/templates/**/*.jade',['jade']);
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/sass/**/*.sass',['sass']);
});
```

###connect
Livereload en el explorador web para cuando se hagan cambios en los archivos
```javascript
gulp.task('connect', function() {
  connect.server({
    root: [outputDir],
    livereload: true,
    port:3000
  });
});
```
###default (gulp)
Tarea por defecto que ejecuta todas las anteriores, solo es necesario ejecutar gulp
```javascript
gulp.task('default',['js','jade','sass','watch','connect']);
```
