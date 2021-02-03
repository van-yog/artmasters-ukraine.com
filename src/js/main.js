"use strict";

let mobileBtn = document.querySelector("#mobile-menu");

mobileBtn.addEventListener("click", () => {
  let menu = document.querySelector(".menu");
  menu.classList.toggle("show");
  let icon = document.querySelector(".mobile__icon");
  icon.classList.toggle("mobile__icon-open");
});

let submenu = document.querySelector(".submenu");

submenu.addEventListener("click", () => {
  let submenu = document.querySelector(".submenu__dnone");
  submenu.classList.toggle("show");
});

let artist = document.querySelectorAll(".about__header");

artist.forEach((elem) => {
  elem.addEventListener("click", (ev) => {
    let sibling = ev.target.nextElementSibling;
    sibling.classList.toggle("show");
    let child = sibling.querySelector(".animation");
    setTimeout(() => child.classList.toggle("animation-height"), 50);
    let close = ev.target.querySelector(".about__header_icon");
    close.classList.toggle("about__header_icon_close");
  });
});

let a = document.querySelectorAll(".nav__link ");

a.forEach((elem) => {
  elem.addEventListener("click", (ev) => {
    let mobileMenu = document.querySelector(".menu");
    mobileMenu.classList.remove("show");
  });
});
