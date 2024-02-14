import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RegisterDappDto } from './dtos/register-dapp.dto';
import { Dapp } from './entities/dapp.entity';



@Injectable()
export class DappRepository {
  protected readonly logger: Logger = new Logger( DappRepository.name );
  
  
  constructor(
    private readonly dataSource: DataSource,
  ) {
  }
  
  
  async registerDapp( registerDapp: RegisterDappDto ): Promise<Dapp> {
    const newDappApplication: Dapp =
      await this.dataSource.manager.save( Dapp, registerDapp );
    
    this.logger.debug( 'newDappApplication :', newDappApplication.name );
    return newDappApplication;
  }
  
  
  async findDappByVerificationCode( code: string ): Promise<Dapp> {
    const dapp: Dapp = await this.dataSource.manager.findOne( Dapp, {
      relations: {
        auth: true
      },
      where: {
        auth: { verification_code: code }
      },
    } );
    
    return dapp;
  }
}