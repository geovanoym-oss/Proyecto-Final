/* script.js - Comportamiento: menú móvil, carrusel, año en footer */

document.addEventListener("DOMContentLoaded", function () {
  // =====================
  // MENÚ MÓVIL
  // =====================
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  // Cerrar menú al tocar un link (opcional pero recomendado)
  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });

  // =====================
  // CARRUSEL
  // =====================
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const indicatorsContainer = document.getElementById("indicators");

  let currentIndex = 0;
  const slideCount = slides.length;

  // Crear indicadores
  slides.forEach((_, idx) => {
    const btn = document.createElement("button");
    if (idx === 0) btn.classList.add("active");
    btn.addEventListener("click", () => goToSlide(idx));
    indicatorsContainer.appendChild(btn);
  });

  function updateTrack() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    const indicators = Array.from(indicatorsContainer.children);
    indicators.forEach((b, i) =>
      b.classList.toggle("active", i === currentIndex)
    );
  }

  function goToSlide(index) {
    currentIndex = (index + slideCount) % slideCount;
    updateTrack();
  }

  nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
  prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));

  // Autoplay
  let autoplay = setInterval(() => goToSlide(currentIndex + 1), 6000);

  const carousel = document.getElementById("carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(autoplay));
  carousel.addEventListener("mouseleave", () => {
    autoplay = setInterval(() => goToSlide(currentIndex + 1), 6000);
  });

  // =====================
  // AÑO EN FOOTER
  // =====================
  document.getElementById("year").textContent = new Date().getFullYear();
});
