import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

interface CommentDtoI{

    comment:string;

    userId:string|Types.ObjectId

    postId:string;
}

export class CreateCommentDto implements CommentDtoI{
    @IsNotEmpty()
    comment:string;
    @IsNotEmpty()
    userId:string|Types.ObjectId
    @IsNotEmpty()
    postId:string;
}

export class DeleteCommentDto{
    @IsNotEmpty()
    userId:string|Types.ObjectId
    @IsNotEmpty()
    commentId:string;
}

export class UpdateCommentDto implements CommentDtoI{
    @IsNotEmpty()
    userId:string|Types.ObjectId
    @IsNotEmpty()
    postId:string;
    @IsNotEmpty()
    comment: string;
    @IsNotEmpty()
    commentId:string
}

export class ReadCommentDto{
  @IsNotEmpty()
  commentId:Types.ObjectId
}



