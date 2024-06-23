import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/gaurds/guards.jwt';
import { CreateCommentDto, DeleteCommentDto, ReadCommentDto, UpdateCommentDto } from 'src/dtos';
import { Request } from 'express';
import { UserTokenPayload } from 'src/types/user.module.types';


@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService:CommentService){

    }
    

    @Post("create")
    createComment(@Body(new ValidationPipe())commentdto:CreateCommentDto,@Req() req:Request){
        
        return this.commentService.createComment(req.user as UserTokenPayload,commentdto)
    }
    @Patch("update")
    updateComment(@Body(new ValidationPipe())commentdto:UpdateCommentDto,@Req() req:Request){
        return this.commentService.updateComment(req.user as UserTokenPayload,commentdto)
    }

    @Get("/")
    getComments(@Query("id")id:string){
        return this.commentService.getComments(id)
    }


    @Delete("delete")
    deleteComment(@Body(new ValidationPipe())commentdto:DeleteCommentDto,@Req() req:Request){
         return this.commentService.deleteComment(req.user as UserTokenPayload,commentdto)
    }

}

