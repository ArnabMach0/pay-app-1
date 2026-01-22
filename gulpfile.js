// Gulpfile.js for automating frontend build tasks

const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const del = require("del");

// Paths configuration
const paths = {
  html: {
    src: "shared/pages/**/*.html",
    partials: "shared/partials/**/*.html",
    dest: "frontend/dist/",
  },
  styles: {
    src: "shared/assets/scss/**/*.scss",
    dest: "frontend/dist/assets/css/",
  },
  scripts: {
    src: "shared/assets/js/**/*.js",
    dest: "frontend/dist/assets/js/",
  },
  images: {
    src: "shared/assets/img/**/*",
    dest: "frontend/dist/assets/img/",
  },
  vendor: {
    src: "shared/vendor/**/*",
    dest: "frontend/dist/vendor/",
  },
};

// Clean dist folder
function clean() {
  return del(["frontend/dist/**", "!frontend/dist/.gitkeep"]);
}

// Compile HTML with includes
function html() {
  return gulp
    .src(paths.html.src)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      }),
    )
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Compile SCSS to CSS
function styles() {
  return gulp
    .src("shared/assets/scss/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Minify and bundle JS
function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Optimize images
function images() {
  return gulp
    .src(paths.images.src)
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ]),
    )
    .pipe(gulp.dest(paths.images.dest));
}

// Copy vendor files
function vendor() {
  return gulp.src(paths.vendor.src).pipe(gulp.dest(paths.vendor.dest));
}

// BrowserSync server
function serve() {
  browserSync.init({
    server: {
      baseDir: "./frontend/dist",
    },
    port: 3000,
    open: true,
  });

  gulp.watch(paths.html.src, html);
  gulp.watch(paths.html.partials, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
}

// Build task
const build = gulp.series(
  clean,
  gulp.parallel(html, styles, scripts, images, vendor),
);

// Watch task
const watch = gulp.series(build, serve);

// Export tasks
exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
