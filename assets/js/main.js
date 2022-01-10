import SwipeCarousel from './swipe-carousel.js';
import Carousel from './carousel.js';

const carousel = new SwipeCarousel({
  containerID: '#myCarousel',
  slideID: '.item',
  interval: 2000,
  // isPlaying: false
});

carousel.init();
