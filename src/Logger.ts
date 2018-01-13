import { LogLevel } from './LogLevel';

export class Logger {
  constructor(
    private label: string,
    public logLevel: LogLevel,
    private console: Console
  ) {
  }

  public log(...args: any[]): void {
    if(this.logLevel >= LogLevel.LOG) {
      this.console.log(this.label, ...args);
    }
  }

  public error(...args: any[]): void {
    if(this.logLevel >= LogLevel.ERROR) {
      this.console.error(this.label, ...args);
    }
  }

  public warn(...args: any[]): void {
    if (this.logLevel >= LogLevel.WARN) {
      this.console.warn(this.label, ...args);
    }
  }

  public info(...args: any[]): void {
    if (this.logLevel >= LogLevel.INFO) {
      this.console.info(this.label, ...args);
    }
  }
}
