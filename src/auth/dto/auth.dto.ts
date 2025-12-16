/**
 * class-validator:
 * ----------------
 * Used to define validation rules on DTO properties.
 *
 * NestJS solves validation by:
 * - class-validator → defines the rules
 * - Pipes → run those rules automatically before the controller
 *
 * This removes the need for manual checks like:
 * if (!dto.email) { ... }
 *
 * Example:
 * @IsEmail()
 * @IsNotEmpty()
 * email: string;
 */

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
