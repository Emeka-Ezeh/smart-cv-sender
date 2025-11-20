import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from '../jobs/jobs.schema';
import { CV, CvDocument } from '../cv/cv.schema';
import {
  Application,
  ApplicationDocument,
} from '../applications/applications.schema';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    @InjectModel(CV.name) private cvModel: Model<CvDocument>,
    @InjectModel(Application.name)
    private applicationModel: Model<ApplicationDocument>,
  ) {}

  async onModuleInit() {
    await this.seedJobs();
    await this.seedCvs();
    await this.seedApplications();
  }

  async seedJobs() {
    const count = await this.jobModel.countDocuments();
    if (count === 0) {
      await this.jobModel.insertMany([
        {
          title: 'Frontend Developer',
          company: 'TechCorp',
          location: 'Remote',
          description: 'Work on Angular apps',
        },
        {
          title: 'Angular Engineer',
          company: 'Innovate Ltd',
          location: 'Milan',
          description: 'Build scalable frontend systems',
        },
      ]);
      console.log('✅ Jobs seeded');
    }
  }

  async seedCvs() {
    const count = await this.cvModel.countDocuments();
    if (count === 0) {
      await this.cvModel.insertMany([
        { name: 'Frontend CV', filePath: '/files/frontend.pdf' },
        { name: 'Fullstack CV', filePath: '/files/fullstack.pdf' },
      ]);
      console.log('✅ CVs seeded');
    }
  }

  async seedApplications() {
    const count = await this.applicationModel.countDocuments();
    if (count === 0) {
      const jobs = await this.jobModel.find();
      const cvs = await this.cvModel.find();
      if (jobs.length && cvs.length) {
        await this.applicationModel.insertMany([
          { jobId: jobs[0]._id, cvId: cvs[0]._id, status: 'pending' },
          { jobId: jobs[1]._id, cvId: cvs[1]._id, status: 'sent' },
        ]);
        console.log('✅ Applications seeded');
      }
    }
  }
}
