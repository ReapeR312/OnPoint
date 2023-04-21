let offset = 0; // смещение от левого края

const sliderLine = document.querySelector(".slider-line");
const sperm1 = document.querySelector(".slide-2__sperm-1");
const sperm2 = document.querySelector(".slide-2__sperm-2");
const sperm3 = document.querySelector(".slide-2__sperm-3");
const sperm4 = document.querySelector(".slide-2__sperm-4");
const sperm5 = document.querySelector(".slide-2__sperm-5");
const detailedBox = document.querySelector(".detailed");
const text1 = document.querySelector(".list-slide-3__page-1");
const text2 = document.querySelector(".list-slide-3__page-2");
const page1 = document.querySelector(".nav__page-1");
const page2 = document.querySelector(".nav__page-2");
const pointTrue = "/img/3_slide/point_true.png";
const pointFalse = "/img/3_slide/point_false.png";

// BTNS NEXT & HOME ======================
document
  .querySelector(".slide-1__btn-next")
  .addEventListener("click", function () {
    offset = 1024;
    sliderLine.style.right = offset + "px";
  });
document.querySelector(".btn-home").addEventListener("click", function () {
  offset = 0;
  sliderLine.style.right = offset + "px";
});

// TRIGGER ANIMATION ======================
function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      sperm1.style.animationName = "none";
      sperm2.style.animationName = "none";
      sperm3.style.animationName = "none";
      sperm4.style.animationName = "none";
      sperm5.style.animationName = "none";
      sperm1.style.display = "none";
      sperm2.style.display = "none";
      sperm3.style.display = "none";
      sperm4.style.display = "none";
      sperm5.style.display = "none";
    } else {
      sperm1.style.animationName = "move5";
      sperm2.style.animationName = "move6";
      sperm3.style.animationName = "move7";
      sperm4.style.animationName = "move8";
      sperm5.style.animationName = "move9";
      sperm1.style.display = "flex";
      sperm2.style.display = "flex";
      sperm3.style.display = "flex";
      sperm4.style.display = "flex";
      sperm5.style.display = "flex";
    }
  });
}

let options = {
  threshold: [0.5],
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll(".slider__slide-1");

for (let elm of elements) {
  observer.observe(elm);
}

// SWIPE FUNC ======================
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

const logBlock = document.querySelector(".slide");

let x1 = null;
let y1 = null;

function handleTouchStart(event) {
  const firstTouch = event.touches[0];
  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;
}

function handleTouchMove(event) {
  if (!x1 || !y1) {
    return false;
  }
  let x2 = event.touches[0].clientX;
  let y2 = event.touches[0].clientY;
  let xDiff = x2 - x1;
  let yDiff = y2 - y1;

  if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 200) {
    if (xDiff > 0) {
      offset = offset - 1024;
      if (offset < 0) {
        offset = 0;
      }
      sliderLine.style.right = offset + "px";
    } else {
      offset = offset + 1024;
      if (offset > 2048) {
        offset = 2048;
      }
      sliderLine.style.right = offset + "px";
    }
  } else return NaN;

  x1 = null;
  y1 = null;
}

// ANIMATION OPEN / CLOSE DETAILED ======================
function VisibleDetailedTrue() {
  detailedBox.style.display = "block";
}
function VisibleDetailedFalse() {
  detailedBox.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const buttonOpen = document.querySelector(".slide-3__btn-detailed");
  const buttonClose = document.querySelector(".detailed__btn-close");

  buttonOpen.addEventListener("click", () => {
    toggleTwoClassesDetailed(detailedBox, "is-visible", "is-hidden", 500);
  });
  buttonClose.addEventListener("click", () => {
    toggleTwoClassesDetailed(detailedBox, "is-visible", "is-hidden", 500);
  });
});

function toggleTwoClassesDetailed(element, first, second, timeOfAnimation) {
  if (!element.classList.contains(first)) {
    element.classList.add(first);
    element.classList.remove(second);
    VisibleDetailedTrue();
  } else {
    element.classList.add(second);
    window.setTimeout(function () {
      element.classList.remove(first);
      VisibleDetailedFalse();
    }, timeOfAnimation);
  }
}

// SWIPE-TRIGGER CLOSE DETAILED ======================
function onEntrySlide3(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      detailedBox.style.display = "none";
    } else NaN;
  });
}

let optionsSlide3 = {
  threshold: [0.5],
};
let observerSlide3 = new IntersectionObserver(onEntrySlide3, optionsSlide3);
let elementsSlide3 = document.querySelectorAll(".slider__slide-2");

for (let elm of elementsSlide3) {
  observerSlide3.observe(elm);
}

// NAV DETAILED ======================
function VisiblePagePrev() {
    text1.style.display = "inline";
    text2.style.display = "none";
  page1.src = pointTrue;
  page2.src = pointFalse;
}
function VisiblePageNext() {
    text1.style.display = "none";
    text2.style.display = "inline";
  page1.src = pointFalse;
  page2.src = pointTrue;
}
