import mcache from 'memory-cache';

// http://goenning.net/2016/02/10/simple-server-side-cache-for-expressjs/
export default function cache(duration) {
  return (req, res, next) => {
    const key = `__express__${req.originalUrl}` || req.url;
    const cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    }
    res.sendResponse = res.send;  // eslint-disable-line no-param-reassign
    res.send = (body) => {  // eslint-disable-line no-param-reassign
      mcache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  };
}
