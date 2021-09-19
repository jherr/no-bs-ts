interface ILogger {
  info(str: string): void;
  debug(str: string): void;
  warn(str: string): void;
  error(str: string): void;
}

function productionLogger(): ILogger {
  return {
    info: (str: string): void => {},
    debug: (str: string): void => {},
    warn: (str: string): void => {
      console.warn(str);
    },
    error: (str: string): void => {
      console.error(str);
    },
  };
}

function developmentLogger(): ILogger {
  return {
    info: (str: string): void => {
      console.info(str);
    },
    debug: (str: string): void => {
      console.debug(str);
    },
    warn: (str: string): void => {
      console.warn(str);
    },
    error: (str: string): void => {
      console.error(str);
    },
  };
}

export const getLogger = (): ILogger =>
  (process.env.NODE_ENV === "production"
    ? productionLogger
    : developmentLogger)();
