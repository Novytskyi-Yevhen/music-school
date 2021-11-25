import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/shared/entity";
import { UsersDTO } from "src/users/dto/usersDTO";
import { UserService } from "src/users/providers";

@Injectable()
export class AuthService{
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}
    
    async validateUser(name: string, pass: string){
        const user: User = await this.userService.findOneByName(name);
        if (user && user.password === pass) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: Partial<UsersDTO>){
        return {
            accessToken: this.jwtService.sign({
                username: user.name 
            })
        }
    }
}