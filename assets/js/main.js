const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

const SLIDES_COUNT = slides.length;
function nextSlide() {
  slides[currentSlide].classList.toggle('active');
  currentSlide = (currentSlide + 1) % SLIDES_COUNT;
  slides[currentSlide].classList.toggle('active');
}

setInterval(nextSlide, 1000)


