import { LogLevel } from './LogLevel';

export class Logger {
  constructor(
    private label: string,
    public logLevel: LogLevel
  ) {
  }

  public log(...args: any[]): void {
    if(this.logLevel >= LogLevel.LOG) {
      console.log(this.label, ...args);
    }
  }

  public error(...args: any[]): void {
    if(this.logLevel >= LogLevel.ERROR) {
      console.error(this.label, ...args);
    }
  }

  public warn(...args: any[]): void {
    if (this.logLevel >= LogLevel.WARN) {
      console.warn(this.label, ...args);
    }
  }

  public info(...args: any[]): void {
    if (this.logLevel >= LogLevel.INFO) {
      console.info(this.label, ...args);
    }
  }
}
