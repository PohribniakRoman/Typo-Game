import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Resume, ResumeDocument } from "./schemas/resume.schema";
@Injectable()
export class ResumeService{
  constructor(@InjectModel(Resume.name) private resumeModel:Model<ResumeDocument>) {}
  async create(id,data){
   const newResume = new this.resumeModel({_id:id,resumes:[data.data]});
   newResume.save();
  }

  async getOne(id){
    return this.resumeModel.findOne({_id: new mongoose.Types.ObjectId(id)})
  }
}