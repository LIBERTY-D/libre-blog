import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto, DeleteCommentDto, ReadCommentDto, UpdateCommentDto } from 'src/dtos';
import { CommentsModel, PostModel } from 'src/models';
import { UserTokenPayload } from 'src/types/user.module.types';

@Injectable()
export class CommentService {

   constructor(@InjectModel("comment") private readonly commentModel:Model<CommentsModel>,@InjectModel("Post") private readonly postModel:Model<PostModel>){

   }
    async createComment(currentUser:UserTokenPayload, commentdto:CreateCommentDto){
        if(currentUser.sub !== commentdto.userId){
            
            throw new UnauthorizedException("you are not authorized to make the comment")
        }
        return await this.commentModel.create(commentdto)
 
    }
    async updateComment(currentUser:UserTokenPayload,commentdto:UpdateCommentDto){
        if(currentUser.sub !== commentdto.userId){
            
            throw new ForbiddenException("you are not authorized to update this comment")
        }
        const findPost = await this.postModel.findById(commentdto.postId)
        if(!findPost){
            throw new ForbiddenException("the post you want to comment to no longer exist")
        
        }
        const findComment = await this.commentModel.findById(commentdto.commentId);
        if(!findComment){
            throw new ForbiddenException("the comment you want to comment to no longer exist")
        }

        return await this.commentModel.findOneAndUpdate({_id:commentdto.commentId},{
           ...commentdto
        },{
            runValidators:true,
            new:true
        })
    }
  
    async deleteComment(currentUser:UserTokenPayload,commentdto:DeleteCommentDto){
        if(currentUser.sub!==commentdto.userId){
            throw new ForbiddenException("you can't delete this comment")
        }

        const comment =  await this.commentModel.findOne({_id:commentdto.commentId});
        if(!comment){
            throw new ForbiddenException("the comment you trying to delete  no longer exist") 
        }
        return await this.commentModel.deleteOne({_id:commentdto.commentId})
        
    }

    async getComments(id:string){
        if(id){
            return   await this.commentModel.find({_id:id}) 
        }
        return await this.commentModel.find() 
    }

  
}
