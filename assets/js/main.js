
(function () {

  const container = document.querySelector('#carousel');
  const slides = container.querySelectorAll('.slide');
  const indicatorsContainer = container.querySelector('#indicators-container');
  const indicators = indicatorsContainer.querySelectorAll('.indicator');
  const pauseButton = container.querySelector('#pause-btn');
  const previousButton = container.querySelector('#prev-btn');
  const nextButton = container.querySelector('#next-btn');

  const SLIDES_COUNT = slides.length;
  const CODE_LEFT_ARROW = "ArrowLeft";
  const CODE_RIGHT_ARROW = "ArrowRight";
  const CODE_SPACE = "Space";
  const FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
  const FA_PLAY = '<i class="fas fa-play-circle"></i>';

  let currentSlide = 0;
  let timerID = null;
  let isPlaying = true;
  let interval = 1000;
  let swipeStartX = null;
  let swipeEndX = null;

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
      pauseButton.innerHTML = FA_PLAY;
      isPlaying = false;
    }
  }

  function play() {
    timerID = setInterval(gotoNext, interval);
    pauseButton.innerHTML = FA_PAUSE;
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

  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
  }

  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX < -100) prev();
    if (swipeStartX - swipeEndX > 100) next();
  }

  function initListeners() {
    pauseButton.addEventListener('click', pausePlay);
    previousButton.addEventListener('click', prev);
    nextButton.addEventListener('click', next);
    indicatorsContainer.addEventListener('click', indacate);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
    document.addEventListener('keydown', pressKey);
  }

  function init() {
    initListeners();
    timerID = setInterval(gotoNext, interval);
  }

  init();

}());

