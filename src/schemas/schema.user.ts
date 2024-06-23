import { SchemaFactory } from '@nestjs/mongoose';
import { UserModel } from 'src/models';
import * as bcrypt from 'bcrypt';



export const UserSchema = SchemaFactory.createForClass(UserModel)


UserSchema.set('toJSON', {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    },
  });
  
UserSchema.methods.comparePassword = async function(password:string,encrypted:string):Promise<boolean>{
    return await bcrypt.compare(password,encrypted)

}

UserSchema.pre("save",async function(next){
    if(!this.isModified("password"))next()
      try {
        const salt  = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt);
        this.confirmPassword = undefined
        next()
      } catch (error) {
        return next(error)
      }
    
})
