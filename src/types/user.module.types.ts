import { Types } from "mongoose";

export enum CATEGORY{
    CODING="CODING",
    EDUCATION="EDUCATION",
    HACKING="HACKING",
    PROGRAMMING="PROGRAMMING"

}



export interface IUser{
     id:string;
     email:string,
     username:string;
     isAdmin:boolean;
     createdAt:Date;
     updatedAt:Date;
     followers?:string[];
     following?:string[];

    
}


export class User implements IUser{
     id:string;
     email: string;
     username:string;
     isAdmin:boolean;

     createdAt:Date;
     updatedAt:Date;
     followers?:string[];
     following?:string[];
    constructor(id:string,email:string,username:string,isAdmin:boolean,createdAt:Date,updatedAt:Date,followers?:[],following?:[]){
        this.id=id;
        this.email=email;
        this.username=username;
        this.isAdmin=isAdmin;
        this.createdAt =createdAt;
        this.updatedAt =updatedAt;
        this.followers =followers;
        this.following=following

    }

    getEmail(){
        return this.email;

    }
    getId(){
        return this.id
    }

    getUsername(){
        return this.username
    }
    
}
    
export enum filterEnum{
    USERNAME="username",
    EMAIL="email",
    ID="id"
}
export type filterType = {username?:string,id?:string,email?:string}


export  interface UserTokenPayload{
    username:string,
    sub:string|Types.ObjectId,
    iat:number,
    exp:number
}