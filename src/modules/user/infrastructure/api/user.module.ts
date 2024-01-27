import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../database/user.schema';
import { UserPutController } from './user.put.controller';
import { UserCreator } from '../../application/user-creator/user-creator';
import { UserEmailFinder } from '../../application/user-email-finder/user-email-finder';
import { UserPatchController } from './user.patch.controller';
import { UserFinder } from '../../application/user-finder/user-finder';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserPutController, UserPatchController],
  providers: [UserCreator, UserEmailFinder, UserFinder],
  exports: [UserCreator, UserEmailFinder, UserFinder],
})
export class UserModule {}
