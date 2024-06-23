import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpException, HttpStatus,Param,Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, DeletePostDto, FilterPostDto, LikePostDto, UnLikePostDto, UpdatePostDto } from 'src/dtos';
import { Response } from 'src/response/response.success';
import { JwtAuthGuard } from 'src/gaurds/guards.jwt';
import { UserTokenPayload } from 'src/types/user.module.types';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from 'src/pipes';
import { HideUnhidePostDto } from '../dtos/post.module.dto';




@Controller('post')
export class PostController {
    constructor(private readonly postService:PostService){
    }
    @Get()
    async getPosts(){
        
        return new Response("retrieved",200,"success",await this.postService.getPosts())

    }

    @UseGuards(JwtAuthGuard)
    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    async uploadPostFile(@UploadedFile(FileSizeValidationPipe) file:Express.Multer.File,@Req() req:Request,@Query("id") postId:string){
        const currentUser =  req.user as UserTokenPayload 
        const postImage = await this.postService.uploadPostFile(currentUser,file,postId)
        return postImage;
      
       
    }


    @UseGuards(JwtAuthGuard)
    @Get("filter")
    async getPostFilter(@Query() query:FilterPostDto,@Req() req:Request){
        const currentUser = req.user as UserTokenPayload
        const filter ={}
        if(query.id){
            filter["_id"] = query.id
        }
        if(query.postTitle){
            filter["postTitle"] =  query.postTitle
        }
        if(query.userId){
            filter["userId"] = query.userId
        }
        const filtered = await this.postService.getPostFilter(currentUser,filter)
        return new Response("retrieved",200,"success",filtered)
           
    }
    @Post("create")
    @UseGuards(JwtAuthGuard)

     async createPost(@Body(new ValidationPipe()) post:CreatePostDto,@Req() req:Request ){
        const currentUser=  req.user as UserTokenPayload;
        if(currentUser.sub!==post.userId){
            throw new BadRequestException("please provide proper Id to be identified")
        }
      
        let createdPost  = await this.postService.createPost(currentUser,post)
      
        if(createdPost!==null){
      
            return new Response("created",200,"success",[createdPost])
        }
        else{
            
            throw new HttpException("fail",HttpStatus.BAD_REQUEST)
        }
    }
    @UseGuards(JwtAuthGuard)
    @Delete("delete")
    async deletePost(@Body(new ValidationPipe()) deletePostDto:DeletePostDto,@Req() req:Request ){
        const currentUser =  req.user as UserTokenPayload
        if(currentUser.sub!==deletePostDto.userId){
            throw new  ForbiddenException("you are forbidden to perform this operation.")
        }
        let post=  await this.postService.deletePost(currentUser,deletePostDto)
        if(post==null){
            throw new BadRequestException("no post with such id")
        }
        return new Response("deleted",201,"success",[])
    }
     @UseGuards(JwtAuthGuard)
     @Patch("update")
     @UseInterceptors(FileInterceptor("file"))
     async updatePost(@Body(new ValidationPipe()) updatedto:UpdatePostDto,@Req() req:Request,@UploadedFile(FileSizeValidationPipe) file:Express.Multer.File){
        let postImg:string|null=null;
        const currentUser = req.user as UserTokenPayload
        if(file){
           postImg =  file.buffer.toString("base64")
        }
        if(currentUser.sub !== updatedto.userId){
                 throw new BadRequestException("provide proper credentials to do this operation")
        }
        let updatedPost = await this.postService.updatePost(currentUser,{...updatedto,postImg})
        if(updatedPost==null){
            throw new BadRequestException("the post you trying to update doesn't exist or might not be your post")
        }
        
        return new Response("updated post",200,"success",[updatedPost])
       }

       @UseGuards(JwtAuthGuard)
       @Patch("hide")
       async hideAndUnHidePost(@Body(new ValidationPipe()) hideAndUnHidePost:HideUnhidePostDto){
         const getPost =  await this.postService.hideAndUnHidePost(hideAndUnHidePost.postId)
         if(getPost==null) {
                throw new BadRequestException("the post you trying to update doesn't exist or might not be your post")
             }
             else{
                return  new Response("updated",200,"success",[getPost])
             }
       }

       @UseGuards(JwtAuthGuard)
       @Patch("like")
        async likePost(@Body(new ValidationPipe()) likePostDto:LikePostDto,@Req() req:Request){
            const currentUser = req.user as UserTokenPayload
            if(currentUser.sub !== likePostDto.userId){
                     throw new ForbiddenException("provide proper credentials to do this operation")
            }

            const likedPost =  await  this.postService.likePost(currentUser,likePostDto)
            if(likedPost==null){
                throw new ForbiddenException("no post with such id")
            }
            if(likedPost==="included"){
                return new Response("post liked already",200,"success",[]) 
            }
            return new Response("liked post",200,"success",[likedPost])
        }
        @UseGuards(JwtAuthGuard)
        @Patch("unlike")
        async unLikePost(@Body(new ValidationPipe())  unLikePostDto:UnLikePostDto,@Req() req:Request){
            const currentUser = req.user as UserTokenPayload
            if(currentUser.sub !== unLikePostDto.userId){
                     throw new ForbiddenException("provide proper credentials to do this operation")
            }
            const disLikedPost =  await  this.postService.unLikePost(currentUser,unLikePostDto)

            if(disLikedPost==null){
                throw new ForbiddenException("no post with such id")
            }
                
            if(disLikedPost==="disliked"){
                return new Response("post disliked already",200,"success",[]) 
            }

            return new Response("disliked post",200,"success",[disLikedPost])
        }

}
