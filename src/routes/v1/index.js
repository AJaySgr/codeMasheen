const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const queryRoute = require('./query.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/query',
    route: queryRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/query',
    route: queryRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
