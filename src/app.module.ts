import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './libs/authentication/auth.module';
import { RedisCacheModule } from './libs/cache/cache.module';
import { DatabaseModule } from './libs/database/database.module';
import { HttpModule } from './libs/infra/http/http.module';
import { httpModuleAsyncOptions } from './libs/infra/http/options/http.mudule.options';
import { HealthCheckerModule } from '@/libs/infra/health/health-checker.module';
import { UserModule } from '@/users/user.module';
import { ProjectModule } from '@/boards/projects/project.module';
import { PostsModule } from '@/boards/posts/posts.module';

@Module({
  imports: [
    /**
     * Core Libs Modules
     */
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.registerAsync(httpModuleAsyncOptions),
    HealthCheckerModule,
    RedisCacheModule,
    DatabaseModule,
    AuthModule,

    /**
     * Domain Modules
     */
    UserModule, // users
    ProjectModule, // projects
    PostsModule, // boards
  ],
})
export class AppModule {}
