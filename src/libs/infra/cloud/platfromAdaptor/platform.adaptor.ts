import { AuthenticationPlatforms } from '@/libs/authentication/infrastructure/entities/enums/auth.enum.platform';
import { app } from 'firebase-admin/lib/firebase-namespace-api';
import { UserEntity } from '@/users/infrastructure/entities';

export interface PlatformAdaptor {
  client: any;

  connectClient(): Promise<any>;

  getClient(): Promise<any>;

  register(user: UserEntity): Promise<{ uid: string }>

  getUserInfo(): Promise<any>
}

// export abstract class PlatformAdaptor {
//   private readonly client: any;
//
//   protected abstract connectClient(platFormName: AuthenticationPlatforms): Promise<any>;
//
//   protected abstract getClient(): Promise<any>;
// }
