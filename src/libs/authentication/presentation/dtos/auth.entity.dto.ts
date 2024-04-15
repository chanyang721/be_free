import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseEntityDto } from '@/libs/database/orm/typeorm/base/base.entity.dto';
import { AuthenticationPlatforms } from '@/libs/authentication/infrastructure/entities/enums/auth.enum.platform';



/**
 * Entity와 동일한 속성을 가진 DTO
 * 1. 상속받는 하위 DTO 에서 속성값 변경 가능
 * 2. Swagger DTO 를 사용하기 때문에, Swagger 에서도 속성값 변경 가능
 * 3. Validation 값으로 사용 가능
 */
export class AuthEntityDto extends PartialType( BaseEntityDto ) {
  @ApiProperty( {
    type       : 'string',
    description: '외부에 저장된 유저 정보를 가져올 수 있는 유저 아이디',
    required   : true,
    example    : 'xoqGTR9871Nbzkd4bsEr5AZVp2',
  } )
  @IsString()
  @IsNotEmpty()
  @MaxLength( 100 )
  uid: string;


  @ApiProperty( {
    type       : 'string',
    description: '인증 서버 플랫폼 이름',
    required   : false,
    example    : 'FIREBASE',
  } )
  @IsEnum( AuthenticationPlatforms )
  @IsOptional()
  platform: AuthenticationPlatforms;


  @ApiProperty( {
    type       : 'string',
    description: 'Main 서버에서 발급한 리프레시 토큰을 암호화한 값',
    required   : true,
    example    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9~',
  } )
  @IsString()
  @IsNotEmpty()
  @MaxLength( 150 )
  currentRefreshToken: string;
  
  
  constructor( authEntityDto: AuthEntityDto ) {
    super();
    Object.assign( this, authEntityDto );
  }
  
}
