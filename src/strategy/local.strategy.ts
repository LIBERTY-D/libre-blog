import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-local"
import { AuthService } from '../auth/auth.service';
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService:AuthService){
            super()
    }
    async validate(username:string,password:string){
        const user =  await this.authService.validateUser(username,password)

        return user;
    }
}