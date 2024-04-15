import { Injectable } from '@nestjs/common';
import { PlatformAdaptor } from '@/libs/infra/cloud/platfrom/platform.adaptor';
import { CommonConfigService } from '@/libs/config/common.config.service';
import { UserEntity } from '@/users/infrastructure/entities';

@Injectable()
export class AwsCognitoService implements PlatformAdaptor {
  client: any;
  config: any;

  constructor(
    private readonly commonConfigService: CommonConfigService,
  ) {
    this.config = this.commonConfigService.accessAwsCognitoConfig;
  }

  public async register(user: UserEntity): Promise<{ uid: string }> {
    /* 등록 구현 */
    return { uid: "테스트" };
  }
  public async getUserInfo(): Promise<any> {
      throw new Error('Method not implemented.');
  }


  public async connectClient(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async getClient(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}