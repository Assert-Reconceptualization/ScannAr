const users = require('./users/users.service.js');
const business = require('./business/business.service');
const product = require('./products/products.service');
const savedProducts = require('./savedProducts/savedproducts.service');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(business);
  app.configure(product);
  app.configure(savedProducts);
};

// page to put models in
