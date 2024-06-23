import {   Injectable } from "@nestjs/common";

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto, DeleteUserDto, FilterDto, FollowDto, UnFollowDto, UpdateUserDto } from "src/dtos";
import { UserModel } from "src/models";
import { AuthService } from '../auth/auth.service';
import { UserTokenPayload } from "src/types/user.module.types";
import { Response } from "src/response/response.success";



@Injectable({})

export class UserService{
    constructor(@InjectModel("User") private readonly userModel:Model<UserModel>,private authService:AuthService){

    }
  
    async createUser(user:CreateUserDto){
        return await this.userModel.create(user)
    }

    async updateUser(payload:UserTokenPayload,updateDto:UpdateUserDto){
      let queriedUser:any= null;
      let authorizedUser = await this.authService.authorize(payload)

      if(authorizedUser.id!==updateDto.updateId){
          return new Response("unauthorized",401,"fail,",[])
      }
       queriedUser = await this.userModel.findOne({email:authorizedUser.email}).select("+password")


      if(updateDto.newPassword  && updateDto.oldPassword && updateDto.confirmPassword){
        if(! await (this.authService.comparePassword(updateDto.oldPassword,queriedUser.password))){
          return new Response("your old password must match with the one in the database",400,"fail,",[])
       }else{
        if(updateDto.newPassword==updateDto.confirmPassword){
          queriedUser = await this.userModel.findOne({ email: authorizedUser.email })
          queriedUser.password = updateDto.newPassword;
          queriedUser.confirmPassword = updateDto.confirmPassword;
          delete updateDto.confirmPassword
          await queriedUser.save();
        }else{
          return new Response("passwords do not match",400,"fail,",[])
        }
       }
      }
      queriedUser = await this.userModel.findOneAndUpdate({_id:authorizedUser.id},updateDto,{
        runValidators:true,
        new:true
      })
      return new Response("updated",200,"success",[queriedUser])
    }

   async  getAllUsers(){
     return await  this.userModel.find();
     
    }

    async getAllFiltered(filterDto:FilterDto){
      let users= await this.userModel.find(filterDto)
 
      return users;

    }
    async getUserById(userId:string){
      return await this.userModel.findById(userId)

 
    }
    async getUserByUsername(username:string){
      return await this.userModel.findOne({username:username})
    }

    async getUserByEmail(email:string){
      return await this.userModel.findOne({username:email})
    }

    
    async deleteUser(deleteDto:DeleteUserDto,payloadToken:UserTokenPayload){
          if(deleteDto.userId===payloadToken.sub){
           let deletedUser = await this.userModel.deleteOne({_id:payloadToken.sub})
           return deletedUser;
          }else{
            return null
          }

    }

    async followUser(req:UserTokenPayload,followDto:FollowDto){

            if(req.sub===followDto.userId && req.sub !== followDto.otherId){
            
              // currentUser
              let getCurrentUser= await this.userModel.findOne({_id:req.sub})

              if(getCurrentUser.following.includes(followDto.otherId)){
                return new Response("you already follow this person",200,"success",[])
              }else{
                let currentUser= await this.userModel.findOneAndUpdate({_id:req.sub},{
                  $push:{
                    following:followDto.otherId
                  }
                },{
                  runValidators:true,
                  new:true
                })
               // other user
               await this.userModel.findOneAndUpdate({_id:followDto.otherId},{
                $push:{
                  followers:req.sub
                }
              },{
                runValidators:true,
                new:true
              }
            )
            return new Response("followed",200,"success",[currentUser])
          }
             }else{
              return new Response("you can't follow yourself",200,"success",[])
        }
      
    }

    async unFollowUser(req:UserTokenPayload,unFollowDto:UnFollowDto){
        // currentUser
        let getCurrentUser= await this.userModel.findOne({_id:req.sub})
        if(!getCurrentUser.following.includes(unFollowDto.otherId)){
           return new Response("you already don't follow this user",200,"success",[])
        }
          let currentUser= await this.userModel.findOneAndUpdate({_id:req.sub},{
            $pull:{
              following:unFollowDto.otherId
            }
          },{
            runValidators:true,
            new:true
          })
        // other user
         await this.userModel.findOneAndUpdate({_id:unFollowDto.otherId},{
          $pull:{
            followers:req.sub
          }
        },{
          runValidators:true,
          new:true
        })
        return new Response("unfollowed",200,"success",[currentUser])    
    }
    
  



}