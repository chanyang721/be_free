import { FirebaseService } from '@/libs/infra/cloud/firebase/firebase.service';
import { AwsCognitoService } from '@/libs/infra/cloud/aws/cognito/cognito.service';
import { UserEntity } from '@/users/infrastructure/entities';


export type Platform = FirebaseService | AwsCognitoService

export class PlatformService {
  private platform: Platform;

  public async setPlatform(platform: Platform): Promise<Platform> {
    return this.platform = platform;
  }

  public async getUserInfo(): Promise<any> {
    return this.platform.getUserInfo()
  }

  public async registerUser(user: UserEntity): Promise<any> {
    return this.platform.register(user)
  }
}
