import { SetMetadata } from "@nestjs/common";

export const ROLES_SYMBOL = Symbol("roles");

export const Role = (...roles) => SetMetadata(ROLES_SYMBOL, roles);
