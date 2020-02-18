import log4js from 'log4js';
import Production from '../constants/prod';

const Logger = (identifier) => {
  const logger = log4js.getLogger(identifier);
  const isProduction = Production === 'true';
  logger.level = isProduction ? 'info' : 'debug';
  return logger;
};

export default Logger;
