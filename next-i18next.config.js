/** @type {import('next-i18next').UserConfig} */

const path = require('path')

module.exports = {
    i18n: {
      locales: [
        "en", "es", "zh-CN", "zh-TW", "hi", "ar", "fr", "pt", "bn", "ru",
        "de", "ja", "ko", "it", "tr", "ur", "th", "sw", "fa", "vi"
    ],
      defaultLocale: 'en',
      localeDetection: false,
      localePath: path.resolve('./public/locales')
    },
    trailingSlash: true,
  }