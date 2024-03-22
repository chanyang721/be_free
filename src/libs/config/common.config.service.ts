import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class CommonConfigService {
  constructor(
    private readonly configService: ConfigService,
  ) {
  }
  
  
  get binanceConfig() {
    return {
      apiKey   : this.configService.get<string>( 'BINANCE_API_KEY' ),
      secretKey: this.configService.get<string>( 'BINANCE_SECRET_KEY' ),
      baseUrl  : this.configService.get<string>( 'BINANCE_BASE_URL' ),
    };
  }
  
  
  get etherConnectConfig() {
    return {
      provider_env: this.configService.get<string>( 'provider_env' ),
      mainnet_url : this.configService.get<string>( 'MAINNET_URL' ),
      testnet_url : this.configService.get<string>( 'TESTNET_URL' ),
    };
  }
  
  
  get mailConfig() {
    return {
      transport: {
        host  : this.configService.get<string>( 'MAIL_HOST' ),
        port  : this.configService.get<string>( 'MAIL_PORT' ),
        secure: this.configService.get<string>( 'MAILER_SECURE' ) === 'true',
        auth  : {
          user: this.configService.get<string>( 'MAIL_AUTH_USER' ),
          pass: this.configService.get<string>( 'MAIL_AUTH_PASSWORD' ),
        },
      },
      defaults : {
        from: {
          name   : 'No-reply',
          address: this.configService.get<string>( 'MAIL_FROM_ADDRESS' ),
        },
      },
    };
  }
  
  
  get serverConfig() {
    return {
      NODE_ENV: this.configService.get<string>( 'NODE_ENV' ),
      SERVER  : {
        PORT: this.configService.get<number>( 'SERVER_PORT' ),
      },
    };
  }
  
  
  get accessAwsConfig() {
    return {
      region         : this.configService.get<string>( 'AWS_REGION' ),
      accessKeyId    : this.configService.get<string>( 'AWS_ACCESS_KEY_ID' ),
      secretAccessKey: this.configService.get<string>( 'AWS_SECRET_ACCESS_KEY' ),
    };
  }
  
  
  get accessAwsS3Config() {
    return {
      region    : this.configService.get<string>( 'AWS_REGION' ),
      bucketName: this.configService.get<string>( 'AWS_S3_BUCKET_NAME' ),
    };
  }
  
  
  get accessOpenApiKey() {
    return {
      apiKey      : this.configService.get<string>( 'OPENAI_API_KEY' ),
      organization: this.configService.get<string>( 'OPENAI_ORGANIZATION' ),
      model       : this.configService.get<string>( 'OPENAI_API_MODEL' ),
    };
  }
  
  
  get accessAwsSnsConfig() {
    return {};
  }
  
  
  get accessAwsSqsConfig() {
    return {
      region     : this.configService.get<string>( 'AWS_REGION' ),
      endpoint   : this.configService.get<string>( 'AWS_ENDPOINT' ),
      credentials: {
        accessKeyId    : this.configService.get<string>( 'AWS_ACCESS_KEY_ID' ),
        secretAccessKey: this.configService.get<string>( 'AWS_SECRET_ACCESS_KEY' ),
      },
    };
  }
  
  
  get accessAwsCognitoConfig() {
    return {
      clientId  : this.configService.get<string>( 'AWS_COGNITO_CLIENT_ID' ),
      userPoolId: this.configService.get<string>( 'AWS_COGNITO_USER_POOL_ID' ),
    };
  }
  
  
  get accessFirebaseConfig() {
    return {
      type                   : this.configService.get<string>( 'FIREBASE_TYPE' ),
      projectId              : this.configService.get<string>( 'FIREBASE_PROJECT_ID' ),
      privateKeyId           : this.configService.get<string>( 'FIREBASE_PRIVATE_KEY_ID' ),
      privateKey             : this.configService.get<string>( 'FIREBASE_PRIVATE_KEY' ),
      clientEmail            : this.configService.get<string>( 'FIREBASE_CLIENT_EMAIL' ),
      clientId               : this.configService.get<string>( 'FIREBASE_CLIENT_ID' ),
      authUri                : this.configService.get<string>( 'FIREBASE_AUTH_URI' ),
      tokenUri               : this.configService.get<string>( 'FIREBASE_TOKEN_URI' ),
      authProviderX509CertUrl: this.configService.get<string>( 'FIREBASE_AUTH_PROVIDER_X509_CERT_URL' ),
      clientC509CertUrl      : this.configService.get<string>( 'FIREBASE_CLIENT_X509_CERT_URL' ),
    };
  }
  
  
  get accessAzureConfig() {
    return {
      storage: {
        containerName   : this.configService.get<string>( 'APPLICATION_STORAGE_CONTAINER_NAME' ),
        connectionString: this.configService.get<string>( 'AZURE_STORAGE_CONNECTION_STRING' ),
      },
      email  : {
        connectionString: this.configService.get<string>( 'AZURE_EMAIL_CONNECTION_STRING' ),
      },
    };
  }
  
  
  get OpenApiConfig() {
    return {
      serviceKey: this.configService.get<string>( 'OPEN_API_SERVICE_KEY' ),
      baseUrl   : this.configService.get<string>( 'OPEN_API_BASE_URL' ),
      statusApi : this.configService.get<string>( 'OPEN_API_STATUS_PATH' ),
    };
  }
  
  
  get JwtConfig() {
    return {
      accessTokenExpiresIn : `${ this.configService.get( 'JWT_ACCESS_TOKEN_EXPIRATION_TIME' ) }m`,
      refreshTokenExpiresIn: `${ this.configService.get( 'JWT_REFRESH_TOKEN_EXPIRATION_TIME' ) }d`,
    };
  }
  
  
  get HashingConfig() {
    return {
      saltRound: +this.configService.get( 'HASHING_SALT_ROUND' ),
    };
  }
  
  
  get KafkaConfig() {
    return {
      // clientId: this.configService.kafkaClientId,
      // brokers: this.configService.kafkaBrokers,
      // groupId: this.configService.kafkaGroupId,
      clientId: '',
      brokers : [] as string[],
      groupId : '',
    };
  }
  
}




