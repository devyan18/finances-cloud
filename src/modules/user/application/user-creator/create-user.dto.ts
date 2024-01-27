import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../domain/user';

export class CreateUserDto implements Partial<User> {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  username: string;
}
