import { ApplicationFormCommandHandlers } from '@/blockchains/applicationForms/application/commands/handlers';
import { RootApplicationFormEventHandlers } from '@/blockchains/applicationForms/application/events/handlers';
import { ApplicationFormSagas } from '@/blockchains/applicationForms/application/events/sagas';
import {
  ApplicationFormDapp,
} from '@/blockchains/applicationForms/infrasturcture/entities/application.form.dapp.entity';
import { ApplicationForm } from '@/blockchains/applicationForms/infrasturcture/entities/application.form.entity';
import {
  RootApplicationForm,
  RootApplicationFormSchema,
} from '@/blockchains/applicationForms/infrasturcture/models/root.application.form.model';
import { CommonConfigService } from '@/libs/config/common.config.service';
import { AzureCommunicationService } from '@/libs/infra/cloud/azure/mail/azure.communication.service';
import { AzureStorageService } from '@/libs/infra/cloud/azure/storage/azure.storage.service';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApplicationFormContract,
  ApplicationFormContractAudit,
  ApplicationFormContractFunctionSignature,
  ApplicationFormProcessLog,
  ApplicationFormTermsAgreement,
} from 'src/domains/blockchains/applicationForms/infrasturcture/entities';
import { Account } from '../wallets/entities/account.entity';
import { ApplicationFormsService } from './application/services/application.forms.service';
import { ApplicationFormsRepository } from './infrasturcture/application.forms.repository';
import { ApplicationFormsController } from './presentation/controllers/application.forms.controller';



@Module( {
  imports    : [
    CqrsModule,
    TypeOrmModule.forFeature( [
      Account,
      ApplicationForm,
      ApplicationFormDapp,
      ApplicationFormContract,
      ApplicationFormContractAudit,
      ApplicationFormContractFunctionSignature,
      ApplicationFormProcessLog,
      ApplicationFormTermsAgreement,
    ] ),
    MongooseModule.forFeature( [ {
      name: RootApplicationForm.name,
      schema: RootApplicationFormSchema
    } ] ),
  ],
  controllers: [
    ApplicationFormsController,
  ],
  providers  : [
    CommonConfigService,
    ApplicationFormsService,
    ApplicationFormsRepository,
    
    /* CQRS Providers */
    ApplicationFormSagas,
    ...ApplicationFormCommandHandlers,
    ...RootApplicationFormEventHandlers,
    
    /* Infra Providers */
    AzureStorageService,
    AzureCommunicationService,
  ],
} )
export class ApplicationFormsModule {
}
