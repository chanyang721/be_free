import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity }               from "../../../../lib/database/base/typeorm/base.entity";
import { UserRole }                 from "./enums/user.enum.role";
import { AuthEntity }               from "../../../../lib/authentication/infrastructure/entities/auth.entity";



@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  /**
   * Constructor Function
   */
  constructor( userEntity: any ) {
    super();
    Object.assign(this, userEntity);
  }

  /**
   * Table Columns
   */
  @Column({
    type    : "enum",
    enum    : UserRole,
    nullable: false,
    default : UserRole.UNKNOWN,
    comment : "유저 권한"
  })
  role: UserRole;

  /**
   * Table Relations
   */
  @OneToOne(
    () => AuthEntity,
    ( auth ) => auth.user,
    { cascade: true }
  )
  auth: AuthEntity;
}
