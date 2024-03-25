import { AzureCommunicationService } from '@/libs/infra/cloud/azure/mail/azure.communication.service';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';



export class FindRootApplicationFormEvent {
  constructor(
    public readonly applicationFormId: string,
    public readonly processStatus: string,
  ) {
  }
}


@EventsHandler( FindRootApplicationFormEvent )
export class FindRootApplicationFormEventHandler
  implements IEventHandler<FindRootApplicationFormEvent> {
  constructor(
    private emailService: AzureCommunicationService
  ) {
  }
  
  
  async handle( event: FindRootApplicationFormEvent ) {
    const { applicationFormId, processStatus } = event;
    // const changedRootApplicationForm =
    //   new this.rootApplicationFormModel();
    //
    // await changedRootApplicationForm.updateOne( {
    //   id: applicationFormId,
    //   process_status: processStatus
    // } );
    
    // send email to applicant in root application from model
  }
}