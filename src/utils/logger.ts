import { createLogger, config, format, transports } from 'winston';

const options = {
  levels: config.syslog.levels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.label({ label: 'server' }),
  ),
  transports: [
    new transports.Console({
      handleExceptions: true,
      format: format.combine(
        format.colorize(),
        format.prettyPrint(),
        format.json(),
        format.printf(({ level, message, label, timestamp }) => {
          return `[${label}:${level}] ${message} (${timestamp})`
        })
      ),
    }),
    // new transports.File({ handleExceptions: true, filename: `${__dirname}/logs/app.log` }),
  ],
};

export const logger = createLogger(options);
