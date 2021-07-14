import { Body, Controller, Post } from "@nestjs/common";
import { CreateUseDto } from "src/users/dto/crete-user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  login(@Body() dto: CreateUseDto) {
    return this.authService.login(dto);
  }

  @Post("/registration")
  registration(@Body() dto: CreateUseDto) {
    return this.authService.registration(dto);
  }
}
