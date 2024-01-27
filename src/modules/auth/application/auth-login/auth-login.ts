import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './login-auth-dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEmailFinder } from 'src/modules/user/application/user-email-finder/user-email-finder';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthLogin {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userEmailFinder: UserEmailFinder,
  ) {}

  async run({ email, password }: LoginAuthDto) {
    const user = await this.userEmailFinder.run({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }
}
