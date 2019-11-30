// Initializes the `business` service on path `/business`
const { Product } = require('./products.class');
const createModel = require('../../models/products');
const hooks = require('./products.hooks.js');

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/products', new Product(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('products');

  service.hooks(hooks);
};
