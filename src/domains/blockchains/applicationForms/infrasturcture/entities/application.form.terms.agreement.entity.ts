import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, VersionColumn } from 'typeorm';
import { BaseEntity } from '@/libs/database/orm/typeorm/base/base.entity';
import { TERMS_AGREEMENT_NAME } from './enums';



@Entity( { name: 'application_form_terms_agreement' } )
export class ApplicationFormTermsAgreement extends BaseEntity {
  @ApiProperty()
  @Column( {
    type   : 'enum',
    enum   : TERMS_AGREEMENT_NAME,
    comment: '약관 동의 종류',
  } )
  name: TERMS_AGREEMENT_NAME;
  
  @ApiProperty()
  @Column( { length: 2000, comment: '약관 동의 내용' } )
  contents: string;
  
  @ApiProperty()
  @Column( { default: true, comment: '약관 동의 필수 여부' } )
  required: boolean;
  
  @ApiProperty()
  @Column( { comment: '체크 박스 place holder' } )
  required_contents: string;
  
  @ApiProperty()
  @Column( { comment: '활성화 상태 여부' } )
  is_active: boolean;
  
  @ApiProperty()
  @VersionColumn( { type: 'bigint', comment: '약관 동의 버전' } )
  version: string;
}