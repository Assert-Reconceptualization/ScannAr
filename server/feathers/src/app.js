const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require("dotenv");


// read the dotenv file, apply every value from the env file then the default config have access to the values in the dot env file 
dotenv.config();

const logger = require('./logger');


const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const sequelize = require('./sequelize');

// Create an Express compatible Feathers application instance.
// we can do feathers thing and express things at the same time
const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
// Turn on JSON parser for REST services
app.use(express.json());
// Turn on URL-encoded parser for REST services
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
// a static serve on the slash path
app.use('/', express.static(app.get('public')));

app.get("/savedProducts", (req, res) => {
  const products = app.get("sequelizeClient").models.products;
  const { idUser } = req.query;
  app
    .get("sequelizeClient")
    .models.users.findAll({
      where: { id: idUser },
      include: [
        {
          model: products,
          required: true,
        },
      ],
    })
    .then(user => {
      res.send(user[0].products);
    })
    .catch(error => {
      res.send(error);
      res.send(500);
    });
});

app.post('/savedProducts', (req, res) => {
  const { idUser, idProduct } = req.query;
  app.get('sequelizeClient').models.savedProducts.create({ idUser, idProduct })
    .then((saved) => {
      res.send(saved);
    })
    .catch((err) => {
      console.log(err);
      res.send(500);
    });
});

app.delete('/savedProducts', (req, res) => {
  const { idProduct } = req.query;
  const savedProducts = app.get("sequelizeClient").models.savedProducts;
  // delete savedProduct connections
  savedProducts.destroy({
    // where idProduct
    where: { idProduct },
  }).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    console.log(err);
    res.send(500);
  });
});

// Set up Plugins and providers & Enable express REST services
app.configure(express.rest());
// Enable Socket.io services
app.configure(socketio());

app.configure(sequelize);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
