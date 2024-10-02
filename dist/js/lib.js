'use strict'

/**
 * utils.js
 */
window.utils = {
  /**
   * @param {JSON} data
   * @param {String} url
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
      type: 'slide',
      autoWidth: true,
      arrows: false,
      pagination: false,
      autoScroll: {
        speed: 1
      },
      wheel: true,
      releaseWheel: true,
      wheelMinThreshold: 1
    })

    splide.mount(window.splide.Extensions)
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

// /**
//  * yandex-captcha.js
//  */
// ;(() => {
//   const container = document.querySelector('.js-captcha-container')

//   const SITE_KEY = 'ysc1_mVbqCcsUX5BOmb1b8oDGpHU07wbauV3o2udMLkyy031f341d'

//   function onSmartCaptchaReady() {
//     if (!window.smartCaptcha) {
//       throw new Error('SmartCaptcha is not present')
//     }

//     const widgetId = window.smartCaptcha.render(container, {
//       sitekey: SITE_KEY,
//       hl: 'ru'
//     })

//     window.smartCaptcha.subscribe(widgetId, 'success', handleSuccess)
//   }

//   async function handleSuccess(token) {
//     console.log('test handleSuccess')
//     console.log(token)

//     const body = new URLSearchParams({
//       secret: SERVER_KEY,
//       token: token
//     })

//     try {
//       const res = await fetch('https://smartcaptcha.yandexcloud.net/validate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         mode: 'no-cors',
//         body
//       })
//       console.log(res)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   function handleScriptLoadingError() {
//     // Обработка ошибок
//   }

//   function onSmartCaptchaLoad() {
//     const scriptElement = document.createElement('script')
//     scriptElement.src =
//       'https://smartcaptcha.yandexcloud.net/captcha.js?render=onload&onload=onSmartCaptchaReady'
//     scriptElement.onerror = handleScriptLoadingError
//     document.body.appendChild(scriptElement)
//     scriptElement.onload
//   }

//   window.onSmartCaptchaReady = onSmartCaptchaReady
//   window.onSmartCaptchaLoad = onSmartCaptchaLoad
// })()
