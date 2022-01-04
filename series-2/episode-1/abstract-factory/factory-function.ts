interface ILogger {
  info(...args: any[]): void;
  debug(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

function productionLogger(): ILogger {
  return {
    info: (...args: any[]): void => {},
    debug: (...args: any[]): void => {},
    warn: (...args: any[]): void => {
      console.warn(...args);
    },
    error: (...args: any[]): void => {
      console.error(...args);
    },
  };
}

function developmentLogger(): ILogger {
  return {
    info: (...args: any[]): void => {
      console.info(...args);
    },
    debug: (...args: any[]): void => {
      console.debug(...args);
    },
    warn: (...args: any[]): void => {
      console.warn(...args);
    },
    error: (...args: any[]): void => {
      console.error(...args);
    },
  };
}

export const getLogger = (): ILogger =>
  (process.env.NODE_ENV === "production"
    ? productionLogger
    : developmentLogger)();
