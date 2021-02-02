"use strict";

let gulp = require("gulp");
let imagemin = require("gulp-imagemin");
let clean = require("gulp-clean");

gulp.task("clean", () => gulp.src("build", { read: false }).pipe(clean()));

gulp.task("img", function () {
  return gulp
    .src("./src/img/**")
    .pipe(imagemin([imagemin.mozjpeg({ quality: 75, progressive: true })]))
    .pipe(gulp.dest("build/src/img"));
});

// gulp.task("build", gulp.series("js", "css", "img", "html"));

// gulp.task("default", gulp.series("build"));
