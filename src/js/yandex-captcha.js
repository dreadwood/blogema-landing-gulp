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
