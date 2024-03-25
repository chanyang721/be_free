import { ApplicationFormsRepositoryAdaptor } from '@/blockchains/applicationForms/infrasturcture/adaptor';
import {
  ApplicationForm,
  ApplicationFormDapp,
  ApplicationFormTermsAgreement,
} from '@/blockchains/applicationForms/infrasturcture/entities';
import { RootApplicationForm } from '@/blockchains/applicationForms/infrasturcture/models/root.application.form.model';
import { ApplicationFormDappDto } from '@/blockchains/applicationForms/presentation/dtos';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataSource } from 'typeorm';



@Injectable()
export class ApplicationFormsRepository
  implements ApplicationFormsRepositoryAdaptor {
  
  private readonly logger: Logger = new Logger( ApplicationFormsRepository.name );
  
  
  constructor(
    private readonly dataSource: DataSource,
    @InjectModel( RootApplicationForm.name )
    private rootApplicationFormModel: Model<RootApplicationForm>,
  ) {
  }
  
  
  async findApplicationFormById( applicationFormId: string ): Promise<ApplicationForm> {
    const applicationForm: ApplicationForm =
      await this.dataSource.manager.findOne( ApplicationForm, {
        where: { id: applicationFormId },
      } );
    
    return applicationForm
  }
  
  
  async registerApplicationForm(): Promise<ApplicationForm> {
    
    return;
  }
  
  
  async findTermsAgreements( version: string ): Promise<ApplicationFormTermsAgreement[]> {
    const terms: ApplicationFormTermsAgreement[] =
      await this.dataSource.manager.find( ApplicationFormTermsAgreement, {
        where: { is_active: true, version: version },
      } );
    
    return terms;
  }
  
  
  public async registerDappApplicationForm( registerDappApplicationForm: ApplicationFormDappDto ): Promise<ApplicationFormDapp> {
    const newDappApplicationForm: ApplicationFormDapp =
      await this.dataSource.manager.save( ApplicationFormDapp, registerDappApplicationForm );
    
    return newDappApplicationForm;
  }
}