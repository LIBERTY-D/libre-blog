import { Body, Controller, Delete, Get, HttpCode, Patch, Post, Req, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, ValidationPipe} from "@nestjs/common";
import { UserService } from "./user.service";
import { QueryUserDecorator } from "src/decorators/user.decorator";
import {  UserTokenPayload } from "src/types/user.module.types";
import { CreateUserDto, DeleteUserDto, FilterDto, FollowDto, UnFollowDto, UpdateUserDto } from '../dtos/user.module.dto';
import { Response } from "src/response/response.success";
import { JwtAuthGuard } from "src/gaurds/guards.jwt";
import { Request } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileSizeValidationPipe } from "src/pipes";





@Controller("user")
export class UserController{
    constructor(private userService:UserService){

    }
    @Post("create")
    @UseInterceptors(FileInterceptor("profile"))
    createUser(@Body(new ValidationPipe()) user:CreateUserDto,@UploadedFile(FileSizeValidationPipe) file:Express.Multer.File){
        const profile = file.buffer.toString("base64")
        return this.userService.createUser({...user,profile})
    }
    @HttpCode(200)
    @Patch("update")
    @UseGuards(JwtAuthGuard)
     async updateUser( @Req() req:Request ,@Body(new ValidationPipe()) user:UpdateUserDto){
         return await this.userService.updateUser(req.user as UserTokenPayload,user)

   
    }
    @Get()
    async getAllUsers(){
        let users =  await this.userService.getAllUsers()
        return   new Response("retrieved",200,"success",[...users]);

    }
    @Get("filter")
    async getAllUser(@QueryUserDecorator()query:FilterDto){
        let filter ={}

        if(query.id){
            filter["_id"]=query.id
        }
        if(query.email){
            filter["email"] =query.email
        }

        if(query.username){
            filter["username"] =  query.username
        }
        let users = await this.userService.getAllFiltered(filter)
       
        return new Response("retrieved",200,"success",[...users])
          
    }


    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @Delete("delete")
    async deleteUser(@Body(new ValidationPipe()) deleteDto:DeleteUserDto,@Req() req){
       let data = await this.userService.deleteUser(deleteDto,req.user)
       if(data===null){
           throw new UnauthorizedException("provide proper credentials")
       }else if(data.acknowledged){
             return new Response("deleted",201,"success",[])
       }

    }

    @UseGuards(JwtAuthGuard)
    @Post("follow")
    async followUser(@Body(new ValidationPipe()) followDto:FollowDto,@Req() req){
    return await this.userService.followUser(req.user,followDto)

    }
    @UseGuards(JwtAuthGuard)
    @Post("unfollow")
    async  unfollowUser(@Body(new ValidationPipe()) unFollowDto:UnFollowDto,@Req() req){
         return  await this.userService.unFollowUser(req.user,unFollowDto)
    }


}