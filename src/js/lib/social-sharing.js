/**
 * social-sharing.js
 */
;(() => {
  // обработчики закрытия модального окна
  /** @type {NodeListOf<HTMLDivElement>} */
  const overlays = document.querySelectorAll('.js-sharing')

  overlays.forEach((it) => {
    /** @type {HTMLButtonElement | null} */
    const btnClose = it.querySelector('.js-sharing-close')

    it.addEventListener('click', (evt) => {
      if (evt.target === it) {
        it.classList.remove('show')
      }
    })

    btnClose?.addEventListener('click', (evt) => {
      if (evt.currentTarget === btnClose) {
        it.classList.remove('show')
      }
    })
  })

  // показыать модалку с задержкой
  const TIME_SHOW_DELAY = 10000
  /** @type {NodeListOf<HTMLDivElement>} */
  const modalsTime = document.querySelectorAll('.js-sharing-time')

  modalsTime.forEach((it) => {
    if (!it.id) return

    const isShowBefore = !!localStorage.getItem(it.id)
    if (isShowBefore) return

    setTimeout(() => {
      it.style = 'opacity: 0;'
      it.classList.add('show')
      localStorage.setItem(it.id, it.id)

      setTimeout(() => (it.style = 'opacity: 1;'), 0.02)
    }, TIME_SHOW_DELAY)
  })
})()
