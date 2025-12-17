import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Prisma adapter that allows Prisma to use PostgreSQL
// Prisma itself does NOT talk to Postgres directly anymore (Prisma 7+)
import { PrismaPg } from '@prisma/adapter-pg';

// Official PostgreSQL driver for Node.js
// Pool = connection pool (manages multiple DB connections efficiently)
import { Pool } from 'pg';

/**
 * Prisma Client = the layer our API talks to
 * ------------------------------------------
 * - Our NestJS code NEVER talks to Postgres tables directly.
 * - All queries go through Prisma Client.
 *
 * Database level:
 * - Tables are plural: `users`, `bookmarks`
 *
 * Application level (Prisma Client):
 * - We work with MODELS, not tables
 * - Models are singular: `User`, `Bookmark`
 * - Hence the API uses:
 *     this.prisma.user
 *     this.prisma.bookmark
 *
 * Prisma acts as a translator:
 *   this.prisma.user.create()
 *        ↓
 *   INSERT INTO users (...)
 *
 * This keeps DB naming concerns out of business logic
 * and lets us write type-safe, model-based queries.
 */

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    /**
     * STEP 1: Create a PostgreSQL connection pool
     *
     * What is a Pool?
     * - A pool keeps multiple database connections ready
     * - Connections are reused instead of opening a new one every time
     * - This is faster and safer for production apps
     *
     * DATABASE_URL comes from .env
     * Prisma 7 DOES NOT auto-read it, so we pass it manually
     */
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    /**
     * STEP 2: Pass the pool to Prisma using an adapter
     *
     * What is PrismaPg?
     * - It acts as a translator between Prisma and PostgreSQL
     * - Prisma sends queries → adapter converts them to SQL
     * - SQL runs using the pg pool
     *
     * adapter is REQUIRED in Prisma 7
     */
    super({
      adapter: new PrismaPg(pool),
    });
  }

  /**
   * STEP 3: Called automatically when NestJS starts
   *
   * This tells Prisma:
   * "You can now start using the database"
   *
   * If the DB is down, the app fails early (good thing)
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * STEP 4: Called automatically when NestJS shuts down
   *
   * This closes all DB connections cleanly
   * Prevents memory leaks and hanging processes
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
