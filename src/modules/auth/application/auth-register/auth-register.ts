import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './register-auth-dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserCreator } from 'src/modules/user/application/user-creator/user-creator';
import { UserEmailFinder } from 'src/modules/user/application/user-email-finder/user-email-finder';

@Injectable()
export class AuthRegister {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userCreator: UserCreator,
    private userEmailFinder: UserEmailFinder,
  ) {}

  async run(registerAuthDto: RegisterAuthDto) {
    const user = await this.userEmailFinder.run({
      email: registerAuthDto.email,
    });

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const newUser = await this.userCreator.run(registerAuthDto);

    const payload = { id: newUser.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }
}
