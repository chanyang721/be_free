import { Module }                 from "@nestjs/common";
import { ConfigModule }           from "@nestjs/config";
import { HealthCheckerModule }    from "./libs/utils/health-checker/health-checker.module";
import { configOptions }          from "./libs/core-fundamentals/options/config.options";
import { httpModuleAsyncOptions } from "./libs/core-fundamentals/options/http.mudule.options";
import { AuthModule }             from "./libs/authentication/auth.module";
import { HttpModule }             from './libs/utils/http/http.module'
import { DatabaseModule }         from "./libs/database/database.module";
import { UserModule }             from "./domain/user/user.module";
import { ProjectModule }          from "./domain/project/project.module";



@Module({
  imports    : [
    /**
     * Core Libs Modules
     */
    ConfigModule.forRoot(configOptions),
    HttpModule.registerAsync(httpModuleAsyncOptions),
    HealthCheckerModule,
    DatabaseModule,
    AuthModule,

    /**
     * Domain Modules
     */
    UserModule,
    ProjectModule
  ],
  controllers: [],
  providers  : []
})
export class AppModule {
}
