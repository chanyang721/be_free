import {
  RegisterApplicationFormDto
} from '@/blockchains/applicationForms/presentation/dtos/register.application.form.dto';
import { TermAgreementDto } from '@/blockchains/applicationForms/presentation/dtos/terms.agreement.dto';
import { DappDto } from '@/blockchains/dapp/dtos/dapp.dto';
import { ResponseDto } from '@/libs/fundamentals/interceptors/response/dto/response.dto';



export interface ApplicationFormControllerAdaptor {
  /* APIs Adaptor------------------------------------------------------
   - 신청자는 디앱 인증번호를 입력하여 기존 dapp을 조회할 수 있다. -> dapp domain 이전
   - 신청자는 최신 버전의 이용 약관 동의 사항을 조회할 수 있다.
   - 신청자는 dapp과 contracts 신청서를 생성할 수 있다
   -------------------------------------------------------------------*/
  // getDappByVerificationCode(code: string): Promise<ResponseDto<DappDto>>;
  
  getTermsAgreementFormat(
    version: string,
  ): Promise<ResponseDto<TermAgreementDto[]>>;
  
  registerApplicationForm(
    files: Express.Multer.File[],
    registerApplicationFormDto: RegisterApplicationFormDto,
  ): Promise<ResponseDto<boolean>>;
}