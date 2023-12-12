import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions }   from "@nestjs/typeorm";
import { ContractToFunctionSignature } from "../../../../../domains/blockchains/contracts/entities/contract-to-function-signature.entity";
import { Contract }                    from "../../../../../domains/blockchains/contracts/entities/contract.entity";
import { FunctionSignature }           from "../../../../../domains/blockchains/contracts/entities/function-signature.entity";
import { Token }                       from "../../../../../domains/blockchains/contracts/entities/token.entity";
import { Dapp }                        from "../../../../../domains/blockchains/dapp/entities/dapp.entity";
import { Transaction }                 from "../../../../../domains/blockchains/transactions/entities/transaction.entity";
import { Wallet }                      from "../../../../../domains/blockchains/wallets/entities/wallet.entity";
import { CommentsEntity }              from "../../../../../domains/boards/posts/infrastructrue/entities/comments.entity";
import { PostsEntity }                 from "../../../../../domains/boards/posts/infrastructrue/entities/posts.entity";
import { FileEntity }                  from "../../../../../domains/boards/projects/infrastructure/entities/file.entity";
import { GroupEntity }                 from "../../../../../domains/boards/projects/infrastructure/entities/group.entity";
import { ProjectEntity }               from "../../../../../domains/boards/projects/infrastructure/entities/project.entity";
import { ProfileEntity }               from "../../../../../domains/users/infrastructure/entities/profile.entity";
import { UserEntity }                  from "../../../../../domains/users/infrastructure/entities/user.entity";
import { AuthEntity }                  from "../../../../authentication/infrastructure/entities/auth.entity";
import { PRODUCTION }                  from "../../../../utils/constants";
import { SqlLogger }                   from "./typeorm.logger.options";



export const typeOrmModuleAsyncOptions: TypeOrmModuleAsyncOptions = {
    imports   : [ ConfigModule ],
    inject    : [ ConfigService ],
    useFactory: ( configService: ConfigService ) => ( {
        type       : "mysql",
        host       : configService.get<string>( "DB_CONTAINER_HOST" ),
        port       : configService.get<number>( "DB_PORT" ),
        username   : configService.get<string>( "DB_USER" ),
        password   : configService.get<string>( "DB_PASSWORD" ),
        database   : configService.get<string>( "DB_DATABASE" ),
        synchronize: process.env.NODE_ENV !== PRODUCTION,
        logger     : new SqlLogger(),
        logging    : process.env.NODE_ENV !== PRODUCTION,
        entities   : [
            AuthEntity, UserEntity, ProfileEntity
        ],
        timezone   : "Z"
    } )
};

export const boardTypeOrmModuleAsyncOptions: TypeOrmModuleAsyncOptions = {
    imports   : [ ConfigModule ],
    inject    : [ ConfigService ],
    useFactory: ( configService: ConfigService ) => ( {
        type       : "mysql",
        host       : configService.get<string>( "DB_CONTAINER_HOST" ),
        port       : configService.get<number>( "DB_PORT" ),
        username   : configService.get<string>( "DB_USER" ),
        password   : configService.get<string>( "DB_PASSWORD" ),
        database   : configService.get<string>( "DB_DATABASE_BOARD" ),
        synchronize: process.env.NODE_ENV !== PRODUCTION,
        logger     : new SqlLogger(),
        logging    : process.env.NODE_ENV !== PRODUCTION,
        entities   : [
            PostsEntity, CommentsEntity,
            
            ProjectEntity, GroupEntity, FileEntity
        ],
        timezone   : "Z"
    } )
};


export const dAppTypeOrmModuleAsyncOptions: TypeOrmModuleAsyncOptions = {
    imports   : [ ConfigModule ],
    inject    : [ ConfigService ],
    useFactory: ( configService: ConfigService ) => ( {
        type       : "mysql",
        host       : configService.get<string>( "DB_CONTAINER_HOST" ),
        port       : configService.get<number>( "DB_PORT" ),
        username   : configService.get<string>( "DB_USER" ),
        password   : configService.get<string>( "DB_PASSWORD" ),
        database   : configService.get<string>( "DB_DATABASE_DAPP" ),
        synchronize: process.env.NODE_ENV !== PRODUCTION,
        logger     : new SqlLogger(),
        logging    : process.env.NODE_ENV !== PRODUCTION,
        entities   : [
            Wallet,
            Dapp,
            Contract,
                Token,
                ContractToFunctionSignature, FunctionSignature,
            Transaction
        ],
        timezone   : "Z"
    } )
};