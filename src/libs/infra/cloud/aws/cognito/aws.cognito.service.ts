import { Injectable } from '@nestjs/common';
import { CommonConfigService } from '../../../../config/common.config.service';



@Injectable()
export class CognitoService {
  private readonly cognitoClient: any;
  
  
  constructor(
    private readonly commonConfigService: CommonConfigService,
  ) {
    /**
     * TODO: Implement cognito client
     */
    
    
  }
  
  
  public getCognitoClient() {
    return this.cognitoClient;
  }
}
