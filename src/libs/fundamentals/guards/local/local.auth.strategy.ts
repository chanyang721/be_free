import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { FirebaseService } from '@/libs/infra/cloud/firebase/firebase.service';
import { RegisterUserDto } from '../../../authentication/presentation/dtos/auth.register.user.dto';



@Injectable()
export class LocalAuthStrategy extends PassportStrategy( Strategy ) {
  private readonly firebaseClient: any;
  
  
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {
    super( {
      usernameField: 'uid',
      passwordField: 'id_token',
    } );
    this.firebaseClient = firebaseService.getFirebaseClient();
  }
  
  
  async validate( uid: string, id_token: string ): Promise<any> {
    try {
      const decodedFirebaseToken = this.firebaseClient.auth()
                                       .verifyIdToken( id_token );
      
      if ( decodedFirebaseToken.uid !== uid ) {
        throw new UnauthorizedException( 'firebase uid is not matched with users uid in db' );
      }
      
      return {
        uid, ...decodedFirebaseToken,
      } as RegisterUserDto;
    }
    catch ( e ) {
      if ( e.code === 'auth/argument-error' ) {
        throw new HttpException( 'firebase id token is expired', HttpStatus.UNAUTHORIZED );
      }
      throw new HttpException( 'firebase id token is invalid', HttpStatus.UNAUTHORIZED );
    }
  }
}

