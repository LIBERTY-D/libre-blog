import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { Secrets } from './secrets/secrets.global.keys';
import { SecretsModule } from './secrets/secrets.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import {join} from "path"
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [

    ServeStaticModule.forRoot({
      rootPath:join(__dirname,"..","uploads")
    }),
    MongooseModule.forRootAsync({
      imports:[SecretsModule],
       useFactory:async(secret:Secrets)=>({
        uri:secret.getSecrets().db_url,
       
       }),
       inject:[Secrets]
    }),
    UserModule,AuthModule, PostModule, SecretsModule, CommentModule
  ],
 
})
export class AppModule {}
