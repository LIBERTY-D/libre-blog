import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from 'src/schemas/schema.comment';

import { PostModule } from 'src/post/post.module';





@Module({
    imports:[PostModule,MongooseModule.forFeature([{name:"comment",schema:CommentSchema}])],
    controllers:[CommentController],
    providers:[CommentService]
})
export class CommentModule {}
