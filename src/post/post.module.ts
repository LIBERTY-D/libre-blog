import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from 'src/schemas';
import { FileService } from 'src/fs/fs.file-service';






@Module({
    imports:[MongooseModule.forFeature([{name:"Post",schema:PostSchema}])],
    exports:[MongooseModule],
    controllers:[PostController],
    providers:[PostService,FileService]
})
export class PostModule {}
