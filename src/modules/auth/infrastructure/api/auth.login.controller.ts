import { Controller, Post, Body } from '@nestjs/common';
import { LoginAuthDto } from '../../application/auth-login/login-auth-dto';
import { AuthLogin } from '../../application/auth-login/auth-login';

@Controller('auth')
export class AuthLoginController {
  constructor(private readonly authLogin: AuthLogin) {}

  @Post('login')
  run(@Body() loginAuthDto: LoginAuthDto) {
    return this.authLogin.run(loginAuthDto);
  }
}
