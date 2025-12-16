/**
 * This file re-exports all DTOs from this folder.
 * It allows other files (like auth.controller.ts) to import
 * everything from one place instead of individual files.
 *
 * Example:
 * import { AuthDto } from './dto';
 * instead of:
 * import { AuthDto } from './dto/auth.dto';
 */

export * from './auth.dto';
