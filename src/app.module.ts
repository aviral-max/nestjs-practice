import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

// A module is a class annotated with a @Module() decorator.
// Here, we define the root module of the application.
// AppModule is the main module that NestJS uses to bootstrap the application whose configuration is defined in the @Module() decorator.
@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
