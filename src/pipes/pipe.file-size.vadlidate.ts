import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";



@Injectable()
export class FileSizeValidationPipe implements PipeTransform{
    private readonly maxSize = 10 * 1024 * 1024; // 10MB
    transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
        
        if (!value || !value.size) {
            throw new BadRequestException('No file provided.');
        }
        
        if (value.size > this.maxSize) {
            throw new BadRequestException(`File size should not exceed ${this.maxSize / 1024 / 1024}MB.`);
        }

        return value;
        
    }

}