import { RegisterUserDto } from '@/libs/authentication/presentation/dtos';
import { AuthEntity } from '@/libs/authentication/infrastructure/entities/auth.entity';

export interface IAuthenticationRepositoryAdapter {
  registerUser( registerUserDto: RegisterUserDto, platformUid: { uid: string } ): Promise<AuthEntity>
  findByUid( uid: string ): Promise<any>
  updateCurrentRefreshToken( uid: string, hashedRefreshToken: string ): Promise<any>
  getQueryBuilderByAliasWhereUid( alias: string, uid: string ): Promise<any>
}