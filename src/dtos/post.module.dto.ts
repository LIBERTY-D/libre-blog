
import { IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { Types } from "mongoose";
import { IsNotAllowed } from "src/customValidators/validate";
import { IPost } from "src/IFaces";


export enum CATEGORY{
    CODING="CODING",
    EDUCATION="EDUCATION",
    HACKING="HACKING",
    PROGRAMMING="PROGRAMMING",
    TRAVEL="TRAVEL",
    CYBER_SECURITY="CYBER SECURITY"

}
export class CreatePostDto implements IPost{

    @IsNotEmpty()
    postImg:string;
    @IsNotEmpty()
    postDesc:string;
    @IsNotEmpty()
    postTitle:string;
    @IsArray()
    @IsOptional()
    postLike?: string[];
    @IsNotEmpty()
    userId: Types.ObjectId| string;

    @IsOptional()
    category:CATEGORY[]
  
}
export class DeletePostDto{
    @IsNotEmpty()
    userId:string;
    @IsNotEmpty()
    postId:string;
}
export class UpdatePostDto{

    @IsNotEmpty()
    @IsOptional()
    postImg?:string;

    @IsNotEmpty()
    @IsOptional()
    postDesc?:string;

    @IsNotEmpty()
    @IsOptional()
    postTitle?:string;

    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    postId:string
  
    @IsNotAllowed()
    _id:string
}

export class LikePostDto {
    @IsNotEmpty()
    postId: Types.ObjectId|string
    @IsNotEmpty()
    userId: Types.ObjectId& string;

  
}
export class UnLikePostDto extends LikePostDto {
    postId: Types.ObjectId|string
    userId: Types.ObjectId& string;

  
}

export class FilterPostDto{

    postTitle?:string;
    userId?:string
    id?:string
    
}

export class PostImageDto{
    postId:string
}

export class  HideUnhidePostDto {
    postId:string
}