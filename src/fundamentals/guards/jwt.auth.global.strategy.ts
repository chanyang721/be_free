import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy }     from "@nestjs/passport";
import { Injectable }           from "@nestjs/common";
import { ConfigService }        from "@nestjs/config";



@Injectable()
export class JwtAuthGlobalStrategy extends PassportStrategy(Strategy) {
  constructor( private readonly configService: ConfigService ) {
    super({
      jwtFromRequest   : ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration : false,
      secretOrKey      : process.env.JWT_SECRET || configService.get("JWT_SECRET"),
      // passReqToCallback: true
    });
  }


  async validate( payload: any ) {
    console.log("payload :", payload)
    return { ...payload };
  }
}