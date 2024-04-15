import { RegisterUserDto } from '@/libs/authentication/presentation/dtos';
import { transaction } from '@/libs/database/orm/typeorm/transaction';
import { RepositoryInject } from '@/libs/utils/decoretors';
import { UserEntity } from '@/users/infrastructure/entities';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import { AuthEntity } from '../entities/auth.entity';
import { IAuthenticationRepositoryAdapter } from '@/libs/authentication/infrastructure/adaptor';


@RepositoryInject( AuthRepository )
export class AuthRepository implements IAuthenticationRepositoryAdapter {
  
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
  }
  
  
  async registerUser( registerUserDto: RegisterUserDto, platformUid: { uid: string } ): Promise<AuthEntity> {
    return await transaction<AuthEntity, AuthEntity>(
      [ this.dataSource ],
      async ( mainQueryRunner ) => {
        const user = new UserEntity( { uid: platformUid } );
        user.auth = new AuthEntity( registerUserDto );
        
        const createdUser = await mainQueryRunner.manager.save( user );
        return createdUser.auth;
      }, async () => {
        /**
         * catch black logic without transaction rollback and throw error
         */
      } );
  }
  
  
  public async findByUid( uid: string ): Promise<any> {
    const qb = await this.getQueryBuilderByAliasWhereUid( 'auth', uid );
    return await qb.getOne();
  }


  async updateCurrentRefreshToken(uid: string, hashedRefreshToken: string): Promise<any> {
    await this.entityManager.update(AuthEntity, { uid }, { current_refresh_token: hashedRefreshToken });
  }


  async getQueryBuilderByAliasWhereUid(alias: string, uid: string): Promise<any> {
    return this.entityManager
      .getRepository(AuthEntity)
      .createQueryBuilder(alias)
      .where(`${alias}.uid = :uid`, { uid });
  }
}
