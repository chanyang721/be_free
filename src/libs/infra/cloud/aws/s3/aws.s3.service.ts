import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import AWS from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import { CommonConfigService } from '../../../../config/common.config.service';



@Injectable()
export class AwsS3Service {
  private readonly logger = new Logger( AwsS3Service.name );
  
  private readonly s3: AWS.S3;
  
  private readonly AWS_S3_BUCKET: string;
  
  
  constructor(
    private readonly commonConfigService: CommonConfigService,
  ) {
    this.s3 = new AWS.S3( this.commonConfigService.accessAwsS3Config );
    this.AWS_S3_BUCKET = this.commonConfigService.accessAwsS3Config.bucketName;
  }
  
  
  public async uploadFile( file: Express.MulterS3.File, key: string ): Promise<any> {
    this.logger.debug( `[ AWS S3 ]: Uploading file ${ file.originalname } to bucket ${ this.AWS_S3_BUCKET }` );
    const uploadParams = {
      Bucket            : this.AWS_S3_BUCKET,
      Key               : key,
      Body              : file.buffer,
      ACL               : 'public-read',
      ContentType       : file.mimetype,
      ContentDisposition: 'inline',
    } as AWS.S3.Types.PutObjectRequest;
    
    return await this.uploadFileToS3( uploadParams );
  }
  
  
  public async uploadFiles( files: Express.MulterS3.File[], key: string ): Promise<any> {
    this.logger.debug( `[ AWS S3 ]: Uploading files ${ files.map( file => file.originalname )
                                                            .join( ', ' ) } to bucket ${ this.AWS_S3_BUCKET }` );
  }
  
  
  private async uploadFileToS3( params: AWS.S3.Types.PutObjectRequest ): Promise<ManagedUpload.SendData | Error> {
    try {
      return await this.s3.upload( params )
                       .promise();
    }
    catch ( error ) {
      this.logger.error( `[ AWS S3 ]: Error uploading file to S3: ${ error.message }` );
      throw new HttpException( error.message, HttpStatus.INTERNAL_SERVER_ERROR );
    }
  }
}
