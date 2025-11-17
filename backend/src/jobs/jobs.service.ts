import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './jobs.schema';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async create(data: Partial<Job>): Promise<Job> {
    const newJob = new this.jobModel(data);
    return newJob.save();
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find().exec();
  }
}
