import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/modules/user/infrastructure/api/user.module';
import { AuthLogin } from '../../application/auth-login/auth-login';
import { AuthRegister } from '../../application/auth-register/auth-register';
import { AuthLoginController } from './auth.login.controller';
import { AuthRegisterController } from './auth.register.controller';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
  controllers: [AuthLoginController, AuthRegisterController],
  providers: [AuthLogin, AuthRegister, JwtStrategy],
  exports: [],
})
export class AuthModule {}
