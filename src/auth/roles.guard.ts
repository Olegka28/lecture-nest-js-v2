import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_SYMBOL } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_SYMBOL,
        [context.getHandler(), context.getClass()]
      );

      const authHeader = req.headers.authorization;

      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({
          message: "Пользователь не авторизован",
        });
      }

      const user = this.jwtService.verify(token);

      req.user = user;

      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (e) {
      throw new UnauthorizedException({
        message: "Нет доступа",
      });
    }
  }
}
