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

workbox.precaching.precacheAndRoute([{"revision":"05d4b1779ce3c8685b2f5694f9c72a7d","url":"css/base.css"},{"revision":"8dcdf76dd29b2a502fd20db6b11a4158","url":"images/icon-128x128.png"},{"revision":"eaa8793495c5475b32c5fadf1cb86054","url":"images/icon-144x144.png"},{"revision":"bd6cbeaed23b8d6fb5494d8b66d7d1e8","url":"images/icon-152x152.png"},{"revision":"6eeb37934e9bdc71e6463c85176c340f","url":"images/icon-192x192.png"},{"revision":"57e827c1e8f031f2c9a5a55c82b02f9d","url":"images/icon-384x384.png"},{"revision":"4c1cff72d0f243c8c5ada39c973c54ce","url":"images/icon-48x48.png"},{"revision":"3ea55a941e1805f1fad5943c71acd791","url":"images/icon-512x512.png"},{"revision":"a226ccfeb77b8b39a57575ac8b886818","url":"images/icon-72x72.png"},{"revision":"7c0d727d70c5b4fb7d8b5e91bfcd89d5","url":"images/icon-96x96.png"},{"revision":"5f22e1ae2285a998813192c9e3752712","url":"images/icons8-github-64.png"},{"revision":"d03cb2b6a26d0d82e327d130a9cc3e20","url":"images/icons8-linkedin-64.png"},{"revision":"812c361b24782456ed3ca7cbf47ee11f","url":"images/Logo.svg"},{"revision":"9ad34986a599e90f638e3e31e86b91f8","url":"index.html"},{"revision":"833e15a23a5ec40aca8cc1f886a5b29e","url":"script.js"},{"revision":"8b7c21dec416f8167f0f28fa27d2c45f","url":"sounds/colocar1.mp3"},{"revision":"1ebeaaa2d9d60acfe42ecb97d7261669","url":"sounds/nope.mp3"},{"revision":"69df70ac765b5de8ae1afd8f1665b9fa","url":"sounds/romper1.mp3"},{"revision":"5c05cf50763529a06346ea08e7ac537f","url":"sounds/romper2.mp3"},{"revision":"5d221438dc636eabc031b9152e2e5df2","url":"workbox-7409304f.js"}]);