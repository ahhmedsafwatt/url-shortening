const toggleItem = document.querySelectorAll(".toggleItem");
const menu = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
export function toggleMenu() {
  menu.classList.toggle("showMenu");

  hamburger.classList.toggle("change");
}
hamburger.addEventListener("click", toggleMenu);

toggleItem.forEach(function (element) {
  element.addEventListener("click", toggleMenu);
});
