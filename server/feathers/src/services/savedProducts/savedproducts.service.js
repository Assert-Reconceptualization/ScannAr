// Initializes the `business` service on path `/business`
const { Savedproduct } = require('./savedProducts.class.js');
const createModel = require('../../models/savedProducts');
const hooks = require('./savedProducts.hooks.js');

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/savedProducts', new Savedproduct(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('savedProducts');

  service.hooks(hooks);
};
