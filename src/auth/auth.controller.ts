import {  Controller,Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { LocalAuthGuard } from "src/gaurds/gaurds.local";
import { Request } from "express";

@Controller("auth")
export class AuthController{
    constructor(private readonly authservice:AuthService){

    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Req() req:Request){
       return await this.authservice.login(req.user)
    }

    

}