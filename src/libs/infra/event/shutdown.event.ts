import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import * as process from 'process';



@Injectable()
export class ShutdownEvent implements OnModuleDestroy {
  private readonly logger: Logger = new Logger(ShutdownEvent.name)
  private readonly PROCESS_ID: string
  
  constructor() {
    this.PROCESS_ID = `${process.pid}-${process.ppid}`
  }
  
  
  async onModuleDestroy() {
    this.logger.log(`[onModuleDestroy]: Process id: ${this.PROCESS_ID}`)
    
    
    
  }
}