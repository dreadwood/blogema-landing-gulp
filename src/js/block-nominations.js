;(() => {
  const btnDrop = document.querySelector('.js-drop-btn')
  const btnDropText = document.querySelector('.js-drop-btn span')
  const menu = document.querySelector('.js-drop-menu')
  const values = document.querySelectorAll('.js-drop-value')

  let isOpen = false

  btnDrop?.addEventListener('click', () => {
    if (isOpen) closeMenu()
    else openMenu()
  })

  function openMenu() {
    btnDrop?.classList.add('actv')
    menu?.classList.add('open')
    isOpen = true
  }

  function closeMenu() {
    btnDrop?.classList.remove('actv')
    menu?.classList.remove('open')
    isOpen = false
  }

  /**
   * @param {string | undefined} id
   */
  function filterCategories(id) {
    const cards = document.querySelectorAll('[data-category-id-card]')

    cards.forEach((it) => {
      if (it instanceof HTMLElement) {
        const idCard = it.dataset.categoryIdCard

        if (id === '0') it.removeAttribute('hidden')
        else if (idCard === id) it.removeAttribute('hidden')
        else it.setAttribute('hidden', 'hidden')
      }
    })
  }

  values.forEach((it) => {
    it.addEventListener('click', () => {
      if (btnDropText) {
        btnDropText.textContent = it.textContent
      }

      values.forEach((it) => it.classList.remove('actv'))
      it.classList.add('actv')

      if (it instanceof HTMLElement) {
        filterCategories(it.dataset.categoryIdBtn)
      }

      closeMenu()
    })
  })
})()
