import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserFinder } from 'src/modules/user/application/user-finder/user-finder';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userFinder: UserFinder,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.userFinder.run(payload.id);

    return user;
  }
}
