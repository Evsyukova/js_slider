class Carousel {
  constructor(containerID = '#carousel', slideID = '.slide', interval = 5000) {
    this.container = document.querySelector(containerID);
    this.slides = this.container.querySelectorAll(slideID);

    this.interval = interval;
  }

  _initProps() {
    this.currentSlide = 0;
    this.isPlaying = true;

    this.SLIDES_COUNT = this.slides.length;
    this.CODE_LEFT_ARROW = "ArrowLeft";
    this.CODE_RIGHT_ARROW = "ArrowRight";
    this.CODE_SPACE = "Space";
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
  }

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = `<span class="control control-pause" id = "pause-btn">${this.FA_PAUSE}</span>`;
    const PREV = `<span class="control control-prev" id="prev-btn">${this.FA_PREV}</span>`;
    const PLAY = `<span class="control control-next" id="next-btn">${this.FA_NEXT}</span>`;

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + PLAY;

    this.container.appendChild(controls);

    this.pauseButton = this.container.querySelector('#pause-btn');
    this.previousButton = this.container.querySelector('#prev-btn');
    this.nextButton = this.container.querySelector('#next-btn');

  }

  _initIndicators() {
    const indicators = document.createElement('div');

    indicators.setAttribute('class', 'indicators');

    for (let i = 0, n = this.SLIDES_COUNT; i < n; i++) {
      const indicator = document.createElement('div');

      indicator.setAttribute('class', 'indicator');
      indicator.dataset.slideTo = `${i}`;

      i === 0 && indicator.classList.add('active');

      indicators.appendChild(indicator);
    }

    this.container.appendChild(indicators);

    this.indContainer = this.container.querySelector('.indicators');
    this.indItems = this.container.querySelectorAll('.indicator');
  }

  _initListeners() {
    this.pauseButton.addEventListener('click', this.pausePlay.bind(this));
    this.previousButton.addEventListener('click', this.prev.bind(this));
    this.nextButton.addEventListener('click', this.next.bind(this));
    this.indContainer.addEventListener('click', this._indacate.bind(this));

    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indItems[this.currentSlide].classList.toggle('active');
  }

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  }

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  }

  _pause() {
    if (this.isPlaying) {
      clearInterval(this.timerID);
      this.pauseButton.innerHTML = this.FA_PLAY;
      this.isPlaying = false;
    }
  }

  _play() {
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
    this.pauseButton.innerHTML = this.FA_PAUSE;
    this.isPlaying = true;
  }

  _indacate(e) {
    const target = e.target;

    if (target && target.classList.contains('indicator')) {
      this._pause();
      this._gotoNth(+target.dataset.slideTo);
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this._pausePlay();
  }

  pausePlay() {
    this.isPlaying ? this._pause() : this._play()
  }

  prev() {
    this._pause();
    this._gotoPrev();
  }

  next() {
    this._pause();
    this._gotoNext();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  }

};

export default Carousel