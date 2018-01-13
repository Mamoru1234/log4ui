import { LogLevel } from './LogLevel';
import { Logger } from './Logger';
import { StoreAdapter } from './StoreAdapter';
import { LocalStorageAdapter } from './LocalStorageAdapter';

declare type LoggersMap = {[key: string]: Logger};
declare type LoggersStateMap = {[key: string]: LogLevel};
export declare type LabelPredicate = (label: string) => boolean;

const stubTrue = () => true;

export class LogManager {
    private loggers: LoggersMap = {};
    constructor(
        private storeKey: string,
        private storeAdapter: StoreAdapter = new LocalStorageAdapter()
    ) {
        this.loadLoggers();
    }

  private loadLoggers(): void {
    const data = this.storeAdapter.load(this.storeKey);
    if (!data) return;
    const loggersStateMap: LoggersStateMap = JSON.parse(data);
    for(let label in loggersStateMap) {
      this.loggers[label] = new Logger(label, loggersStateMap[label]);
    }
  }

  private saveLoggers(): void {
    const data: LoggersStateMap = {};
    for(let label in this.loggers) {
      data[label] = this.loggers[label].logLevel;
    }
    this.storeAdapter.save(this.storeKey, JSON.stringify(data));
  }

  public setLogLevel(label: string, logLevel: LogLevel): void {
    const logger = this.loggers[label];
    if (!logger) {
        throw new Error(`Unknown logger [${label}]`);
    }
    logger.logLevel = logLevel;
    this.saveLoggers();
  }

  public enable(label: string): void {
    this.setLogLevel(label, LogLevel.LOG);
  }

  public disable(label: string): void {
    this.setLogLevel(label, LogLevel.WARN);
  }

  public setAllLogLevel(logLevel: LogLevel, predicate: LabelPredicate = stubTrue): void {
    for(let label in this.loggers) {
      if (predicate(label)) {
        this.loggers[label].logLevel = logLevel;

      }
    }
  }

  public hideAll(): void {
    this.setAllLogLevel(LogLevel.WARN);
  }

  public getInstance(flag: string): Logger {
    if (!this.loggers[flag]) {
      this.loggers[flag] = new Logger(flag, LogLevel.WARN);
    }
    return this.loggers[flag];
  }
}
