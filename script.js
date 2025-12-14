const burger = document.querySelector(".menu_burger");
const menu = document.querySelector(".menue_after");
const reserveBtn = document.querySelector("#btn_reserver");
const slidesContainer = document.querySelector(".slides");

let startX = 0;
let currentSlide = 0;
let isDragging = false;

const radioButtons = document.querySelectorAll('input[name="slides"]');
const totalSlides = radioButtons.length;

// Toggle mobile menu
function toggleMenu() {
  menu?.classList.toggle("is-open");
}

burger?.addEventListener("click", toggleMenu);

// Update button label based on screen width
function updateReserveLabel(e) {
  if (!reserveBtn) return;
  const link = reserveBtn.querySelector("a");
  if (link) {
    link.textContent = e.matches ? "Réserver…" : "Réservez maintenant";
  }
}

const mobileQuery = window.matchMedia("(max-width: 1100px)");
updateReserveLabel(mobileQuery);
mobileQuery.addEventListener("change", updateReserveLabel);

// Navigate carousel slides
function changeSlide(diff) {
  if (diff > 50) currentSlide = (currentSlide + 1) % totalSlides;
  if (diff < -50) currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  if (radioButtons[currentSlide]) radioButtons[currentSlide].checked = true;
}

// Carousel touch events (mobile)
slidesContainer?.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slidesContainer?.addEventListener("touchend", (e) => {
  changeSlide(startX - e.changedTouches[0].clientX);
});

// Carousel mouse events (desktop)
slidesContainer?.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  slidesContainer.style.cursor = "grabbing";
});

slidesContainer?.addEventListener("mouseup", (e) => {
  if (isDragging) {
    isDragging = false;
    changeSlide(startX - e.clientX);
    slidesContainer.style.cursor = "grab";
  }
});

slidesContainer?.addEventListener("mouseleave", () => {
  isDragging = false;
  if (slidesContainer) slidesContainer.style.cursor = "grab";
});

slidesContainer?.addEventListener("mousemove", (e) => {
  if (isDragging) e.preventDefault();
});

slidesContainer && (slidesContainer.style.cursor = "grab");
