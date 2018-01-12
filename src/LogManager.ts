import { LogLevel } from './LogLevel';
import { Logger } from './Logger';
import { StoreAdapter } from './StoreAdapter';
import { LocalStorageAdapter } from './LocalStorageAdapter';

declare type LoggersMap = {[key: string]: Logger};
declare type LoggersStateMap = {[key: string]: LogLevel};

export class LogManager {
  private loggers: LoggersMap = {};
  constructor(
    private storeAdapter: StoreAdapter = new LocalStorageAdapter(),
    private storeKey: string
  ) {
    this.loadLoggers();
  }

  private loadLoggers(): void {
    const data: LoggersStateMap = this.storeAdapter.load(this.storeKey);
    for(let flag in data) {
      this.loggers[flag] = new Logger(flag, data[flag]);
    }
  }

  private saveLoggers(): void {
    const data: LoggersStateMap = {};
    for(let flag in this.loggers) {
      data[flag] = this.loggers[flag].logLevel;
    }
    this.storeAdapter.save(this.storeKey, data);
  }

  public enable(flag: string): void {
    const logger = this.loggers[flag];
    if (!logger) {
      throw new Error(`Unknow logger [${flag}]`);
    }
    logger.logLevel = LogLevel.LOG;
    this.saveLoggers();
  }

  public disable(flag: string): void {
    const logger = this.loggers[flag];
    if (!logger) {
      throw new Error(`Unknown logger [${flag}]`);
    }
    logger.logLevel = LogLevel.NONE;
    this.saveLoggers();
  }

  public setLogLevel(flag: string, logLevel: LogLevel): void {
    const logger = this.loggers[flag];
    if (!logger) {
      throw new Error(`Unknown logger [${flag}]`);
    }
    logger.logLevel = logLevel;
    this.saveLoggers();
  }

  public hideAll(): void {
    for(let flag in this.loggers) {
      this.loggers[flag].logLevel = LogLevel.NONE;
    }
    this.saveLoggers();
  }

  public getInstance(flag: string): Logger {
    if (!this.loggers[flag]) {
      this.loggers[flag] = new Logger(flag, LogLevel.NONE);
    }
    return this.loggers[flag];
  }
}
