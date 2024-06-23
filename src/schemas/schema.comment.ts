import { SchemaFactory } from "@nestjs/mongoose";
import { CommentsModel } from "src/models";

export const CommentSchema  =  SchemaFactory.createForClass(CommentsModel)
