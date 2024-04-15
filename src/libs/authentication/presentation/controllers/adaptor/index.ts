import type { Request, Response } from 'express';
import { RegisterUserDto } from '../../dtos/auth.register.user.dto';
import { LoginDto } from '../../dtos/login.dto';
import { TokenDto } from '../../dtos/token.dto';
import { ResponseDto } from '@/libs/fundamentals/interceptors/response/dto/response.dto';
import { AuthEntity } from '@/libs/authentication/infrastructure/entities/auth.entity';



export interface IAuthControllerAdapter {
  register( registerUserDto: RegisterUserDto ): Promise<ResponseDto<AuthEntity>>;
  
  login( loginDto: LoginDto, res: Response ): Promise<ResponseDto<TokenDto>>;
  
  refresh( req: Request, res: Response ): Promise<ResponseDto<Pick<TokenDto, 'access_token'>>>;
}
