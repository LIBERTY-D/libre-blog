import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileService {
    private readonly path:string="./uploads"
    constructor(){
    if(!fs.existsSync(this.path)){
          fs.mkdirSync(this.path)
    }
    }
    
    async writeFile(filePath: string, data: Buffer): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fs.writeFile(filePath, data, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}
