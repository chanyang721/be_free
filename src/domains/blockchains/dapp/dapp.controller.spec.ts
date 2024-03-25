import { Test, TestingModule } from '@nestjs/testing';
import { AzureStorageService } from '@/libs/infra/cloud/azure/storage/azure.storage.service';
import { MailModule } from '../../../libs/infra/mail/mail.module';
import { MailService } from '../../../libs/infra/mail/mail.srevice';
import { DappController } from './dapp.controller';
import { DappService } from './dapp.service';



describe( 'DappController', () => {
  let controller: DappController;
  
  beforeEach( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      imports    : [ MailModule ],
      controllers: [ DappController ],
      providers  : [ DappService, AzureStorageService, MailService ],
    } )
                                            .compile();
    
    controller = module.get<DappController>( DappController );
  } );
  
  it( 'should be defined', () => {
    expect( controller )
      .toBeDefined();
  } );
} );
