import { Controller, Post, Body } from '@nestjs/common';
import { RegisterAuthDto } from '../../application/auth-register/register-auth-dto';
import { AuthRegister } from '../../application/auth-register/auth-register';

@Controller('auth')
export class AuthRegisterController {
  constructor(private readonly authRegister: AuthRegister) {}

  @Post('register')
  run(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authRegister.run(registerAuthDto);
  }
}
