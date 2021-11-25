import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/shared/entity";
import * as controllers from './controllers';
import * as providers from './providers';
import { UserService } from "./providers";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UserService],
    controllers: Object.values(controllers),
    providers: Object.values(providers)
})
export class UserModule{}