import { CommonConfigService } from '@/libs/config/common.config.service';
import {
  BlobServiceClient,
  BlockBlobUploadOptions,
  BlockBlobUploadResponse,
  ContainerClient,
}                                                  from '@azure/storage-blob';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AzureStorageService {
  private readonly logger: Logger = new Logger(AzureStorageService.name)
  private AZURE_STORAGE_CONNECTION_STRING: string;
  private blobServiceClient: BlobServiceClient;
  constructor(
    private readonly commonConfigService: CommonConfigService
  ) {
    const azureAccessConfig = this.commonConfigService.accessAzureConfig
    this.AZURE_STORAGE_CONNECTION_STRING = azureAccessConfig.storage.connectionString
    this.connectStorageService()
  }
  
  private connectStorageService () {
    try {
      this.blobServiceClient = BlobServiceClient.fromConnectionString(
        this.AZURE_STORAGE_CONNECTION_STRING,
      );
      this.logger.debug('AZURE_STORAGE is connected');
    }
    catch ( error ) {
      this.logger.error(`[connectStorageService]: ${error.message}`);
    }
  }
  
  async uploadFile(
    containerName: string,
    filePath: string,
    blobName: string,
    file: Buffer,
    options?: BlockBlobUploadOptions,
  ): Promise<string> {
    const containerClient: ContainerClient =
      this.blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists({ access: 'container' });
    
    const blockBlobClient = containerClient.getBlockBlobClient(
      `${filePath}/${blobName}`,
    );
    const uploadBlobResponse = await blockBlobClient.upload(
      file,
      file.length,
      options,
    );
    
    this.logger.debug(
      `File ${blobName} uploaded at ${containerName} container, requestId: ${uploadBlobResponse.requestId}`,
    );
    const blobURL: string = `${containerClient.url}/${filePath}/${blobName}`;
    return blobURL;
  }
  
  async deleteFile(containerName: string, filePath: string) {
    console.log(`[deleteFile]: filePath: ${filePath}`);
    if (!filePath) return;
    
    const containerClient: ContainerClient =
      this.blobServiceClient.getContainerClient(containerName);
    const blobs = containerClient.listBlobsByHierarchy(containerName, {
      prefix: filePath.toString(),
    });
    
    for await (const blob of blobs) {
      const blobClient = containerClient.getBlobClient(blob.name);
      await blobClient.deleteIfExists();
      console.log(`${containerName}/${filePath} Blob deleted: ${blob.name}`);
    }
  }
}
