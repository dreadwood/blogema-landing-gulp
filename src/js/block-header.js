;(() => {
  const burger = document.querySelector('.js-burger')
  const header = document.querySelector('.js-header')
  const links = document.querySelectorAll('.js-link')

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
    isOpen = true
  }

  function closeMenu() {
    header?.classList.remove('open')
    document.body.classList.remove('scroll-lock')
    isOpen = false
  }
})()
