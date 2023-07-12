import type { Request, Response } from "express";
import { RegisterUserDto }        from "../dto/auth.register.user.dto";
import { LoginDto }               from "../dto/login.firebase.user.dto";
import { TokenDto }               from "../dto/token.dto";



export interface IAuthController {
  registerUserThroughAuthenticationServer( registerUserDto: RegisterUserDto ): Promise<any>;

  login( loginDto: LoginDto, res: Response ): Promise<TokenDto>;

  refresh( req: Request ): Promise<Pick<TokenDto, "access_token">>;
}
