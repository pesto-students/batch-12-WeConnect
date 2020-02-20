#!/usr/bin/env node

/**
 * Module dependencies.
 */
import debugLib from 'debug';
import http from 'http';
import db from './db';
import app from './app';
import constants from './constants/port';

const debug = debugLib('we-connect:server');

/**
 * Get port from environment and store in Express.
 */

// eslint-disable-next-line no-use-before-define
const port = normalizePort(constants.PORT || '4000');
app.set('port', port);

/**
 * Create HTTP server.
 */

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

function normalizePort(val) {
  const portNumber = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(portNumber)) {
    // named pipe
    return val;
  }

  if (portNumber >= 0) {
    // port number
    return portNumber;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
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
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

server.on('error', onError);
server.on('listening', onListening);
