/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const hostname = app.get('host');
// retrive port 3030
const port = app.get('port');
// starting server up
const server = app.listen(port, hostname);

// if there is an error
process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

// if there is no error
server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', hostname, port)
); 

// this the entry point of our nodejs application 