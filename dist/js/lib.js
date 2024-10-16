'use strict'

/**
 * utils.js
 */
window.utils = {
  /**
   * @param {JSON} data
   * @param {string} url
   * @return {Promise<Response>}
   */
  async sendData(data, url) {
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'no-cors'
    })
  }
}

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

    btn.addEventListener('click', () => {
      it.classList.toggle('show')

      if (it.classList.contains('show')) {
        content.style = `height: ${content.scrollHeight}px;`
      } else {
        content.style = ''
      }
    })
  })
})()

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

/**
 * block-bloggers.js
 */
;(() => {
  /**
   * @typedef {Object.<string, string>} ILocal
   */

  const KEY_LS = 'vote'

  const cards = [...document.querySelectorAll('[data-card-blogger]')]
  const btns = document.querySelectorAll('[data-card-blogger-btn]')

  const key = window.location.pathname || 'index'
  const local = getLocal(KEY_LS)

  if (local.hasOwnProperty(key)) {
    activeCard(cards, local[key])
  } else {
    btns.forEach((it) => initCard(it))
  }

  /**
   * @param {Element} btn
   */
  function initCard(btn) {
    btn.removeAttribute('disabled')

    btn.addEventListener('click', () => {
      if (!(btn instanceof HTMLElement)) {
        throw new Error('Blogger card is broken node')
      }

      if (!btn.dataset.cardBloggerBtn) {
        throw new Error("Blogger card don't have id")
      }

      leaveVote(btn.dataset.cardBloggerBtn)
    })
  }

  /**
   * @param {string} idBlogger
   */
  function leaveVote(idBlogger) {
    activeCard(cards, idBlogger)
    incrementVote(cards, idBlogger)
    saveLocal(local, idBlogger, key, KEY_LS)
    disableBtns(btns)
  }

  /**
   * @param {string} keyLS
   * @returns {ILocal}
   */
  function getLocal(keyLS) {
    const local = localStorage.getItem(keyLS)
    return local ? JSON.parse(local) : {}
  }

  /**
   * @param {ILocal} local
   * @param {string} id
   * @param {string} category
   * @param {string} keyLS
   */
  function saveLocal(local, id, category, keyLS) {
    local[category] = id
    localStorage.setItem(keyLS, JSON.stringify(local))
  }

  /**
   * @param {Element[]} cardList
   * @param {string} id
   * @returns {Element | undefined}
   */
  function findCard(cardList, id) {
    return cardList.find((card) => {
      if (!(card instanceof HTMLElement)) {
        return
      }

      return card.dataset.cardBlogger === id
    })
  }

  /**
   * @param {Element[]} cardList
   * @param {string} id
   */
  function activeCard(cardList, id) {
    const card = findCard(cardList, id)

    if (card) {
      card.classList.add('actv')
      changeTextBtn(card)
    }
  }

  /**
   * @param {Element} card
   */
  function changeTextBtn(card) {
    const btn = card.querySelector('[data-card-blogger-btn]')

    if (btn && btn instanceof HTMLElement) {
      btn.textContent = 'Вы проголосовали'
    }
  }

  /**
   * @param {Element[]} cardList
   * @param {string} id
   */
  function incrementVote(cardList, id) {
    const card = findCard(cardList, id)
    if (!card) return

    const countEl = card.querySelector('[data-card-blogger-vote]')

    if (countEl && countEl instanceof HTMLElement) {
      const count = countEl.textContent

      if (count) {
        const newCount = +count + 1
        countEl.textContent = newCount.toString()
      }
    }
  }

  /**
   * @param {NodeListOf<Element>} btns
   */
  function disableBtns(btns) {
    btns.forEach((item) => item.setAttribute('disabled', 'disabled'))
  }
})()

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

/**
 * block-nominations.js
 */
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
    menu.style = `height: ${menu.scrollHeight}px;`
    isOpen = true
  }

  function closeMenu() {
    btnDrop?.classList.remove('actv')
    menu?.classList.remove('open')
    menu.style = ''
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

        const idBtn = it.dataset.categoryIdBtn

        let btnDropColor = 'ghost'

        switch (idBtn) {
          case '1':
            btnDropColor = 'green'
            break
          case '2':
            btnDropColor = 'pink'
            break
          case '3':
            btnDropColor = 'purple'
            break
          case '4':
            btnDropColor = 'blue'
            break

          default:
            btnDropColor = 'ghost'
            break
        }

        btnDrop.dataset.categoryColorCard = btnDropColor
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

/**
 * cookies.js
 */
;(() => {
  const TIME_SHOW_DELAY = 300

  const card = document.querySelector('.js-cookies')
  if (!card) return

  const btn = card.querySelector('.js-cookies-btn')
  if (!btn) return

  const isShowBefore = !!localStorage.getItem('cookies')
  if (isShowBefore) return

  card.classList.add('show')

  btn.addEventListener('click', () => {
    card.style = 'opacity: 0;'
    localStorage.setItem('cookies', 'agree')

    setTimeout(() => {
      card.removeAttribute('style')
      card.classList.remove('show')
    }, TIME_SHOW_DELAY)
  })
})()

/**
 * form-field-group.js
 */
;(() => {
  const fieldGroup = document.querySelectorAll('.js-field-group')

  if (fieldGroup.length === 0) {
    return
  }

  fieldGroup.forEach((it) => {
    const element = it.querySelector('.js-field-group-example')
    const btn = it.querySelector('.js-field-group-btn')

    if (!element || !btn) {
      return
    }

    btn.onclick = () => copyElemnt(element, it)
  })

  /**
   * @param {HTMLDivElement} element
   * @param {HTMLDivElement} container
   */
  function copyElemnt(element, container) {
    const copy = element.cloneNode(true)

    /** @type {HTMLInputElement | null} */
    const field = copy.querySelector('.js-field-group-field')

    /** @type {HTMLInputElement | null} */
    const btnField = copy.querySelector('.js-field-group-btn')

    if (!field || !btnField) {
      return
    }

    const num = container.children.length + 1

    field.value = ''
    field.removeAttribute('id')
    field.removeAttribute('required')

    btnField.classList.add('minus')
    btnField.onclick = () => copy.remove()

    container.appendChild(copy)
  }
})()

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
