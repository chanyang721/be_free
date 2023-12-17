import { Column, Entity }                          from "typeorm";
import { BaseEntity }                              from "../../../../libs/database/orm/typeorm/base/base.entity";

export enum ContractStandardEnum {
    ERC20 = "ERC-20"
}

export enum TokenContractType {
    NFT = "NFT",
    TOKEN = "TOKEN"
}


@Entity( { name: "token" } )
export class Token extends BaseEntity {
    @Column( {
        type   : "enum",
        enum   : TokenContractType,
        comment: "NFT or TOKEN"
    } )
    type: TokenContractType;
    
    @Column( {
        type   : "enum",
        enum   : ContractStandardEnum,
        default: ContractStandardEnum.ERC20,
        comment: "ERC-20 등"
    } )
    standard: ContractStandardEnum.ERC20;
}