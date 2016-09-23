// /* eslint-disable */
importScripts('/sw-toolbox.js');

// toolbox.options.debug = true;
toolbox.precache([
  '/manifest.json',
  '/group.png',
  '/facebook.png',
  '/vacation.png',
  '/logo_colour_300.png',
]);

// // TODO: think about how we want to handle other routes
toolbox.router.default = toolbox.networkOnly;

// // we use query busting to fetch new main.js
toolbox.router.get('/assets/main.js', toolbox.cacheFirst);
toolbox.router.get(/assets\/main.[0-9a-zA-Z]+.js$/, toolbox.cacheFirst);
// // https://modspl.us/assets/main.058f4d622a6fb2e6a846.js
toolbox.router.get('/group.png', toolbox.cacheFirst);
toolbox.router.get('/facebook.png', toolbox.cacheFirst);
toolbox.router.get('/vacation.png', toolbox.cacheFirst);
toolbox.router.get('/logo_colour_300.png', toolbox.cacheFirst);

toolbox.router.get('/manifest.json', toolbox.networkFirst);
toolbox.router.get(/graphql/, toolbox.networkFirst);
toolbox.router.get('/api', toolbox.networkFirst);
toolbox.router.get('/', toolbox.networkFirst);
toolbox.router.get('/module', toolbox.networkFirst);
toolbox.router.get('/group', toolbox.networkFirst);
// /* eslint-enable */
