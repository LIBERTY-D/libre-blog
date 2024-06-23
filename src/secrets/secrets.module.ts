import {  Module } from '@nestjs/common';

import { Secrets } from './secrets.global.keys';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports:[ConfigModule.forRoot({
        isGlobal:true
    })],
    providers:[Secrets],
    exports:[Secrets]
})
export class SecretsModule {}
