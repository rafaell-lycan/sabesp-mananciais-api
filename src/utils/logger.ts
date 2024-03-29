import { createLogger, config, format, transports } from 'winston';

const options = {
  // logs the error but don't terminate the pid
  exitOnError: false,
  levels: config.syslog.levels,
  format: format.combine(
    format.label({ label: 'server' }),
    format.colorize(),
    format.simple(),
    format.timestamp(),
    format.printf(({ level, message, label, timestamp }) => {
      return `[${label}:${level}] ${message} (${timestamp})`
    })
  ),
  transports: [new transports.Console({ level: 'info' })],
};

export const logger = createLogger(options);
