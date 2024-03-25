import { ApplicationFormControllerAdaptor } from '@/blockchains/applicationForms/presentation/controllers/adaptor';
import {
  ApplicationFormContractDto,
  ApplicationFormDappDto,
  RegisterApplicationFormDto,
  TermAgreementDto,
} from '@/blockchains/applicationForms/presentation/dtos';
import { ResponseDto } from '@/libs/fundamentals/interceptors/response/dto/response.dto';
import { contractAuditMulterOptions, dappIconMulterOptions, multerOptions } from '@/libs/helpers/multer/options';
import { AzureCommunicationService } from '@/libs/infra/cloud/azure/mail/azure.communication.service';
import { Public } from '@/libs/utils/decoretors';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import * as fs from 'fs';
import hbs from 'hbs';
import { ApplicationFormsService } from '../../application/services/application.forms.service';



@Public()
@Controller( 'applications-forms' )
export class ApplicationFormsController
  implements ApplicationFormControllerAdaptor
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBud: QueryBus,
    private readonly applicationFormsService: ApplicationFormsService,
    private readonly azureCommunicationService: AzureCommunicationService,
  ) {
  }
  
  
  @Get( '/:application_form_id' )
  async getApplicationFormById(
    @Param( 'application_form_id', ParseIntPipe ) applicationFormId: string,
  ): Promise<any> {
    const applicationForm = await this.applicationFormsService.getApplicationFormById( applicationFormId );
    
    return new ResponseDto( {
      statusCode: HttpStatusCode.Ok,
      message   : `신청서 조회 완료`,
      data      : applicationForm,
    } );
  }
  
  @Post( 'test' )
  @UseInterceptors( AnyFilesInterceptor( multerOptions ) )
  @ApiConsumes( 'multipart/form-data' )
  async testApplicationForm(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() registerApplicationFormDto: any,
  ): Promise<ResponseDto<boolean>> {
    console.log("registerApplicationFormDto", registerApplicationFormDto)
    console.log("files", files)
    
    return new ResponseDto( {
      statusCode: HttpStatusCode.Created,
      message   : '신청서가 정상적으로 접수되었습니다.',
      data      : true,
    } );
  }
  
  @Post( '' )
  @UseInterceptors( AnyFilesInterceptor( multerOptions ) )
  @ApiConsumes( 'multipart/form-data' )
  @ApiBody( { type: RegisterApplicationFormDto } )
  async registerApplicationForm(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() registerApplicationFormDto: RegisterApplicationFormDto,
  ): Promise<ResponseDto<boolean>> {
    const newApplicationForm = await this.applicationFormsService.registerApplicationForm( files, registerApplicationFormDto );
    
    return new ResponseDto( {
      statusCode: HttpStatusCode.Created,
      message   : '신청서가 정상적으로 접수되었습니다.',
      data      : !!newApplicationForm,
    } );
  }
  
  
  @ApiParam( {
    name   : 'version',
    type   : String,
    example: 1,
  } )
  @Get( '/terms/:version' )
  async getTermsAgreementFormat(
    @Param( 'version' ) version: string,
  ): Promise<ResponseDto<TermAgreementDto[]>> {
    const termsDto: TermAgreementDto[] =
      await this.applicationFormsService.getTeemAgreements( version );
    
    return new ResponseDto( {
      statusCode: HttpStatusCode.Ok,
      message   : '최신 약관 동의 정보입니다.',
      data      : termsDto,
    } );
  }
  
  
  @Post( '/dapps' )
  @UseInterceptors( FileInterceptor( 'file', dappIconMulterOptions ) )
  @ApiConsumes( 'multipart/form-data' )
  async registerDappApplicationForm(
    @UploadedFile( 'file' ) file: Express.Multer.File,
    @Body() registerApplicationFormDapp: ApplicationFormDappDto,
  ): Promise<ResponseDto<ApplicationFormDappDto>> {
    const newApplicationFormDapp: ApplicationFormDappDto =
      await this.applicationFormsService.registerApplicationFormDapp( file, registerApplicationFormDapp );
    
    return new ResponseDto( {
      statusCode: HttpStatusCode.Created,
      message   : '신규 dapp 신청서의 제출이 완료되었습니다.',
      data      : newApplicationFormDapp,
    } );
  }
  
  
  @Post( '/dapps/contracts' )
  @UseInterceptors( AnyFilesInterceptor( contractAuditMulterOptions ) )
  @ApiConsumes( 'multipart/form-data' )
  async registerContractApplicationForm(
    @Body() registerContractApplicationForms: ApplicationFormContractDto,
  ): Promise<ResponseDto<any>> {
    // const newApplicationFormContracts: ApplicationFormContractDto[] =
    
    // return new ResponseDto({
    //     statusCode: HttpStatusCode.Created,
    //     message: '',
    //     data: ''
    // })
    return;
  }
  
  
  @Patch( '/' )
  async updateApplicationFormProcess(): Promise<any> {
    return;
  }
  
  
  @Post( 'email' )
  async sendEmailTest() {
    const htmlFilePath = '/app/templates/email-template-kr.hbs';
    const htmlTemplate = fs.readFileSync( htmlFilePath, 'utf8' );
    const hbsTemplate = hbs.handlebars.compile( htmlTemplate );
    
    const context = {
      dapp     : {
        name: 'test dapp name',
        code: 'test dapp code',
      },
      contracts: [
        { name: 'test name1', address: 'test address1' },
        { name: 'test name2', address: 'test address2' },
      ],
      createAt : new Date(),
    };
    console.log( 'hbsTemplate :', hbsTemplate( context ) );
    const content = hbsTemplate( context );
    
    const result = await this.azureCommunicationService.sendEmail(
      'DoNotReply@',
      [ { address: 'chanyang721@gmail.com' } ],
      { subject: '제목', html: content },
    );
    
    return new ResponseDto( {
      statusCode: HttpStatusCode.Ok,
      message   : '메일 전송 완료',
      data      : null,
    } );
  }
}

