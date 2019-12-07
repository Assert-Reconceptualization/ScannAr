/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const assert = require('assert');
const app = require('../../src/app');

describe('\'users\' service', function () {
  it('registered the service', function () {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });
});
