const swiper = new Swiper('.poster.swiper', {
  autoplay: true,
  loop: true,
  pagination: {
    el: '.dots-list',
    bulletClass: 'bullet',
    bulletActiveClass: 'bullet-active',
    clickable: true
  },
  navigation: {
    nextEl: '.next-btn',
    prevEl: '.pre-btn',
  },
});

const promoteCarousel = new Swiper('.promote-carousel', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 20,
  speed: 5000,
  freeMode: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    992: {
      slidesPerView: 5,
    },
    1200: {
      slidesPerView: 5,
    }
  }
});

const recommendCarousel = new Swiper('.recommend-container .swiper', {
  loop: true,
  slidesPerView: 1.3,
  spaceBetween: 30,
  breakpoints: {
    768: {
      noSwiping: true,
      loop: false,
      slidesPerView: 3,
    },
  }
})