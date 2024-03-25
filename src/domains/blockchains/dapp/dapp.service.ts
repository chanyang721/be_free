import { Injectable, NotFoundException } from '@nestjs/common';
import { CommonConfigService } from '../../../libs/config/common.config.service';
import { AzureStorageService } from '@/libs/infra/cloud/azure/storage/azure.storage.service';
import { MailService } from '../../../libs/infra/mail/mail.srevice';
import { DappRepository } from './dapp.repository';
import { DappDto } from './dtos/dapp.dto';
import { RegisterDappDto } from './dtos/register-dapp.dto';
import { SendMailDto } from './dtos/send-mail.dto';
import { Dapp } from './entities/dapp.entity';



@Injectable()
export class DappService {
  private readonly CONTAINER_NAME: string;
  
  
  constructor(
    private readonly commonConfigService: CommonConfigService,
    private readonly dappRepository: DappRepository,
    private readonly azureStorageService: AzureStorageService,
    private readonly mailService: MailService,
  ) {
    const AZURE_CONFIG = this.commonConfigService.accessAzureConfig;
    this.CONTAINER_NAME = AZURE_CONFIG.storage.containerName;
  }
  
  
  async registerDapp( logo: Express.Multer.File, registerDappDto: RegisterDappDto ): Promise<DappDto> {
    const path = `default`;
    const logoKey = await this.azureStorageService.uploadFile( this.CONTAINER_NAME, path, logo.originalname, logo.buffer );
    
    const newDapp: Dapp = await this.dappRepository.registerDapp( {
      ...registerDappDto,
      logo: logoKey,
    } );
    
    return new DappDto( newDapp );
  }
  
  
  async sendMail( sendMailDto: SendMailDto ): Promise<void> {
    // 제목, 내용 template 가져오기
    return this.mailService.sendMail( sendMailDto.to, '제목이에요', `<div>난 내용이야<div>` );
  }
  
  
  async findDappByVerificationCode( code: string ): Promise<DappDto> {
    const dapp: Dapp = await this.dappRepository.findDappByVerificationCode( code );
    
    if ( !dapp ) throw new NotFoundException( '존재하지 않는 인증번호 입니다.' );
    return new DappDto( dapp );
  }
}
