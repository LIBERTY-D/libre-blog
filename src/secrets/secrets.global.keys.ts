import {   Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable({})
export class Secrets{
     constructor(private readonly configService:ConfigService){

     }

     getSecrets():{db_url:string,jwt_secret:string,jwt_exp:string}{
        const db_url = this.configService.get("BLOG_DB_URL")
        const jwt_secret =  this.configService.get("JWT_SECRET")
        const jwt_exp =  this.configService.get("JWT_EXP")
     
        return{db_url,jwt_secret,jwt_exp}
     }
}