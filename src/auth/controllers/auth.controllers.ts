import { Body, Controller, Get, Post, Req, Request, UseGuards } from "@nestjs/common";
import { UsersDTO } from "src/users/dto/usersDTO";
import { UserService } from "src/users/providers";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { LocalAuthGuard } from "../guards/index";
import { AuthService } from "../providers/auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService, private userService: UserService){}

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
        const newUser = await this.userService.create(data);
        return await this.authService.login(newUser);
    }
}