/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
// retrieve host name
const hostname = 'scannar-server-second.appspot.com';

const port = process.env.PORT;

const server = app.listen(port || 3030);

// if there is an error
process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: Promise ', p, reason));

// if there is no error
server.on('listening', () => logger.info('Feathers application started on http://%s', hostname));

// this the entry point of our nodejs application
