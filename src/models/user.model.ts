
import { Schema,Prop } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { IAuth, Iuser } from "src/IFaces";
import { PostModel } from "./post.model";



@Schema()
export class UserModel extends Document implements Iuser,IAuth{
    @Prop({unique:true})
    email: string;
    @Prop({unique:true})
    username:string;
    @Prop({
        select:false,
        minlength:6,
    })
    password:string;
    @Prop({
        validate:{
            validator:function(confirmPassword:string){
                return confirmPassword == this.password;
            },
            message:"passwords do not match"
            
        }
    })
    confirmPassword:string;
    @Prop({default:false,select:false})
    isAdmin:boolean;
    @Prop({default:[]})
    followers:string[];
    @Prop({default:[]})
    following:string[];
    @Prop({default:""})
    profile:string
    @Prop({default:""})
    coverPhoto:string
    @Prop({type:Types.ObjectId,ref:'Post',required:true,default:[]})
    posts:PostModel|Types.ObjectId[]

}


