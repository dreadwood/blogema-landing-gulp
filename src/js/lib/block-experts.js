/**
 * block-experts.js
 */
;(() => {
  const sliderExperts = document.querySelector('.js-slider-experts')

  document.addEventListener('DOMContentLoaded', () => {
    if (!sliderExperts) {
      return
    }

    if (!window.splide) {
      console.error("Splide lib isn't exist")
      return
    }

    if (!window.splide.Extensions) {
      console.error("Extensions splide lib isn't exist")
      return
    }

    const splide = new Splide('.splide', {
      autoWidth: true,
      arrows: false,
      pagination: false,
      autoScroll: {
        speed: 1
      }
    })

    splide.mount(window.splide.Extensions)
  })
})()