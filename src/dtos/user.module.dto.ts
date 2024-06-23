import { IsArray, IsEmail, isNotEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsNotAllowed } from "src/customValidators/validate";
import {  Iuser } from "src/IFaces";


export class UserDto implements Iuser{
    @IsArray()
    followers:string[];
    @IsArray()
    following:string[];
    @IsNotEmpty()
    @IsString()
    profile:string
    @IsString()
    @IsNotEmpty()
    coverPhoto:string

 
}


export  class CreateUserDto{
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    confirmPassword:string;
    @IsOptional()
    profile:string;
}

export class UpdateUserDto{
    @IsNotEmpty()
    updateId:string;
    @IsOptional()
    @IsEmail()
    email: string;
    @IsOptional()
    oldPassword:string
    @IsOptional()
    newPassword: string;
    @IsOptional()
    confirmPassword:string;
    @IsOptional()
    coverPhoto:string;
    @IsOptional()
    @IsNotEmpty()
    profile:string;
    @IsNotAllowed()
    isAdmin:boolean;
    




}

export class DeleteUserDto{
    @IsNotEmpty()
    userId:string;
}

export class FollowDto extends DeleteUserDto {
      userId: string;
      @IsNotEmpty()
      otherId:string;
}

export class UnFollowDto extends FollowDto {
     userId: string;
     @IsNotEmpty()
     otherId: string;
     
}

export class FilterDto{
    @IsNotEmpty()
    @IsOptional()
    id?:string
    @IsNotEmpty()
    @IsOptional()
    @IsEmail()
    email?: string;
    @IsNotEmpty()
    @IsOptional()
    username?:string;
    // @IsNotEmpty()
    // @IsOptional()
    // isAdmin?:boolean;
    
   
}