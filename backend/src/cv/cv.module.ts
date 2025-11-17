import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { CV, CvSchema } from './cv.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: CV.name, schema: CvSchema }])],
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}
