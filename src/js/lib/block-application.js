/**
 * block-application.js
 */
;(() => {
  const elements = document.querySelectorAll('.js-el')

  if (elements.length === 0) {
    return
  }

  elements.forEach((it) => {
    const field = it.querySelector('.js-el-field')

    if (!field && !field.maxLength) {
      return
    }

    const subFieldElement = it.querySelector('.js-el-maxlength')

    if (!subFieldElement) {
      return
    }

    showRestInput(field, subFieldElement)

    field.addEventListener('input', (evt) => {
      if (evt.target.value.length > evt.target.maxLength) {
        evt.target.value = evt.target.value.slice(0, maxLength)
      }

      showRestInput(evt.target, subFieldElement)
    })
  })

  /**
   * @param {HTMLInputElement | HTMLTextAreaElement } field
   * @param {HTMLDivElement} element
   */
  function showRestInput(field, element) {
    const remainder = field.maxLength - field.value.length
    element.textContent = `осталось ${remainder} символов`

    if (remainder === 0) {
      element.classList.add('error')
    } else {
      element.classList.remove('error')
    }
  }
})()
