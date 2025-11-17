import { Controller, Get, Post, Body } from '@nestjs/common';
import { CvService } from './cv.service';
import { CV } from './cv.schema';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Get()
  async getAll() {
    return this.cvService.getAll();
  }

  @Post()
  async addCV(@Body() cv: Partial<CV>) {
    return this.cvService.addCV(cv);
  }
}
