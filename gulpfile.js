let gulp = require("gulp");
let imagemin = require("gulp-imagemin");
let rename = require("gulp-rename");
let clean = require("gulp-clean");

let browserSync = require("browser-sync").create();
let reload = browserSync.reload;

gulp.task("clean", () => gulp.src("build", { read: false }).pipe(clean()));

gulp.task("img", function () {
  return gulp
    .src("./src/img/**")
    .pipe(imagemin())
    .pipe(gulp.dest("build/src/img"));
});

gulp.task("build", gulp.series("js", "css", "img", "html"));

gulp.task("default", gulp.series("build"));
