import { Controller, Get, Post, Body } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './jobs.schema';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async getAll(): Promise<Job[]> {
    return this.jobsService.findAll();
  }

  @Post()
  async create(@Body() body: Partial<Job>): Promise<Job> {
    return this.jobsService.create(body);
  }
}
