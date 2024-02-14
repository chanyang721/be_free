import {
  FindRootApplicationFormEvent,
} from '@/blockchains/applicationForms/application/events/handlers/find.root.application.form.event';
import {
  ApplicationForm,
  ApplicationFormContract,
  ApplicationFormDapp,
  ApplicationFormProcessLog,
} from '@/blockchains/applicationForms/infrasturcture/entities';
import { APPLICATION_PROCESS_STATUS } from '@/blockchains/applicationForms/infrasturcture/entities/enums';
import { Account } from '@/blockchains/wallets/entities/account.entity';
import { BaseModel, Timestamps } from '@/libs/database/orm/mongoose/base/mongoose/base.model';
import { AggregateRoot } from '@nestjs/cqrs';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';



export type IRootApplicationForm = Omit<ApplicationForm,
  | 'created_at'
  | 'updated_at'
  | 'application_dapp_form_id'
  | 'account_id'
>

export type RootApplicationFormDocument = HydratedDocument<RootApplicationForm>;

@Schema( { collection: 'ROOT_APPLICATION_FORM' } )
export class RootApplicationForm extends AggregateRoot
  implements IRootApplicationForm, BaseModel {
  
  constructor(
    private readonly applicationFormId: string,
  ) {
    super();
    this.autoCommit = true;
  }
  
  @Prop()
  id: string;
  
  /*
   * Props
   * */
  @Prop()
  process_status: APPLICATION_PROCESS_STATUS;
  
  @Prop()
  application_form_number: number;
  
  @Prop()
  terms_agreement: boolean;
  
  @Prop()
  email_sent_at: Date;
  
  /*
   * Mysql Relations
   * */
  @Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'ApplicationFormDapp' } )
  applicationFormDapp: ApplicationFormDapp;
  
  @Prop( [ { type: mongoose.Schema.Types.ObjectId, ref: 'ApplicationFormProcessLog' } ] )
  process_logs: ApplicationFormProcessLog[];
  
  @Prop( [ { type: mongoose.Schema.Types.ObjectId, ref: 'ApplicationFormContract' } ] )
  application_form_contracts: ApplicationFormContract[];
  
  @Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'Account' } )
  account: Account;
  
  @Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'Timestamps' } )
  timestamps: Timestamps;
  
  
  async getRootApplicationForm(
    processStatus: APPLICATION_PROCESS_STATUS,
  ): Promise<void> {
    this.apply( new FindRootApplicationFormEvent( this.id, processStatus ) );
  }
}


export const RootApplicationFormSchema = SchemaFactory.createForClass( RootApplicationForm );