import { Injectable } from '@nestjs/common';
import firebase from 'firebase-admin';
import { CommonConfigService } from '@/libs/config/common.config.service';
import { Credential } from 'firebase-admin/lib/app/credential';
import { app } from 'firebase-admin/lib/firebase-namespace-api';
import { PlatformAdaptor } from '@/libs/infra/cloud/platfromAdaptor/platform.adaptor';


@Injectable()
export class FirebaseService implements PlatformAdaptor {
  private readonly credential: Credential;
  private readonly config: any;

  client: app.App;

  constructor(
    private readonly commonConfigService: CommonConfigService,
  ) {
    this.config = this.commonConfigService.accessFirebaseConfig;
    this.credential = firebase.credential.cert(this.config);
  }

  register(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getUserInfo(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async connectClient(): Promise<any> {
    try {
      this.client = firebase.initializeApp({ credential: this.credential });
    } catch (e) {
      console.log(e.message);
    }
  }

  async getClient(): Promise<app.App> {
    return this.client;
  }
}