/* eslint-disable class-methods-use-this */
const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;


class MyLocalStrategy extends LocalStrategy {
  getEntityQuery(query, params) {
    const { email } = query.usernameField;
    // Query for user but only include users marked as `active`
    return {
      ...query,
      usernameField: email,
    };
  }
}

module.exports = (app) => {
  const authService = new AuthenticationService(app);

  authService.register('local', new MyLocalStrategy());
  authService.register("jwt", new JWTStrategy());

  // ...
  app.use('/authentication', authService);
};
