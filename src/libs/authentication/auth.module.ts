import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/users/infrastructure/entities';
import { UserRepository } from '@/users/infrastructure/repositories/user.repository';
import { CommonConfigService } from '../config/common.config.service';
import { JwtAuthGlobalStrategy } from '../fundamentals/guards/global/jwt.auth.global.strategy';
import { JwtAuthRefreshStrategy } from '../fundamentals/guards/local/jwt.refresh.strategy';
import { LocalAuthStrategy } from '../fundamentals/guards/local/local.auth.strategy';
import { jwtModuleAsyncOptions } from '../helpers/jwt/jwt.module.option';
import { JwtService } from '../helpers/jwt/jwt.service';
import { HashingService } from '../utils/hashing/hashing.service';
import { AuthService } from './application/services/auth.service';
import { FirebaseService } from '@/libs/infra/cloud/firebase/firebase.service';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { AuthController } from './presentation/controllers/auth.controller';



@Module( {
  imports    : [
    PassportModule,
    
    JwtModule.registerAsync( jwtModuleAsyncOptions ),
    
    TypeOrmModule.forFeature( [ UserEntity ] ),
  ],
  controllers: [
    AuthController,
  ],
  providers  : [
    CommonConfigService,
    
    AuthService, FirebaseService,
    
    JwtService, HashingService,
    
    JwtAuthGlobalStrategy, LocalAuthStrategy, JwtAuthRefreshStrategy,
    
    UserRepository, AuthRepository,
  ],
} )
export class AuthModule {
}
