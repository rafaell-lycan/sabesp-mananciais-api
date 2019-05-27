import { env, mainModule } from 'process';
import { join, basename } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { Logger, createLogger, LoggerOptions, format, transports } from 'winston';

const logDir = 'logs';
const filename = join(logDir, 'app.log');
const level = env.LOG_LEVEL || 'debug';

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const outputFormat = (info: any) => `${info.timestamp} ${info.level}: ${info.message}`;

const options: LoggerOptions = {
  level,
  exitOnError: false,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(outputFormat)
  ),
  transports: [
    new transports.Console({
      handleExceptions: true,
      humanReadableUnhandledException: true,
      prettyPrint: true,
      colorize: true,
      json: true,
      format: format.combine(format.colorize(), format.printf(outputFormat)),
    }),
    new transports.File({ handleExceptions: true, filename }),
  ],
};

const logger: Logger = createLogger(options);

export default logger;
