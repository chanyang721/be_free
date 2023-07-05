import { Injectable }       from "@nestjs/common";
import { AwsConfigService } from "./config/aws.config.service";



@Injectable()
export class AwsCognitoService {

  constructor(
    private readonly awsConfigService: AwsConfigService
  ) {
  }


  get accessToAwsCognito() {
    const { clientId, userPoolId } = this.awsConfigService.accessAwsCognitoConfig;
    return;
  }
}