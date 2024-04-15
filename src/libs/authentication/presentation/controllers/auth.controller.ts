import { AuthService } from '@/libs/authentication/application/services/auth.service';
import { LoginDto, RegisterUserDto, TokenDto } from '@/libs/authentication/presentation/dtos';
import { JwtAuthRefreshGuard } from '@/libs/fundamentals/guards/local/jwt.refresh.guard';
import { LocalAuthGuard } from '@/libs/fundamentals/guards/local/local.auth.guard';
import { COOKIE_ACCESS_TOKEN_OPTIONS, COOKIE_REFRESH_TOKEN_OPTIONS } from '@/libs/helpers/jwt/options';
import { COOKIE_ACCESS_TOKEN_NAME, COOKIE_REFRESH_TOKEN_NAME } from '@/libs/utils/constants';
import { Public } from '@/libs/utils/decoretors';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { IAuthControllerAdapter } from './adaptor';
import { ApiLoginDecorator, ApiRefreshDecorator, ApiRegisterDecorator } from './swagger';
import { AuthEntity } from '@/libs/authentication/infrastructure/entities/auth.entity';
import { ResponseDto } from '@/libs/fundamentals/interceptors/response/dto/response.dto';



@Public()
@ApiTags( 'auth' )
@Controller( 'auth' )
@UseInterceptors( CacheInterceptor )
export class AuthController implements IAuthControllerAdapter {
  constructor( private readonly authService: AuthService ) {
  }
  
  
  @Post( 'register' )
  @ApiRegisterDecorator()
  @UseGuards( LocalAuthGuard )
  public async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<ResponseDto<AuthEntity>> {
    const auth = await this.authService.register( registerUserDto );

    return new ResponseDto<AuthEntity>({
      statusCode: HttpStatus.OK,
      message: "생성 완료",
      data: auth
    })
  }
  
  
  @Post( 'login' )
  @ApiLoginDecorator()
  public async login(
    @Body() loginDto: LoginDto,
    @Res( { passthrough: true } ) res: Response,
  ): Promise<ResponseDto<TokenDto>> {
    const tokens: TokenDto = await this.authService.login( loginDto );
    
    res.cookie( COOKIE_ACCESS_TOKEN_NAME, tokens.access_token, COOKIE_ACCESS_TOKEN_OPTIONS );
    res.cookie( COOKIE_REFRESH_TOKEN_NAME, tokens.refresh_token, COOKIE_REFRESH_TOKEN_OPTIONS );
    
    return new ResponseDto<TokenDto>({
      statusCode: HttpStatus.OK,
      message: "로그인 성공",
      data: tokens
    });
  }
  
  
  @Get( 'refresh' )
  @ApiRefreshDecorator()
  @UseGuards( JwtAuthRefreshGuard )
  public async refresh(
    @Req() req: any,
    @Res( { passthrough: true } ) res: Response
  ): Promise<ResponseDto<Pick<TokenDto, 'access_token'>>> {
    const refreshAccessToken = await this.authService.refreshAccessToken( req.user, req.cookie.refresh_token );
    res.cookie( COOKIE_ACCESS_TOKEN_NAME, refreshAccessToken, COOKIE_ACCESS_TOKEN_OPTIONS );

    return new ResponseDto<Pick<TokenDto, "access_token">>({
      statusCode: HttpStatus.OK,
      message: "리프레시 토큰 발급",
      data: refreshAccessToken
    })
  }
}
