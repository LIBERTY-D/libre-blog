import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Secrets } from "src/secrets/secrets.global.keys";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly secret:Secrets){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: false,
             secretOrKey: secret.getSecrets().jwt_secret,
             
            
            
        })
    }
    async validate(payload:any) {
        return payload
      }

}