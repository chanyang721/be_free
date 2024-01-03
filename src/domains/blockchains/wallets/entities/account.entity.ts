import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseEntity }                       from "../../../../libs/database/orm/typeorm/base/base.entity";
import { Transaction }                      from "../../transactions/entities/transaction.entity";
import { RelWalletAccount }                 from "./rel-wallet-account.entity";



@Entity( { name: "account" } )
export class Account extends BaseEntity {
    @Column( { length: 66, unique: true, comment: "유저 주소" } )
    address: string;
    
    @Column( { type: "uuid", length: 36, comment: "user entity id" } )
    @Index()
    user_id: string;
    
    @OneToMany( () => Transaction, transaction => transaction.account )
    transactions: Transaction[];
    
    @OneToMany(
        () => RelWalletAccount,
        rel_wallet_account => rel_wallet_account.account )
    rel_wallet_accounts: RelWalletAccount[];
}
