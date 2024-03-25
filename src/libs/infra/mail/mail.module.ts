import { Module } from '@nestjs/common';
import { CommonConfigService } from '../../config/common.config.service';
import { AzureCommunicationService } from '@/libs/infra/cloud/azure/mail/azure.communication.service';
import { MailService } from './mail.srevice';



@Module( {
  imports  : [],
  providers: [
    CommonConfigService,
    MailService,
    AzureCommunicationService,
  ],
} )
export class MailModule {
}