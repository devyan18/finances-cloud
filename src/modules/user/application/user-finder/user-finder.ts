import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../infrastructure/database/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserFinder {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async run(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id);
    return user || null;
  }
}
