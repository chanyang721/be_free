import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/libs/database/orm/typeorm/base/base.entity';
import { Account } from './account.entity';
import { Wallet } from './wallet.entity';



@Entity( { name: 'wallet_account' } )
export class WalletAccount extends BaseEntity {
  /*
   * Columns
   * */
  
  
  /*
   * FK Columns
   * */
  @Column( { type: 'bigint' } )
  wallet_id: string;
  
  @Column( { type: 'bigint' } )
  account_id: string;
  
  /*
   * Relations
   * */
  @ManyToOne( () => Wallet, wallet => wallet.rel_wallet_accounts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  } )
  @JoinColumn( { name: 'wallet_id' } )
  wallet: Wallet;
  
  @ManyToOne( () => Account, account => account.rel_wallet_accounts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  } )
  @JoinColumn( { name: 'account_id' } )
  account: Account;
}