importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const {registerRoute} = workbox.routing;
const {CacheFirst} = workbox.strategies;
const {CacheableResponse} = workbox.cacheableResponse;

registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com/css?family=Kaushan+Script',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);


registerRoute(
  ({url}) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

workbox.precaching.precacheAndRoute([{"revision":"d75a6d8c3bc8e81a5f3d1ed47742dc70","url":"acerca.html"},{"revision":"2d955b75fd194971e486d5eb1f200ba9","url":"api/configbd.php"},{"revision":"934683eee1a0b11d7972185d0f006f31","url":"api/get/puntuaciones.php"},{"revision":"b0946605a99c6ad9b368f8f9458bf2c9","url":"api/post/puntuaciones.php"},{"revision":"3f15974cf9f0feb7829a9f26709a9947","url":"css/base.css"},{"revision":"bc1c30e45cc7721ecc69c8035bc95a57","url":"images/fondo.jpg"},{"revision":"c868628f85920746394b72634dfcc4f9","url":"images/icon-128x128.png"},{"revision":"cd8497548afb834dda62757379542627","url":"images/icon-144x144.png"},{"revision":"fe8578eb15d077ca8c61b136d721f816","url":"images/icon-152x152.png"},{"revision":"cba69c4d0a85d58c52948906f09cc2e5","url":"images/icon-192x192.png"},{"revision":"09e0f809670656f359124debc2f18af5","url":"images/icon-384x384.png"},{"revision":"499374c2e19adb5ef3b3dadc7cc53412","url":"images/icon-512x512.png"},{"revision":"18f662ec383f61bfe9db19a5a43fcec5","url":"images/icon-72x72.png"},{"revision":"5e7bb9c1b59630a0a57a10b506ba83b8","url":"images/icon-96x96.png"},{"revision":"3dc7591d259f641570e8de31152725f2","url":"images/icono.png"},{"revision":"60dff4d973dbcd8829628cd4a931800f","url":"images/iconoProvisional.png"},{"revision":"afa4fa0f2385f38c206b2e7150d03ff7","url":"index.html"},{"revision":"a301241c0d4bb25c83157d7415978e0b","url":"script.js"},{"revision":"8b7c21dec416f8167f0f28fa27d2c45f","url":"sounds/colocar1.mp3"},{"revision":"1ebeaaa2d9d60acfe42ecb97d7261669","url":"sounds/nope.mp3"},{"revision":"69df70ac765b5de8ae1afd8f1665b9fa","url":"sounds/romper1.mp3"},{"revision":"5c05cf50763529a06346ea08e7ac537f","url":"sounds/romper2.mp3"},{"revision":"5d221438dc636eabc031b9152e2e5df2","url":"workbox-7409304f.js"}]);