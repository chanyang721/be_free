import { WalletAccount } from '@/blockchains/wallets/entities/wallet-account.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@/libs/database/orm/typeorm/base/base.entity';



@Entity( { name: 'wallet' } )
export class Wallet extends BaseEntity {
  @Column( { length: 15, comment: '연결된 지갑 이름' } )
  name: string;
  
  @Column( { length: 255, comment: '아이콘 url' } )
  icon: string;
  
  @Column( { length: 255, comment: '스토어 앱 다운로드 딥 링크' } )
  deep_link: string;
  
  @OneToMany(
    () => WalletAccount,
    rel_wallet_account => rel_wallet_account.wallet )
  rel_wallet_accounts: WalletAccount[];
}
