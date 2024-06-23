import { HttpStatus } from "@nestjs/common";

export class Message{
    status:string;
    message:string;
    statusCode:number;

    constructor( message:string,status:string,statusCode:number){
        this.message = message
        this.status= status;
        this.statusCode =statusCode

    }
    
}