import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from '../../infrastructure/database/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserCreator {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async run(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }
}
