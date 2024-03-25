import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { CommonConfigService } from './libs/config/common.config.service';
import { fundamentals } from './libs/fundamentals';
import { winstonLogger } from './libs/helpers/log/winston.logger';
import { setupSwagger } from './libs/utils/swagger';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>( AppModule, {
    logger: winstonLogger,
  } );
  const { serverConfig } = app.get( CommonConfigService );
  
  app.enableCors( {
    origin     : true, // TODO 도메인 수정
    methods    : [ 'GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS' ],
    maxAge     : 3600 * 5,
    credentials: true,
  } );
  
  app.use( helmet() );
  
  app.use( cookieParser() );
  
  app.use( compression() );
  
  app.enableShutdownHooks()
  
  await fundamentals( app );
  
  await setupSwagger( app );
  
  await app.listen( serverConfig.SERVER.PORT );
  
  console.info( `
        \n Server is running on: ${ await app.getUrl() }
        \n Node Environment    : ${ serverConfig.NODE_ENV }
    ` );
  
  return app;
}

void bootstrap();

