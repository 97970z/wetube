// menu__btn 클릭시 menu__list 보이기
const dropdown = document.getElementById("dropdown");
const menuBtn = document.querySelector(".dd");

let controlsTimeout = null;
let controlsMovementTimeout = null;

const hideControls = () => menuBtn.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  menuBtn.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 1000);
};
const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 1000);
};

dropdown.addEventListener("mousemove", handleMouseMove);
dropdown.addEventListener("mouseleave", handleMouseLeave);
