import { Injectable } from '@nestjs/common';
import { FindEmailUserDto } from './finder-email-user.dto';
import { User } from '../../infrastructure/database/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserEmailFinder {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async run(findEmailUserDto: FindEmailUserDto): Promise<User> {
    const user = await this.userModel.findOne(findEmailUserDto);
    return user || null;
  }
}
