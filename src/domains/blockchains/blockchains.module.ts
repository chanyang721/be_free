import { Module }             from "@nestjs/common";
import { ContractsModule }    from "./contracts/contracts.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { WalletsModule }      from "./wallets/wallets.module";
import { DappModule }         from "./dapp/dapp.module";



@Module( {
    imports  : [
        DappModule,
        WalletsModule,
        ContractsModule,
        TransactionsModule
    ],
    providers: []
} )
export class BlockchainsModule {
}