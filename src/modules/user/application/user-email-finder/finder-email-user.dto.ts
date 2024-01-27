import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../domain/user';

export class FindEmailUserDto implements Partial<User> {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
