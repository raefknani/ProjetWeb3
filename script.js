const burger = document.querySelector(".menu_burger");
const menu = document.querySelector(".menue_after");
// carousel begin
const slidesContainer = document.querySelector(".slides");
let startX = 0;
let currentSlide = 0;
const totalSlides = document.querySelectorAll(".slide").length;
// carousel end

function toggleMenu() {
  if (!menu) return;
  menu.classList.toggle("is-open");
}

if (burger) {
  burger.addEventListener("click", toggleMenu);
}

// Switch button label on mobile/tablet
const reserveBtn = document.querySelector("#btn_reserver");
const compactQuery = window.matchMedia("(max-width: 1100px)"); // Surface Pro-ish widths and below

function updateReserveLabel(e) {
  if (!reserveBtn) return;
  reserveBtn.textContent = e.matches ? "Réserver…" : "Réservez maintenant";
}

if (reserveBtn) {
  updateReserveLabel(compactQuery);
  compactQuery.addEventListener("change", updateReserveLabel);
}

// carousel functionality
const radioButtons = document.querySelectorAll('input[name="slides"]');
let isDragging = false;

function changeSlide(diff) {
  // Swipe/drag left → next slide
  if (diff > 50) {
    currentSlide = (currentSlide + 1) % totalSlides;
  }
  // Swipe/drag right → previous slide
  if (diff < -50) {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  }
  // Check the corresponding radio button
  if (radioButtons[currentSlide]) {
    radioButtons[currentSlide].checked = true;
  }
}

// Touch events for mobile
slidesContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slidesContainer.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;
  changeSlide(diff);
});

// Mouse events for PC
slidesContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  slidesContainer.style.cursor = "grabbing";
});

slidesContainer.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
});

slidesContainer.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  let endX = e.clientX;
  let diff = startX - endX;
  changeSlide(diff);
  slidesContainer.style.cursor = "grab";
});

slidesContainer.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    slidesContainer.style.cursor = "grab";
  }
});

// Set initial cursor
slidesContainer.style.cursor = "grab";
// end carousel functionality
