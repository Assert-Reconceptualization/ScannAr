// Initializes the `users` service on path `/users`
// if we want to create a custom behavior
const { Tags } = require('./tags.class'); //? possible a helper function for db

const createModel = require('../../models/tags');
const hooks = require('./tags.hooks');

module.exports = (app) => {
  // creating the model
  let Model = createModel(app);

  let paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use("/tags", new Tags(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('tags');

  service.hooks(hooks);
};
