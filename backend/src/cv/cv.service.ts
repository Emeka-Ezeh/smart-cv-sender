import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CV, CvDocument } from './cv.schema';

@Injectable()
export class CvService {
  constructor(@InjectModel(CV.name) private cvModel: Model<CvDocument>) {}

  async addCV(cv: Partial<CV>): Promise<CV> {
    const newCv = new this.cvModel(cv);
    return newCv.save();
  }

  async getAll(): Promise<CV[]> {
    return this.cvModel.find().exec();
  }
}
