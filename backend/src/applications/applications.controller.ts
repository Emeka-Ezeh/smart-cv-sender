import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { Application } from './applications.schema';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  async getAll(): Promise<Application[]> {
    return this.applicationsService.findAll();
  }

  @Get(':jobId')
  async getByJob(@Param('jobId') jobId: number): Promise<Application[]> {
    return this.applicationsService.findByJob(jobId);
  }

  @Post()
  async create(
    @Body() body: { jobId: number; cvId: number },
  ): Promise<Application> {
    return this.applicationsService.create(body);
  }
}
