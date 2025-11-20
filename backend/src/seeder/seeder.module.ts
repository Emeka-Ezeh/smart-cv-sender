import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederService } from './seeder.service';
import { Job, JobSchema } from '../jobs/jobs.schema';
import { CV, CvSchema } from '../cv/cv.schema';
import {
  Application,
  ApplicationSchema,
} from '../applications/applications.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: CV.name, schema: CvSchema },
      { name: Application.name, schema: ApplicationSchema },
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
