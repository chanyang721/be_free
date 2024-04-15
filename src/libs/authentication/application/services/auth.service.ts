import { AuthEntityDto, LoginDto, RegisterUserDto, TokenDto } from '@/libs/authentication/presentation/dtos';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@/libs/helpers/jwt/jwt.service';
import { HashingService } from '@/libs/utils/hashing/hashing.service';
import { AuthRepository } from '../../infrastructure/repositories/auth.repository';
import { AuthenticationPlatforms } from '@/libs/authentication/infrastructure/entities/enums/auth.enum.platform';
import { AuthEntity } from '@/libs/authentication/infrastructure/entities/auth.entity';
import { Platform, PlatformService } from '@/libs/infra/cloud/platfromAdaptor/platform.service';
import { FirebaseService } from '@/libs/infra/cloud/firebase/firebase.service';
import { AwsCognitoService } from '@/libs/infra/cloud/aws/cognito/cognito.service';
import { UserEntity } from '@/users/infrastructure/entities';


@Injectable()
export class AuthService {
  private readonly logger = new Logger( AuthService.name );
  private platformService: PlatformService;
  private platform: Platform;
  
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
    private readonly firebaseService: FirebaseService,
    private readonly cognitoService: AwsCognitoService,
  ) {
  }

  public async register(registerUserDto: RegisterUserDto, platForm: AuthenticationPlatforms): Promise<AuthEntity> {
    /* platform register */
    this.platform = await this.setPlatform(platForm);
    const platformUid: { uid: string } = await this.platform.register(new UserEntity(registerUserDto));

    /* auth entity register */
    return await this.authRepository.registerUser( registerUserDto, platformUid );
  }
  
  
  public async login( loginDto: LoginDto ): Promise<TokenDto> {
    const auth: AuthEntityDto = await this.authRepository.findByUid( loginDto.uid );
    
    const tokens: TokenDto = await this.jwtService.getTokens( auth );
    
    const hashedRefreshToken: string = await this.hashingService.hashingTarget( tokens.refresh_token );
    
    await this.authRepository.updateCurrentRefreshToken( auth.id, hashedRefreshToken );
    
    return tokens;
  }
  
  
  public async refreshAccessToken( user: any, refresh_token: string ): Promise<Pick<TokenDto, 'access_token'>> {
    const auth = await this.authRepository.findByUid( user.uid );
    if ( !auth ) {
      throw new HttpException( 'User not found', HttpStatus.NOT_FOUND );
    }
    
    const isRefreshTokenMatching = await this.hashingService.compare( refresh_token, auth.currentRefreshToken );
    if ( !isRefreshTokenMatching ) {
      throw new HttpException( 'Refresh token mismatch', HttpStatus.UNAUTHORIZED );
    }
    
    const refreshedAccessToken: string = await this.jwtService.getTokens( auth )
                                                   .then( tokens => tokens.access_token );
    
    return {
      access_token: refreshedAccessToken,
    };
  }

  private async setPlatform(platForm: AuthenticationPlatforms) {
    let platform: Platform;

    if (platForm === AuthenticationPlatforms.COGNITO) {
      platform = await this.platformService.setPlatform(this.cognitoService);
    }
    if (platForm === AuthenticationPlatforms.FIREBASE) {
      platform = await this.platformService.setPlatform(this.firebaseService);
    }

    return platform;
  }
}
