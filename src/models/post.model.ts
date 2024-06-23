import { Document, Types} from 'mongoose';
import { Prop, Schema} from "@nestjs/mongoose";
import { IPost } from "src/IFaces";






@Schema({timestamps:true})
export class PostModel extends Document implements IPost{
    @Prop()
    postDesc: string;
    @Prop()
    postImg: string;
    @Prop({unique:true})
    postTitle: string;
    @Prop()
    postLikes: string[]|Types.ObjectId[];
    @Prop({type:Types.ObjectId,ref:"User",required:true})
    userId:Types.ObjectId;
    @Prop({default:[]})
    category:string[]
    @Prop({default:false})
    hide:boolean


}