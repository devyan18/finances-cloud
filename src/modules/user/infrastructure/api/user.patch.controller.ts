import { Controller, Patch, Body, BadRequestException } from '@nestjs/common';
import { UserEmailFinder } from '../../application/user-email-finder/user-email-finder';
import { FindEmailUserDto } from '../../application/user-email-finder/finder-email-user.dto';

@Controller('users')
export class UserPatchController {
  constructor(private readonly userEmailFinder: UserEmailFinder) {}

  @Patch('/email')
  async run(@Body() findEmailUserDto: FindEmailUserDto) {
    const user = await this.userEmailFinder.run(findEmailUserDto);

    if (!user) throw new BadRequestException('User not found');

    return user;
  }
}
