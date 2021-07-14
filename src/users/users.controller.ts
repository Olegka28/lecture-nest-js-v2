import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Role } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { CreateUseDto } from "./dto/crete-user.dto";
import { UsersService } from "./users.service";

@Controller("/users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() userDto: CreateUseDto) {
    return this.userService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role("ADMIN")
  @Get()
  getAllUser() {
    return this.userService.getAllUser();
  }
}
