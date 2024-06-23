import { Types } from "mongoose";

export interface IPost{
    postImg:string;
    postDesc:string;
    postTitle:string;
    postLikes?:Array<string>|Array<Types.ObjectId>;
    userId:Types.ObjectId|string;
    
}