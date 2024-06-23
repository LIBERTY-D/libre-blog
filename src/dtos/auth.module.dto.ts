import { IsEmail, IsNotEmpty } from "class-validator";
import { IsUsernameOrEmail } from "src/customValidators/validate";
import { IAuth } from "src/IFaces";

export class AuthDto implements IAuth{

    @IsNotEmpty()
    username:string;
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    password:string;
    @IsNotEmpty()
    confirmPassword?:string
}



export class LoginDto{
    @IsUsernameOrEmail()
    username:string
    @IsNotEmpty()
    password:string;

}