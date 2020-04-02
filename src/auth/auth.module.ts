import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { BasicStrategy } from './basic.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, BasicStrategy]
})
export class AuthModule {}
