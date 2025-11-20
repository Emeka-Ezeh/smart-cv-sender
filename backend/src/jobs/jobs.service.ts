import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './jobs.schema';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async seed() {
    const jobs = [
      { title: 'Frontend Developer', company: 'TechCorp', location: 'Remote' },
      { title: 'Angular Engineer', company: 'Innovate Ltd', location: 'Milan' },
    ];
    await this.jobModel.insertMany(jobs);
  }

  async create(data: Partial<Job>): Promise<Job> {
    const newJob = new this.jobModel(data);
    return newJob.save();
  }

  async findAll(): Promise<Job[]> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return this.jobModel.find().exec() || [];
  }
}
