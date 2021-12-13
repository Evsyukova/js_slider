const slides = document.querySelectorAll('.slide');
const pauseButton = document.querySelector('#pause');
const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');

const SLIDES_COUNT = slides.length;
let currentSlide = 0;
let timerID = null;
let isPlaying = true;

function gotoSlide(n) {
  slides[currentSlide].classList.toggle('active');
  currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
  slides[currentSlide].classList.toggle('active');
}

function nextSlide() {
  gotoSlide(currentSlide + 1);
}

function prevSlide() {
  gotoSlide(currentSlide - 1);
}

function pauseSlideShow() {
  if (isPlaying) {
    clearInterval(timerID);
    pauseButton.innerHTML = 'Play';
    isPlaying = false;
  }
}

function playSlideShow() {
  timerID = setInterval(nextSlide, 1000);
  pauseButton.innerHTML = 'Pause';
  isPlaying = true;
}

function pausePlay() {
  if (isPlaying) {
    pauseSlideShow();
  } else {
    playSlideShow();
  }
}

function prevHandler() {
  pauseSlideShow();
  prevSlide();
}
function nextHandler() {
  pauseSlideShow();
  nextSlide();
}

pauseButton.addEventListener('click', pausePlay);
previousButton.addEventListener('click', prevHandler);
nextButton.addEventListener('click', nextHandler);

timerID = setInterval(nextSlide, 3000);


