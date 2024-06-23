import { ArgumentsHost, Catch, ExceptionFilter, HttpCode, HttpStatus } from "@nestjs/common";


import { Response } from "express";
import { Error, mongo} from "mongoose";
import { Response as ResponseJson } from "src/response/response.success";



@Catch(Error.CastError,mongo.MongoServerError,Error.ValidationError)
export class MongooseErrorFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
         const context =  host.switchToHttp()
         const response:Response= context.getResponse();
  
          const fields =["email","username","postTitle"]

         if(exception instanceof Error.CastError){
          const data =  new ResponseJson("Invalid Id",HttpStatus.BAD_REQUEST,"fail",[])
          response.status(HttpStatus.BAD_REQUEST).json(data)
         }
         if(exception instanceof mongo.MongoServerError){
          if(exception.code==11000){
               let key:any=null;
               fields.forEach((element,_)=>{
                  if(element in exception.keyPattern ){
                       key =  element;
                  }
               })

               const data =  new ResponseJson(`${key} is taken`,HttpStatus.BAD_REQUEST,"fail",[])
               response.status(HttpStatus.BAD_REQUEST).json(data)
          }
  
         }
         if(exception instanceof Error.ValidationError){
           const errors =  exception.errors;
           const errorResponse= {}
           
           Object.keys(exception.errors).forEach((element,_)=>{
              const err = errors[element];
              errorResponse[err.path] = err.message;
           })

          const data =  new ResponseJson(errorResponse,HttpStatus.BAD_REQUEST,"fail",[])
          response.status(HttpStatus.BAD_REQUEST).json(data)
         }  
    }
    
}