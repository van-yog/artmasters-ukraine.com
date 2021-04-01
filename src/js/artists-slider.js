"use strict";

let allSliderImgs = document.querySelectorAll(".swiper-container img");

allSliderImgs.forEach((img) => {
  let a = document.createElement("a");
  let parent = img.parentNode;
  let classSize = "w-100";

  let url = img.getAttribute("src").split("/");

  if (url[url.length - 1].includes("h")) classSize = "h-100";

  img.classList.add(classSize);

  a.setAttribute("href", img.getAttribute("src"));
  a.setAttribute("target", "_blank");
  a.append(img);
  parent.append(a);
});
