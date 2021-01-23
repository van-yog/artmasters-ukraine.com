"use strict";

let mobileBtn = document.querySelector("#mobile-menu");

mobileBtn.addEventListener("click", () => {
  console.log("Нажали на меню");
  let menu = document.querySelector(".menu");
  console.log(menu);
  menu.classList.toggle("show");
});
