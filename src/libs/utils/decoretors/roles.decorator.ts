import { SetMetadata } from "@nestjs/common";
import { USER_ROLE } from "../../../domains/users/infrastructure/entities/enums";



export const ROLES_KEY = "roles";
export const Roles = ( ...roles: USER_ROLE[] ) => SetMetadata( ROLES_KEY, roles );