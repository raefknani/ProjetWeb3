const burger = document.querySelector(".menu_burger");
const menu = document.querySelector(".menue_after");
const reserveBtn = document.querySelector("#btn_reserver");
const slidesContainer = document.querySelector(".slides");

let startX = 0;
let currentSlide = 0;
let isDragging = false;

const radioButtons = document.querySelectorAll('input[name="slides"]');
const totalSlides = radioButtons.length;


function toggleMenu() {
  menu?.classList.toggle("is-open");
}

burger?.addEventListener("click", toggleMenu);

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

function changeSlide(diff) {
  if (diff > 50) currentSlide = (currentSlide + 1) % totalSlides;
  if (diff < -50) currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  if (radioButtons[currentSlide]) radioButtons[currentSlide].checked = true;
}


slidesContainer?.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slidesContainer?.addEventListener("touchend", (e) => {
  changeSlide(startX - e.changedTouches[0].clientX);
});

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

const filterButtons = document.querySelectorAll(".filter-btn");
const popularCards = document.querySelectorAll(
  ".popular-grid .destination-card"
);
const quickSearchInput = document.querySelector("#searchDestination");
const quickTypeSelect = document.querySelector("#typeSelect");

function applyFilters() {
  const text = (quickSearchInput?.value || "").toLowerCase().trim();
  const type = quickTypeSelect?.value || "all";
  popularCards.forEach((card) => {
    const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
    const cat = card.dataset.category || "all";
    const matchText = text === "" || title.includes(text);
    const matchType = type === "all" || cat === type;
    card.style.display = matchText && matchType ? "" : "none";
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    if (quickTypeSelect) quickTypeSelect.value = btn.dataset.filter || "all";
    applyFilters();
  });
});

quickSearchInput?.addEventListener("input", applyFilters);
quickTypeSelect?.addEventListener("change", applyFilters);
