import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/schemas/schema.user";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";






@Module({
    imports:[MongooseModule.forFeature([{name:"User",schema:UserSchema}]),],
    providers:[UserService,AuthService,JwtService],
    controllers:[UserController],
    exports:[MongooseModule]
    
})
export class UserModule{

}