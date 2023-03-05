import { Body, Controller, Post,Response } from "@nestjs/common";
import { AuthService } from './auth.service';
import { UserDto } from "./user.dto";
import { TokenServices } from "./auth.token.service";
import { TokenDto } from "./token.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService,private readonly tokenServices:TokenServices) {}
  @Post('/register')
  async Register(@Response() resp,@Body() user:UserDto){
    const isUserExist = await this.authServices.isUserExist(user.login);
    if(!isUserExist){
      this.authServices.toRegister(user);
    }
  }
  @Post('/login')
  async Login(@Response() resp,@Body() user:UserDto){
    const isUserExist = await this.authServices.isUserExist(user.login);
    if(isUserExist){
      if(await this.authServices.checkPassword(user)){
            const data = await this.authServices.findUser(user.login);
            const isTokenExist = await this.tokenServices.findToken(data.user.id)
            if(isTokenExist.success){
              await this.tokenServices.deleteToken(data.user.id);
            }
          const {token} = await this.tokenServices.createToken(data.user._id);
          
          resp.json({token,success:true})
      }
    }
  }

  @Post('/authorized')
  async Authorize(@Response() resp,@Body() data:TokenDto){
    const {success} = await this.tokenServices.findTokenByToken(data.token);
    resp.json({success});
  }
}
