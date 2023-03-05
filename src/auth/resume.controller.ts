import { Body, Controller, Post,Get,Response } from "@nestjs/common";
import { TokenServices } from "./auth.token.service";
import { TokenDto } from "./token.dto";
import { ResumeService } from "./resume.service";

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService,private readonly tokenService: TokenServices) {}
  @Post('/getOne')
  async getAll(@Response() resp,@Body() data:TokenDto){
    const token = await this.tokenService.findIDByToken(data.token);
    const response = await this.resumeService.getOne(token._id);
    resp.json({data:response});
  }

  @Post("/addResume")
  async setResume(@Response() response,@Body() data:TokenDto){
    const token = await this.tokenService.findIDByToken(data.token);
    this.resumeService.create(token._id,data);    
  }
}
