import { Prop, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";



@Schema({timestamps:true})

export class CommentsModel extends Document{
    @Prop()
    comment:string;
    @Prop()
    userId:Types.ObjectId
    @Prop()
    postId:string;

}