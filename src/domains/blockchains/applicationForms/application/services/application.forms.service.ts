import { RootApplicationForm } from '@/blockchains/applicationForms/infrasturcture/models/root.application.form.model';
import {
  ApplicationFormDappDto,
  RegisterApplicationFormDto,
  TermAgreementDto,
} from '@/blockchains/applicationForms/presentation/dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApplicationFormTermsAgreement } from 'src/domains/blockchains/applicationForms/infrasturcture/entities';
import { DappDto } from '@/blockchains/dapp/dtos/dapp.dto';
import { CommonConfigService } from '@/libs/config/common.config.service';
import { AzureStorageService } from '@/libs/infra/azure/storage/azure.storage.service';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApplicationForm } from '@/blockchains/applicationForms/infrasturcture/entities/application.form.entity';
import { ApplicationFormsRepository } from '../../infrasturcture/application.forms.repository';



@Injectable()
export class ApplicationFormsService {
  private readonly logger: Logger = new Logger( ApplicationFormsService.name );
  private readonly containerName: string;
  
  
  constructor(
    private readonly commonConfigService: CommonConfigService,
    private readonly applicationFormRepository: ApplicationFormsRepository,
    private readonly storageService: AzureStorageService,
  ) {
    const storageConfig = this.commonConfigService.accessAzureConfig;
    this.containerName = storageConfig.storage.containerName;
  }
  
  @Cron(CronExpression.EVERY_SECOND)
  async softDeleteExpiredApplicationForm(): Promise<void> {
    console.log('[softDeleteExpiredApplicationForm]: CronExpression.EVERY_SECOND')
  }
  
  async getApplicationFormById( applicationFormId: string ): Promise<ApplicationForm> {
    const applicationForm = await this.applicationFormRepository.findApplicationFormById( applicationFormId );
    
    this.logger.debug( `[getApplicationFormById]: ${ applicationForm.id }` );
    return applicationForm;
  }
  
  
  async registerApplicationForm(
    files: Express.Multer.File[],
    registerApplicationFormDto: RegisterApplicationFormDto,
  ): Promise<any> {
    const newApplicationForm: ApplicationForm = await this.applicationFormRepository.registerApplicationForm();
    
    this.logger.debug( 'newApplicationForm: ', newApplicationForm );
    return newApplicationForm;
  }
  
  
  public async getTeemAgreements( version: number ): Promise<TermAgreementDto[]> {
    const terms: ApplicationFormTermsAgreement[] =
      await this.applicationFormRepository.findTermsAgreements( version );
    
    if ( !terms.length ) throw new NotFoundException( '약관을 찾을 수 없습니다.' );
    return terms.map( ( term ) => new TermAgreementDto( term ) );
  }
  
  
  async registerApplicationFormDapp(
    file: Express.Multer.File,
    registerDappApplicationForm: ApplicationFormDappDto,
  ): Promise<ApplicationFormDappDto> {
    try {
      /* upload file */
      const uploadIconFileUrl = await this.storageService.uploadFile(
        this.containerName,
        registerDappApplicationForm.application_form_id,
        file.originalname,
        file.buffer,
      );
      
      /* save dapp application form */
      const newApplicationFormDapp: ApplicationFormDappDto =
        await this.applicationFormRepository.registerDappApplicationForm( {
          ...registerDappApplicationForm,
          logo: uploadIconFileUrl,
        } );
      
      if ( !newApplicationFormDapp ) throw new BadRequestException( '신청서를 생성할 수 없습니다' );
      return new ApplicationFormDappDto( newApplicationFormDapp );
    }
    catch ( error ) {
      this.logger.debug( error );
      /* delete file if failed */
      await this.storageService.deleteFile(
        this.containerName,
        registerDappApplicationForm.application_form_id,
      );
    }
  }
}
