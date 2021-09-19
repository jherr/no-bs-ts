class Log {
  private _log: string = "";

  public static instance: Log = new Log();

  private constructor() {}

  public log(msg: string): void {
    this._log += `${msg}\n`;
  }

  public dumpLog(): void {
    console.log(this._log);
  }
}

// const log = new Log();
Log.instance.log("foo");
Log.instance.dumpLog();
