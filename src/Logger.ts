import {LogLevel} from './LogLevel';

export class Logger {
  constructor(
    public label: string,
    public logLevel: LogLevel,
    private console: Console
  ) {
  }

  public isEnabled(level: LogLevel) {
    return this.logLevel >= level;
  }

  public log(...args: any[]): void {
    if(this.isEnabled(LogLevel.LOG)) {
      this.console.log(this.label, ...args);
    }
  }

  public error(...args: any[]): void {
    if(this.isEnabled(LogLevel.ERROR)) {
      this.console.error(this.label, ...args);
    }
  }

  public warn(...args: any[]): void {
    if (this.isEnabled(LogLevel.WARN)) {
      this.console.warn(this.label, ...args);
    }
  }

  public info(...args: any[]): void {
    if (this.isEnabled(LogLevel.INFO)) {
      this.console.info(this.label, ...args);
    }
  }
}
