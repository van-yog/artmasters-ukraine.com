"use strict";

let mobileBtn = document.querySelector("#mobile-menu");

mobileBtn.addEventListener("click", () => {
  console.log("Нажали на меню");
  let menu = document.querySelector(".menu");
  console.log(menu);
  menu.classList.toggle("show");
  let icon = document.querySelector(".mobile__icon");
  icon.classList.toggle("mobile__icon-open");
});

let submenu = document.querySelector(".submenu");

submenu.addEventListener("touchstart", () => {
  console.log("touch");
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
    console.log(close);
    close.classList.toggle("about__header_icon_close");
  });
});

let a = document.querySelectorAll(".nav__link ");

a.forEach((elem) => {
  elem.addEventListener("click", (ev) => {
    console.log("click po link");
    let mobileMenu = document.querySelector(".menu");
    console.log(mobileMenu);
    mobileMenu.classList.remove("show");
  });
});
