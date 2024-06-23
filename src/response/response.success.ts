import { UserModel } from "src/models";
import { PostModel } from "src/models/post.model";
import { User } from "src/types/user.module.types";



export class Response{
    constructor(private message:string|object, private statusCode:number,private  status:string,private  data:UserModel[]|PostModel[] ){

    }


}