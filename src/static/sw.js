importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/045070f.js",
    "revision": "525db1aded45dc522aa9b5060e6878d4"
  },
  {
    "url": "/_nuxt/05778e1.js",
    "revision": "8fc5ef48bd4e46c7542f4a05397cdb3d"
  },
  {
    "url": "/_nuxt/0dd49e6.js",
    "revision": "71e8978bfdee25edf43f41b22f3a167f"
  },
  {
    "url": "/_nuxt/1a38c42.js",
    "revision": "cfa841072ee8dc42115a97b83d578765"
  },
  {
    "url": "/_nuxt/1c17e67.js",
    "revision": "e2fa6f15bf3a9c8dbca0faa7699faa44"
  },
  {
    "url": "/_nuxt/2e41dab.js",
    "revision": "0bdcca03109f3a41adb2ad8b0ba122ed"
  },
  {
    "url": "/_nuxt/30c3e4a.js",
    "revision": "79207f22a38fa7d0feca2d084ca9a9a5"
  },
  {
    "url": "/_nuxt/364e413.js",
    "revision": "b4e87ec450eba848ac8d03f60f31061e"
  },
  {
    "url": "/_nuxt/38a5fa8.js",
    "revision": "b5b921a07056fe32b4311578f44de093"
  },
  {
    "url": "/_nuxt/45bbef7.js",
    "revision": "55b810377950318eca3c012a56681a4e"
  },
  {
    "url": "/_nuxt/5b1d449.js",
    "revision": "337ac3f2936cb4cffd86840b8f2c4398"
  },
  {
    "url": "/_nuxt/62ef287.js",
    "revision": "d7093b395bcc32b03f9eace4f21ba583"
  },
  {
    "url": "/_nuxt/660c7ac.js",
    "revision": "1bd72d82ddec74b71f71d4e4a20e6270"
  },
  {
    "url": "/_nuxt/7002bd3.js",
    "revision": "9c31427401d4108ab54ab171ab81ee1c"
  },
  {
    "url": "/_nuxt/79e5142.js",
    "revision": "b01079173cdc983a9875b73d228fd551"
  },
  {
    "url": "/_nuxt/7dea2e7.js",
    "revision": "a3a00ff24c0f7865f4d3fd104c484884"
  },
  {
    "url": "/_nuxt/8347cc8.js",
    "revision": "60130e6e91324b3a778dcac7351a1866"
  },
  {
    "url": "/_nuxt/84f5b90.js",
    "revision": "71e99f7fe56ecdbe6f0f85f7638fd363"
  },
  {
    "url": "/_nuxt/9145c50.js",
    "revision": "e6d3156b1f4997e52761c163ded44a76"
  },
  {
    "url": "/_nuxt/9a1a579.js",
    "revision": "e380a349fae552d5c299245c2b8c111e"
  },
  {
    "url": "/_nuxt/b6b5f16.js",
    "revision": "ccfe28e8dd46d5c46ab2af28ef605733"
  },
  {
    "url": "/_nuxt/ba65ab0.js",
    "revision": "4f37316f251ebb31204947909d28a6f0"
  },
  {
    "url": "/_nuxt/ddbe2f7.js",
    "revision": "b393ce445c81abd96f798eab4669bae2"
  },
  {
    "url": "/_nuxt/e07e8c6.js",
    "revision": "37fe21a7da9177e53e1c887e7e6354ff"
  },
  {
    "url": "/_nuxt/f40d486.js",
    "revision": "3ef2456d0a32a2228019fd567e758e82"
  },
  {
    "url": "/_nuxt/f44098e.js",
    "revision": "93f53dd3013c15413646ac6c7faa363c"
  },
  {
    "url": "/_nuxt/fc6d120.js",
    "revision": "7dea142e1c59a03682e5f01f602d8a34"
  }
], {
  "cacheId": "recipe",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
