/**
 * social-sharing.js
 */
;(() => {
  const overlay = document.querySelector('.js-sharing')
  const btnClose = document.querySelector('.js-sharing-close')

  overlay?.addEventListener('click', (evt) => {
    if (evt.target === overlay) {
      overlay.classList.remove('show')
    }
  })

  btnClose?.addEventListener('click', (evt) => {
    if (evt.currentTarget === btnClose) {
      overlay.classList.remove('show')
    }
  })
})()
