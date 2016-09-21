/* eslint-disable */
importScripts('/sw-toolbox.js');

// toolbox.options.debug = true;
toolbox.precache(['/manifest.json', '/assets/main.js', '/group.png']);

// TODO: think about how we want to handle other routes
// toolbox.router.default = toolbox.networkOnly;

// we use query busting to fetch new main.js
toolbox.router.get('/assets/main.js', toolbox.cacheFirst);
toolbox.router.get('/group.png', toolbox.cacheFirst);

toolbox.router.get('/manifest.json', toolbox.networkFirst);
toolbox.router.get('/graphql', toolbox.networkFirst);
toolbox.router.get('/api', toolbox.networkFirst);
toolbox.router.get('/', toolbox.networkFirst);
// /* eslint-enable */
