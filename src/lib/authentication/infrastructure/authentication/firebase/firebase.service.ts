import * as firebase           from "firebase-admin";
import { SharedConfigService } from "../../../../configuration/shared.config.service";



export class FirebaseService {
  private readonly firebaseClient: any;


  constructor(
    private readonly sharedConfigService: SharedConfigService
  ) {
    this.firebaseClient = firebase.initializeApp({
      credential: firebase.credential.cert(sharedConfigService.accessFirebaseConfig)
    });
  }


  public getFirebaseClient() {
    return this.firebaseClient;
  }
}
