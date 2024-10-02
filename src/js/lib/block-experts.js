/**
 * block-experts.js
 */
;(() => {
  const sliderExperts = document.querySelector('.js-experts-slider')

  document.addEventListener('DOMContentLoaded', () => {
    if (!sliderExperts) {
      return
    }

    if (!window.Swiper) {
      console.error("Swiper lib isn't exist")
      return
    }

    new Swiper(sliderExperts, {
      mousewheel: {
        forceToAxis: true
      },
      grabCursor: true,
      slidesPerView: 'auto',
      freeMode: {
        enabled: true,
        sticky: true
      }
    })
  })
})()
