import { Module } from '@nestjs/common';

// A module is a class annotated with a @Module() decorator.
// Here, we define the root module of the application.
// AppModule is the main module that NestJS uses to bootstrap the application whose configuration is defined in the @Module() decorator.
@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
