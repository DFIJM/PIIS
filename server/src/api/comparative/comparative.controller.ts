import { Controller, Post, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('comparative')
export class ComparativeController {
  constructor(@InjectModel('Comparative') private comparativeModel: Model<any>) {}

  @Post('get')
  get() {
    return this.comparativeModel.find().exec();
  }

  @Post('save')
  save(@Body() data: any) {
    console.log(data);
    return this.comparativeModel.create(data);
  }

  @Post('remove')
  remove(@Body() { name }) {
    return this.comparativeModel.deleteOne({ name }).exec();
  }
}
