import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import type { Request } from 'express';



export const dappIconMulterOptions: MulterOptions = {
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB
    files   : 1,
  },
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: ( error: ( Error | null ), acceptFile: boolean ) => void,
  ): void {
    if ( file.mimetype.match( /\/(png|sgv)$/ ) ) {
      callback( null, true );
    }
    
    callback( new HttpException( {
      statusCode: HttpStatus.BAD_REQUEST,
      message   : `${ file.mimetype }는 지원하지 않는 파일 형식입니다. 다시 시도해주세요`,
    }, HttpStatus.BAD_REQUEST ), false );
  },
};

export const contractAuditMulterOptions: MulterOptions = {
  limits: {
    fileSize: 1024 * 1024 * 40, // 40MB
    files   : 10,
  },
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: ( error: ( Error | null ), acceptFile: boolean ) => void,
  ): void {
    if ( file.mimetype.match( /\/(pdf)$/ ) ) {
      callback( null, true );
    }
    
    callback( new HttpException( {
      statusCode: HttpStatus.BAD_REQUEST,
      message   : `${ file.mimetype }는 지원하지 않는 파일 형식입니다. 다시 시도해주세요`,
    }, HttpStatus.BAD_REQUEST ), false );
  },
};

export const multerOptions: MulterOptions = {
  limits    : {
    fileSize: 1024 * 1024 * 100, // 30MB,
    files   : 2,
  },
  fileFilter: ( request: Request, file: Express.Multer.File, callback: Function ): void => {
    const fileName = file.originalname.split( '.' );
    const fileExtension = fileName[ fileName.length - 1 ];
    console.log("request", request)
    // if ( file.mimetype.match( /\/(pdf|png|sgv)$/ ) ) {
      callback( null, true );
    // }
    
    // callback( new HttpException( {
    //     statusCode: HttpStatus.BAD_REQUEST,
    //     message   : `${ file.mimetype }는 지원하지 않는 파일 형식입니다. 다시 시도해주세요`
    // }, HttpStatus.BAD_REQUEST ), false );
  },
};
