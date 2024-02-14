import { DappAuth } from '@/blockchains/dapp/entities/dapp.auth.entity';
import { BaseEntity } from '@/libs/database/orm/typeorm/base/base.entity';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ApplicationForm } from './application.form.entity';



@Entity( { name: 'application_form_dapp' } )
export class ApplicationFormDapp extends BaseEntity {
  /*
   * Dapp Columns
   * */
  @IsString()
  @IsNotEmpty()
  @MinLength( 1 )
  @MaxLength( 60 )
  @Column( { length: 60, comment: 'dapp 이름' } )
  name: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength( 1 )
  @MaxLength( 255 )
  @Column( { length: 255, comment: 'dapp service url' } )
  url: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength( 1 )
  @MaxLength( 200 )
  @Column( { length: 200, comment: 'dapp logo image url' } )
  logo: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength( 1 )
  @MaxLength( 1000 )
  @Column( { length: 1000, comment: 'dapp 설명' } )
  description: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength( 1 )
  @MaxLength( 200 )
  @Column( { length: 200, comment: '리워드 수령 주소' } )
  claim_address: string;
  
  /*
   * Application Dapp Columns
   * */
  @Column( { comment: 'dapp 승인 후 연결' } )
  dapp_id?: string;
  
  @Column( { comment: '신청서 id' } )
  application_form_id: string;
  
  /*
   * Relations
   * */
  @OneToOne( () => ApplicationForm )
  @JoinColumn( { name: 'application_form_id' } )
  application_form: ApplicationForm;
  
  @ManyToOne( () => DappAuth )
  dapp_auth: DappAuth;
}