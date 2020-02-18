#!/usr/bin/env node

/**
 * Module dependencies.
 */
import debugLib from 'debug';
import http from 'http';

import app from './app';
import db from './db';
import constants from './constants/port';

const debug = debugLib('we-connect:server');

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(constants.PORT || '4000');
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
const server = http.createServer(app);

db.dbConnect()
  .then(() => {
    try {
      server.listen(port);
    } catch (err) {
      debug(err);
    }
  })
  .catch((err) => debug(err));

/**
 * Normalize a port into a number, string, or false.
 */

/**
 * Event listener for HTTP server 'error' event.
 */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server 'listening' event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};

server.on('error', onError);
server.on('listening', onListening);
