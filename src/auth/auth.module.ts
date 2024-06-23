import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "src/strategy/local.strategy";
import { JwtStrategy } from "src/strategy/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { Secrets } from "src/secrets/secrets.global.keys";
import { SecretsModule } from "src/secrets/secrets.module";




@Module({
    imports:[UserModule,
        
        JwtModule.registerAsync({
            imports:[SecretsModule],
            inject:[Secrets],
            useFactory:async(secrets:Secrets)=>({
                
               secret:secrets.getSecrets().jwt_secret,
               signOptions:{
                expiresIn:secrets.getSecrets().jwt_exp
               },
            })
        })
        ,PassportModule],
    controllers:[AuthController],
    providers:[AuthService,LocalStrategy,JwtStrategy,Secrets],

  

    

})
export class AuthModule{

}