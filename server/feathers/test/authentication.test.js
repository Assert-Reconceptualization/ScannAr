/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const assert = require('assert');
const app = require('../src/app');
const axios = require('axios');

describe('authentication', function () {
  it('registered the authentication service', function () {
    assert.ok(app.service('authentication'));
  });
  
  describe('local strategy', function () {
    const userInfo = {
      email: 'someone@example.com',
      password: 'supersecret'
    };

    before(async function () {
      try {
        const service = await app.service('users');
        const user = await service.create(userInfo);
      } catch (error) {
        // Do nothing, it just means the user already exists and can be tested
      }
    });

    it('authenticates user and creates accessToken', async function () {
      const { user, accessToken } = await app.service('authentication').create({
        strategy: 'local',
        ...userInfo
      });
      assert.ok(accessToken, 'Created access token for user');
      assert.ok(user, 'Includes user in authentication data');
    });
  });
});
