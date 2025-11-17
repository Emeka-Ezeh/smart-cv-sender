import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application, ApplicationDocument } from './applications.schema';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private applicationModel: Model<ApplicationDocument>,
  ) {}

  async create(data: { jobId: number; cvId: number }): Promise<Application> {
    const newApp = new this.applicationModel(data);
    return newApp.save();
  }

  async findAll(): Promise<Application[]> {
    return this.applicationModel.find().exec();
  }

  async findByJob(jobId: number): Promise<Application[]> {
    return this.applicationModel.find({ jobId }).exec();
  }
}
