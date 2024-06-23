import { SchemaFactory } from "@nestjs/mongoose";
import { PostModel } from "src/models";


export const PostSchema  =  SchemaFactory.createForClass(PostModel)




