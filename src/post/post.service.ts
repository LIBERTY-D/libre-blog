import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto, DeletePostDto } from 'src/dtos';
import { PostModel } from 'src/models/post.model';
import { UserTokenPayload } from 'src/types/user.module.types';
import { UpdatePostDto, LikePostDto, UnLikePostDto } from '../dtos/post.module.dto';
import { v4 } from 'uuid';
import { FileService } from '../fs/fs.file-service';

@Injectable()
export class PostService {
    constructor(@InjectModel("Post") private readonly postModel:Model<PostModel>,private readonly fileservice:FileService){

    }
    async getPosts(){
        return await this.postModel.find()

    }
    async uploadPostFile(currentUser:UserTokenPayload,file:Express.Multer.File,postId:string){
        const fileBytes = file.buffer.toString("base64")
        const uid = v4()
        const filename =  "./uploads/"+uid+file.originalname
        //this.fileservice.writeFile(filename,file.buffer)//write to my file system
        return await this.postModel.findOneAndUpdate({_id:postId},{postImg:fileBytes},{
            runValidators:true,
            new:true
        })
      
    }
    async getPostFilter(currentUser:UserTokenPayload,filter:{}){
        return await this.postModel.find(filter)
       
        
    }
    async createPost(currentUser:UserTokenPayload,post:CreatePostDto):Promise<PostModel>{
        return await this.postModel.create(post)

    }
    async deletePost(currentUser:UserTokenPayload,deletePostDto:DeletePostDto){
          let post  = await this.postModel.findOne({_id:deletePostDto.postId})
          if(post===null){
             return post
          }
        return await this.postModel.deleteOne({_id:deletePostDto.postId})
    }
    async updatePost(currentUser:UserTokenPayload,updatePostDto:UpdatePostDto){
        const findPost =  await this.postModel.find({_id:updatePostDto.postId})
        if((findPost==null) ||findPost.length==0){
            return null
        }
        if(findPost[0].userId!==currentUser.sub){
            return null

        }
        return await this.postModel.findOneAndUpdate({_id:updatePostDto.postId},{...updatePostDto},{
            runValidators:true,
            new:true
        })
    }
     async likePost(currentUser:UserTokenPayload,likePostDto:LikePostDto){
        const findPost =  await this.postModel.find({_id:likePostDto.postId})
        if((findPost==null) ||findPost.length==0){
            return null
        }
        if(!findPost[0].postLikes.includes(likePostDto.userId)){
            return await this.postModel.findOneAndUpdate({_id:likePostDto.postId},{
                $push:{
                    postLikes:currentUser.sub
                }
            },{
                 runValidators:true,
                 new:true
            })
        }else{
            return "included"
        }
     }

     async unLikePost(currentUser:UserTokenPayload,unLikePostDto:UnLikePostDto){
        const findPost =  await this.postModel.find({_id:unLikePostDto.postId})
        if((findPost==null) ||findPost.length==0){
            return null
        }
        if(findPost[0].postLikes.includes(unLikePostDto.userId)){
            return await this.postModel.findOneAndUpdate({_id:unLikePostDto.postId},{
                $pull:{
                    postLikes:currentUser.sub
                }
            },{
                 runValidators:true,
                 new:true
            })
        }else{
            return "disliked"
        }
     }
     async hideAndUnHidePost(postId:string){
        const findPost =  await this.postModel.find({_id:postId})
        if((findPost==null) ||findPost.length==0){
            return null
        }
        if(findPost[0].hide){
            return await this.postModel.findOneAndUpdate({_id:postId},{
                 hide:false
            },{
                 runValidators:true,
                 new:true
            })
        }else{
            return await this.postModel.findOneAndUpdate({_id:postId},{
                hide:true
           },{
                runValidators:true,
                new:true
           })
        }
     }
}
