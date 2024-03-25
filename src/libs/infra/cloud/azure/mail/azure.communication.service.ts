import { CommonConfigService } from '@/libs/config/common.config.service';
import {
  EmailAddress,
  EmailClient,
  EmailContent,
  EmailSendResponse,
} from '@azure/communication-email';
import {PollerLike, PollOperationState} from '@azure/core-lro'
import {BadGatewayException, Injectable, Logger} from '@nestjs/common';

@Injectable()
export class AzureCommunicationService {
  private readonly logger: Logger = new Logger(AzureCommunicationService.name)
  private AZURE_EMAIL_CONNECTION_STRING: string;
  private emailClient: EmailClient;
  
  constructor(
    private readonly commonConfigService: CommonConfigService
  ) {
    const azureAccessConfig = this.commonConfigService.accessAzureConfig
    this.AZURE_EMAIL_CONNECTION_STRING = azureAccessConfig.email.connectionString
    
    this.connectEmailService()
  }
  
  private connectEmailService() {
    try {
      if (this.AZURE_EMAIL_CONNECTION_STRING) {
        this.emailClient = new EmailClient(this.AZURE_EMAIL_CONNECTION_STRING);
        this.logger.debug('AZURE_EMAIL is connected');
      }
    } catch (error) {
      this.logger.error(`[connectEmailService]: ${error}`);
    }
  }
  
  async sendEmail(
    from: string,
    to: EmailAddress[],
    content: EmailContent,
  ): Promise<
    PollerLike<PollOperationState<EmailSendResponse>, EmailSendResponse>
  > {
    const result: PollerLike<PollOperationState<EmailSendResponse>, EmailSendResponse> =
      await this.emailClient.beginSend({
        senderAddress: from,
        content: content,
        recipients: {to},
      });
    
    if(result.getResult()?.error) throw new BadGatewayException(`[sendEmail]: 이메일 전송에 실패했습니다`)
    return result;
  }
}
