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
