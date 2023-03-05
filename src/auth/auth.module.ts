
import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from "./schemas/auth.schema";
import { PasswordService } from "./auth.password.service";
import { TokenServices } from "./auth.token.service";
import { Token, TokenSchema } from "./schemas/token.schema";
import { Resume, ResumeSchema } from './schemas/resume.schema';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';

@Module({
  controllers: [AuthController,ResumeController],
  providers: [AuthService,PasswordService,TokenServices,ResumeService],
  imports:[MongooseModule.forFeature([
    {name:User.name,schema:UserSchema},
    {name:Token.name,schema:TokenSchema},
    {name:Resume.name,schema:ResumeSchema}
  ])]
})
export class AuthModule {}
