/**
 * block-header.js
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

  console.log(local)

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

      // leaveVote(btn.dataset.cardBloggerBtn)
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
