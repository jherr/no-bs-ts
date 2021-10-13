interface ILogger {
  info(...args: any[]): void;
  debug(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

class ProductionLogger implements ILogger {
  info(...args: any[]): void {}
  debug(...args: any[]): void {}
  warn(...args: any[]): void {
    console.warn(...args);
  }
  error(...args: any[]): void {
    console.error(...args);
  }
}

class DevelopmentLogger extends ProductionLogger {
  info(...args: any[]): void {
    console.info(...args);
  }
  debug(...args: any[]): void {
    console.debug(...args);
  }
  warn(...args: any[]): void {
    console.warn(...args);
  }
  error(...args: any[]): void {
    console.error(...args);
  }
}

export class Factory {
  static getLogger(): ILogger {
    return new (
      process.env.NODE_ENV === "production"
        ? ProductionLogger
        : DevelopmentLogger
    )();
  }
}
