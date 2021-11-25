import { Body, Controller, Get, Post, Req, Request, UseGuards } from "@nestjs/common";
import { UsersDTO } from "src/users/dto/usersDTO";
import { UserService } from "src/users/providers";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { LocalAuthGuard } from "../guards/index";
import { AuthService } from "../providers/auth.service";
import { Roles } from "src/common/decorators/roles.decorators";
import { RoleService } from "src/role/providers";
import { registrationRole } from "src/config";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService, private userService: UserService, private roleService: RoleService){}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Req() req){
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req){
        return req.user;
    }

    @Post('/register')
    async register(@Body() data: UsersDTO){
        data.role = await this.roleService.findOneByName(registrationRole);
        const newUser = await this.userService.create(data);
        return await this.authService.login(newUser);
    }
}