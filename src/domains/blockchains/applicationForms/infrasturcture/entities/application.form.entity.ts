import { IsEnum, IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '@/libs/database/orm/typeorm/base/base.entity';
import { Account } from '../../../wallets/entities/account.entity';
import { ApplicationFormContract } from './application.form.contract.entity';
import { ApplicationFormDapp } from './application.form.dapp.entity';
import { ApplicationFormProcessLog } from './application.from.process.log.entity';
import { APPLICATION_PROCESS_STATUS } from './enums';



@Entity( { name: 'application_form' } )
export class ApplicationForm extends BaseEntity {
  /*
   * Columns
   * */
  @IsEnum( APPLICATION_PROCESS_STATUS )
  @IsNotEmpty()
  @Column( {
    type   : 'enum',
    enum   : APPLICATION_PROCESS_STATUS,
    default: APPLICATION_PROCESS_STATUS.APPLY,
    comment: '신청서 진행 상태',
  } )
  process_status: APPLICATION_PROCESS_STATUS;
  
  @Column( { unique: true, comment: '신청서 번호, ex) 00001' } )
  application_form_number: number;
  
  @Column( { comment: '약관 동의 여부' } )
  terms_agreement: boolean;
  
  @Column( { type: 'timestamp', comment: '신청서 승인 이 후 이메일 전송 보낸 날짜' } )
  email_sent_at: Date;
  
  
  /*
   * FK Columns
   * */
  @Column()
  application_dapp_form_id: string;
  
  @Column()
  account_id: string;
  
  /*
   * Relations
   * */
  
  @OneToOne(
    () => ApplicationFormDapp,
    ( applicationFormDapp ) => applicationFormDapp.application_form,
    {
      cascade: true,
    },
  )
  applicationFormDapp: ApplicationFormDapp;
  
  @OneToMany(
    () => ApplicationFormProcessLog,
    ( applicationFormProcessLog ) => applicationFormProcessLog.application_form,
  )
  process_logs: ApplicationFormProcessLog[];
  
  @OneToMany(
    () => ApplicationFormContract,
    ( applicationContractForm ) => applicationContractForm.application_form,
    {
      cascade: true,
    },
  )
  application_form_contracts: ApplicationFormContract[];
  
  @ManyToOne( () => Account )
  @JoinColumn( { name: 'account_id' } )
  account: Account;
}