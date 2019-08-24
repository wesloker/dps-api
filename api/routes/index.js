const earthquakeRouter = require('./earthquake');
const placesRouter = require('./places');

const vbeta = 'v0.1.0beta';

module.exports = (app) => {
  app.use(`/api/${vbeta}`, earthquakeRouter);
  app.use(`/api/${vbeta}`, placesRouter);
};
