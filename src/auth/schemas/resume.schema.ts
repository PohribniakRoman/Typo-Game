import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ResumeDocument = Resume & Document;
@Schema()
export class Resume{
  @Prop({type:Array})
  resumes:object
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);