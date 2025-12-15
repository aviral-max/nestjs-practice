import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * @Global()
 *
 * This makes the PrismaModule available EVERYWHERE in the app
 * without importing PrismaModule again and again.
 *
 * Normally in NestJS:
 *  - You must import a module wherever you want to use its providers
 *
 * With @Global():
 *  - NestJS registers this module once
 *  - All its EXPORTED providers are available app-wide
 *
 * ⚠️ IMPORTANT:
 * @Global() does NOT automatically export everything
 * Only providers listed in `exports` are accessible globally
 */
@Global()
@Module({
  /**
   * providers:
   * - These are the services created by this module
   * - PrismaService will be instantiated only ONCE (singleton)
   */
  providers: [PrismaService],

  /**
   * exports:
   * - These are the providers that other modules are allowed to use
   * - Even with @Global(), you MUST explicitly export services
   *
   * If PrismaService is NOT listed here:
   * - Other modules cannot inject it
   *
   * Think of exports as:
   * "Which services am I allowing the rest of the app to access?"
   */
  exports: [PrismaService],
})
export class PrismaModule {}
