import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from '@/users/infrastructure/entities';
import { BaseEntity } from '@/libs/database/orm/typeorm/base/base.entity';
import { AuthenticationPlatforms } from './enums/auth.enum.platform';



@Entity( { name: 'auth' } )
export class AuthEntity extends BaseEntity {
  /**
   * Table Columns
   */
  @Column( {
    type    : 'varchar',
    length  : 100,
    unique  : true,
    nullable: false,
    comment : '인증 서버 유저 아이디',
  } )
  uid: string;
  
  @Column( {
    type   : 'enum',
    enum   : AuthenticationPlatforms,
    default: AuthenticationPlatforms.FIREBASE,
    comment: '인증 플랫폼 이름',
  } )
  platform: AuthenticationPlatforms;
  
  @Column( {
    type    : 'varchar',
    length  : 150,
    nullable: true,
    comment : '엑세스 토콘 리프레시용 토큰',
  } )
  current_refresh_token: string;
  
  /**
   * Table Relations
   */
  @OneToOne(
    () => UserEntity,
    ( user ) => user.auth )
  @JoinColumn( { name: 'user_id' } )
  user: UserEntity;
  
  
  /**
   * Constructor Function
   */
  constructor( authEntity: any ) {
    super();
    Object.assign( this, authEntity );
  }
}
