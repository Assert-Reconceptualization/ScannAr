// Initializes the `users` service on path `/users`
//if we want to create a custom behavior
const { Users } = require('./users.class'); //? possible a helper function for db

const createModel = require('../../models/users');
const hooks = require('./users.hooks');

module.exports = (app) => {
  // creating the model
  let Model = createModel(app);

  let paginate = app.get('paginate')

  const options = {
    Model, 
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
};
