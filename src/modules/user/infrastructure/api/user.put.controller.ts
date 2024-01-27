import { Controller, Body, Put } from '@nestjs/common';
import { UserCreator } from '../../application/user-creator/user-creator';
import { CreateUserDto } from '../../application/user-creator/create-user.dto';

@Controller('users')
export class UserPutController {
  constructor(private readonly userCreator: UserCreator) {}

  @Put('')
  run(@Body() createUserDto: CreateUserDto) {
    return this.userCreator.run(createUserDto);
  }
}
