const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('#indicators-container');
const indicators = document.querySelectorAll('.indicator');
const pauseButton = document.querySelector('#pause-btn');
const previousButton = document.querySelector('#prev-btn');
const nextButton = document.querySelector('#next-btn');

const SLIDES_COUNT = slides.length;
const CODE_LEFT_ARROW = "ArrowLeft";
const CODE_RIGHT_ARROW = "ArrowRight";
const CODE_SPACE = "Space";

let currentSlide = 0;
let timerID = null;
let isPlaying = true;
let = interval = 1000;

function gotoNth(n) {
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
  currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
}

function gotoPrev() {
  gotoNth(currentSlide - 1);
}


function gotoNext() {
  gotoNth(currentSlide + 1);
}

function pause() {
  if (isPlaying) {
    clearInterval(timerID);
    pauseButton.innerHTML = 'Play';
    isPlaying = false;
  }
}

function play() {
  timerID = setInterval(gotoNext, interval);
  pauseButton.innerHTML = 'Pause';
  isPlaying = true;
}

const pausePlay = () => isPlaying ? pause() : play();

function prev() {
  pause();
  gotoPrev();
}
function next() {
  pause();
  gotoNext();
}

function indacate(e) {
  const target = e.target;

  if (target && target.classList.contains('indicator')) {
    pause();
    gotoNth(+target.dataset.slideTo);
  }
}

function pressKey(e) {
  if (e.code === CODE_LEFT_ARROW) prev();
  if (e.code === CODE_RIGHT_ARROW) next();
  if (e.code === CODE_SPACE) pausePlay();
}

pauseButton.addEventListener('click', pausePlay);
previousButton.addEventListener('click', prev);
nextButton.addEventListener('click', next);
indicatorsContainer.addEventListener('click', indacate);
document.addEventListener('keydown', pressKey)

timerID = setInterval(gotoNext, interval);


