import SwipeCarousel from './swipe-carousel.js';
import Carousel from './carousel.js';

const carousel = new Carousel({
  containerID: '#myCarousel',
  slideID: '.item',
  interval: 1000,
  // isPlaying: false
});

carousel.init();
