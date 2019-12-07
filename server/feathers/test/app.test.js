/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const assert = require('assert');
const axios = require('axios');
const url = require('url');
const app = require('../src/app');

const hostname = 'localhost';
const port = 3030;
const getUrl = pathname => url.format({
  protocol: 'http',
  hostname,
  port,
  pathname
});

describe('Feathers API tests', function () {
  let server;

  before(function (done) {
    server = app.listen(port, hostname);
    server.once('listening', function () { done(); });
  });

  after(function (done) {
    server.close(done);
  });

  it('Server is running', async function () {
    const { data } = await axios.get(getUrl());

    assert.ok(data.indexOf('<html lang="en">') !== -1);
  });

  describe('Products endpoint works', function () {
    let products;
    before(async function () {
      const response = await axios.get(getUrl('/products'));
      products = response.data.data;
    });

    it('/products returns an array', function () {
      assert.ok(Array.isArray(products));
    });
  });

  describe('Tags endpoint works', function () {
    let tags;
    before(async function () {
      const response = await axios.get(getUrl('/tags'));
      tags = response.data.data;
    });

    it('/tags returns an array', function () {
      assert.ok(Array.isArray(tags));
    });
  });

  describe('Users endpoint works', function () {
    let users;
    before(async function () {
      const response = await axios.get(getUrl('/users'));
      users = response.data.data;
    });

    it('/users returns an array', function () {
      assert.ok(Array.isArray(users));
    });
  });
});
