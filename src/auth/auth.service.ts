import {  Injectable} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserModel } from "src/models";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserTokenPayload } from 'src/types/user.module.types';





@Injectable({})
export class AuthService{

    constructor(@InjectModel("User") private readonly userModel:Model<UserModel>, private readonly jwtService:JwtService){

    }
    
    async validateUser (username:string,password:string){
        const user = await this.userModel.findOne({$or:[
            {username:username},
            {email:username}
        ]}).select("+password")
        
        if(!(user)|| !(await this.comparePassword(password,user.password)) ){
           return null
     
        }
        return user;
    }
    async login(user:any){
        
        const payload= {username:user.username,sub:user._id}
        const currentUser =  {...user._doc}
        delete currentUser.password
        return  {... await this.signToken(payload,user),...currentUser}
         
     }
    public async comparePassword(password: string,encrypted:string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, encrypted);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async signToken(payload:any,user:any){
       
        return    {access_token:await this.jwtService.signAsync(payload)}
    }

    async authorize(userTokenPayload:UserTokenPayload){
        return  await this.userModel.findById(userTokenPayload.sub).select("-password")
    }

   
 

    
}