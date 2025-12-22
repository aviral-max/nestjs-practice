import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // JwtModule.register() configures and provides NestJS's JWT utilities.
  // It makes JwtService available for dependency injection, which is used
  // to sign (create) and verify JWT tokens inside the AuthService.
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
