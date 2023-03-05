import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { appendFile, existsSync, mkdirSync, renameSync, statSync } from 'fs';
import { join } from "path";

enum LogLevel {
  error,
  warn,
  log,
  debug,
  verbose,
}

@Injectable()
export class LoggerService extends ConsoleLogger {
  private loggerLevel: number;
  private logFile: string;
  private logErrorFile: string;
  private readonly LOGGER_FILE_SIZE: number;

  constructor(private readonly configService: ConfigService) {
    super();

    const SERVER_ROOT_DIR = join(__dirname, '..', '..');
    const folder = SERVER_ROOT_DIR + '/logs';
    if (!existsSync(folder)) {
      mkdirSync(folder);
    }

    this.LOGGER_FILE_SIZE = +this.configService.get<string>('LOGGER_FILE_SIZE');
    this.loggerLevel =
      process.env.LOGGER_LEVEL in LogLevel ? +process.env.LOGGER_LEVEL : 3;

    this.logFile = SERVER_ROOT_DIR + '/logs/app.log';
    this.logErrorFile = SERVER_ROOT_DIR + '/logs/error.log';
  }

  error(message: string, ...optionalParams: any[]) {
    if (!this.isLevelEnable(LogLevel.error)) return;

    this.writeLog(LogLevel.error, message);
    if (optionalParams.length == 0) super.error(message);
    else super.error(message, optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    if (!this.isLevelEnable(LogLevel.warn)) return;

    this.writeLog(LogLevel.warn, message);
    if (optionalParams.length == 0) super.warn(message);
    else super.warn(message, optionalParams);
  }

  log(message: string, ...optionalParams: any[]) {
    if (!this.isLevelEnable(LogLevel.log)) return;

    this.writeLog(LogLevel.log, message);
    if (optionalParams.length == 0) super.log(message);
    else super.log(message, optionalParams);
  }

  verbose(message: string, ...optionalParams: any[]) {
    if (!this.isLevelEnable(LogLevel.verbose)) return;

    this.writeLog(LogLevel.verbose, message);
    if (optionalParams.length == 0) super.verbose(message);
    else super.verbose(message, optionalParams);
  }

  debug(message: string, ...optionalParams: any[]) {
    if (!this.isLevelEnable(LogLevel.debug)) return;

    this.writeLog(LogLevel.debug, message);
    if (optionalParams.length == 0) super.debug(message);
    else super.debug(message, optionalParams);
  }

  private isLevelEnable(logLevel: number): boolean {
    return logLevel <= this.loggerLevel;
  }

  private writeLog(level: number, message: string) {
    const formatedMessage = super.getTimestamp() + ' - ' + message + '\n';

    this.writeToFile(this.logFile, formatedMessage);

    if (level == 0) this.writeToFile(this.logErrorFile, formatedMessage);
  }

  private writeToFile(fileName: string, message: string) {
    try {
      const stats = statSync(fileName);
      if (stats.size / 1024 > this.LOGGER_FILE_SIZE) {
        renameSync(fileName, this.renameFile(fileName));
      }
    } catch (err) {}

    appendFile(fileName, message, { flag: 'a+' }, (err) => {
      if (err) super.error(err.message);
    });
  }

  private renameFile(fileName: string) {
    const fileNamePart = fileName.split('.log');
    fileNamePart.push(Date.now().toString(), '.log');
    return fileNamePart.join('');
  }
}
