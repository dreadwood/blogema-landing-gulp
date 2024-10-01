/**
 * block-header.js
 */
;(() => {
  const burger = document.querySelector('.js-burger')
  const header = document.querySelector('.js-header')
  const links = document.querySelectorAll('.js-link')

  const menu = document.querySelector('.js-menu')

  let isOpen = false

  burger?.addEventListener('click', () => {
    if (isOpen) closeMenu()
    else openMenu()
  })

  links.forEach((it) =>
    it.addEventListener('click', () => {
      closeMenu()
    })
  )

  function openMenu() {
    header?.classList.add('open')
    document.body.classList.add('scroll-lock')
    menu.style = `height: ${menu.scrollHeight}px;`
    isOpen = true
  }

  function closeMenu() {
    header?.classList.remove('open')
    document.body.classList.remove('scroll-lock')
    menu.style = ''
    isOpen = false
  }
})()
