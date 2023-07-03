import { Module }                        from "@nestjs/common";
import { ConfigModule }                  from "@nestjs/config";
import { APP_INTERCEPTOR }               from "@nestjs/core";
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { HttpModule }                    from "./shared/http/http.module";
import { configOptions }                 from "./fundamentals/options/config.options";
import { cacheModuleAsyncOptions }       from "./fundamentals/options/cache.module.options";
import { httpModuleAsyncOptions }        from "./fundamentals/options/http.mudule.options";
import { CatsModule }                    from "./domain/cats/cats.module";
import { HealthCheckerModule }           from "./common/health-checker/health-checker.module";
import { DatabaseModule }                from "./common/database/database.module";



@Module({
  imports    : [
    /**
     * Core Modules
     * */
    ConfigModule.forRoot(configOptions),
    CacheModule.registerAsync(cacheModuleAsyncOptions),
    HttpModule.registerAsync(httpModuleAsyncOptions),
    HealthCheckerModule,
    DatabaseModule,

    /**
     * Domain Modules
     * */


    /**
     * Test Modules
     * */
    CatsModule
  ],
  controllers: [],
  providers  : [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ]
})
export class AppModule {
}
