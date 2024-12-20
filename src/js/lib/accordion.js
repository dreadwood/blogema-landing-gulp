/**
 * accordion.js
 */
;(() => {
  const accordions = document.querySelectorAll('.js-accordion')

  if (accordions.length === 0) {
    return
  }

  accordions.forEach((it) => {
    const btn = it.querySelector('.js-accordion-btn')
    const content = it.querySelector('.js-accordion-content')

    if (!btn || !content) {
      return
    }

    setContentHeight(it, content)

    btn.addEventListener('click', () => {
      it.classList.toggle('show')
      setContentHeight(it, content)
    })
  })

  /**
   * @param {HTMLDivElement} accordion
   * @param {HTMLDivElement} content
   */
  function setContentHeight(accordion, content) {
    if (accordion.classList.contains('show')) {
      content.style = `height: ${content.scrollHeight}px;`
    } else {
      content.style = ''
    }
  }
})()
