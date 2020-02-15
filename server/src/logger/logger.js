import log4js from 'log4js';
import IsProduction from '../constants/prod';

const Logger = (identifier) => {
  const logger = log4js.getLogger(identifier);
  logger.level = IsProduction ? 'info' : 'debug';
  return logger;
};

export default Logger;
